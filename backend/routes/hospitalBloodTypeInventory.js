const router = require("express").Router();
const mongoose = require("mongoose");
let HospitalBloodTypeInventory = require("../models/HospitalBloodTypeInventory");
const logger = require("../utils/logger");
const DonorSchema = new mongoose.Schema({});
const Donors = mongoose.models.Donors || mongoose.model("Donors", DonorSchema, "doners");
const axios = require("axios");
const nodemailer = require('nodemailer');

router.route("/all").get((req, res) => {
    HospitalBloodTypeInventory.find()
        .then((blod) => {
            res.json(blod);
        })
        .catch((error) => {
            logger.error(error);
            res.status(500).send("Server error");
        });
});

router.route("/:id").get((req, res) => {
    const { id } = req.params;
    HospitalBloodTypeInventory.findById(id)
        .then((blood) => {
            if (!blood) {
                return res.status(404).send("id not found");
            }
            res.json(blood);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("server error");
        });
});

router.route("/updateCount").put(async (req, res) => {
    const { id, count } = req.body;
    logger.info(req.body);
    try {
        if (!id || count === undefined) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid request. 'id' and 'count' are required.",
            });
        }

        let bloodRecord = await HospitalBloodTypeInventory.findById(id);

        if (!bloodRecord) {
            return res.status(404).json({
                isSuccess: false,
                message: "Record not found.",
            });
        }

        let emails = []; // ✅ declare here to access outside if needed
        let EmergencyDoners=[];

        if (bloodRecord.count <= 5) {
            const Btype = bloodRecord.bloodType;
            const neededDonors = await Donors.find({ bloodType: Btype });
            logger.info(Btype);

            const donorDetails = neededDonors.map(donor => ({
                dId: donor._doc._id.toString(),
                name: donor._doc.name,
                email: donor._doc.email,
                location: `${donor._doc.location.latitude},${donor._doc.location.longitude}`
            }));

            const origins = donorDetails.map(d => d.location).join('|');
            const destination = '6.914691613874052,79.97294152994425';
            const api = 'AIzaSyCO5GpVBTF2c29JyBE3ryKfDQxzs8B3b5I';
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origins)}&destinations=${encodeURIComponent(destination)}&mode=driving&key=${api}`;

            try {
                const response = await axios.get(url, { timeout: 100000 });
                logger.info("Google API Raw Response:", JSON.stringify(response.data));

                const data = response.data;
                const donorWithTimes = [];

                data.rows.forEach((row, index) => {
                    const donor = donorDetails[index];
                    const element = row.elements[0];
                    if (element.status === 'OK') {
                        const duration = element.duration.text;
                        const durationValue = element.duration.value;
                        donorWithTimes.push({
                            id: donor.dId,
                            name: donor.name,
                            email: donor.email,
                            durationText: duration,
                            durationValue: durationValue
                        });
                    } else {
                        logger.warn(`Donor ID: ${donor.dId}, Name: ${donor.name}, No valid route (status: ${element.status})`);
                    }
                });

                const top3Donors = donorWithTimes
                    .sort((a, b) => a.durationValue - b.durationValue)
                    .slice(0, 3);

                top3Donors.forEach(d => {
                    logger.info(`ID: ${d.id}, Name: ${d.name}, Time: ${d.durationText},Email:${d.email}`);
                    emails.push(d.email);
                    EmergencyDoners.push(d.name)
                    logger.info(emails);
                });

                async function sendEmail() {
                    try {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'sirimora0923@gmail.com',
                                pass: 'ymeoaykdodautfnx'
                            }
                        });

                        const mailOptions = {
                            from: '"Quick Blood" <sirimora0923@gmail.com>',
                            to: emails.join(','),
                            subject: 'Urgent Blood Donation Request',
                            text: `Dear Donor,

We urgently need your blood donation to help save a life.
Please contact us or visit our nearest donation center.
Thank you for your generosity.- Quick Blood Team`
                        };

                        const info = await transporter.sendMail(mailOptions);
                        logger.info('Email sent:', info.response);
                    } catch (error) {
                        console.error('Error sending email:', error);
                    }
                }
                if(count<=5){
                await sendEmail();

                // ✅ RETURN emails array to frontend
                return res.status(200).json({
                    isSuccess: true,
                    message: "Emails sent successfully to nearest donors.",
                    emailsSentTo: EmergencyDoners
                });
            }
            } catch (error) {
                logger.error("Google API Error:", error.toString());
                if (error.response) {
                    logger.error("Google API Response Data:", JSON.stringify(error.response.data));
                }
                if (error.code === 'ECONNABORTED') {
                    logger.error("Request timed out");
                }
            }
        }

        bloodRecord.count = count;
        await bloodRecord.save();

        // ✅ normal response if count > 5
        return res.status(200).json({
            isSuccess: true,
            message: "Record updated successfully.",
            emailsSentTo: [] // empty array for consistency
        });

    } catch (err) {
        logger.error(err);
        return res.status(500).json({
            isSuccess: false,
            message: "An internal server error occurred. Please try again later.",
        });
    }
});

module.exports = router;
