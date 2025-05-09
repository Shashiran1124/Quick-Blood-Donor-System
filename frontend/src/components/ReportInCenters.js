import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function DonorCenterReport() {
  const [donorCenters, setDonorCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const mockDonorCenters = [
    {
      _id: '1',
      centerName: 'Downtown Donation Center NEWs',
      centerCode: 'DTC001',
      address: '123 Main St',
      city: 'Metropolis',
      province: 'Western',
      phone: '0123456789',
      email: 'dtcnews@example.com',
      openingStart: '08:00',
      openingEnd: '17:00',
      daysOpen: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      donationTypes: ['Whole Blood', 'Plasma'],
      maxCapacity: 50,
    },
    {
      _id: '2',
      centerName: 'Downtown Donation Center NEWzzz',
      centerCode: 'DTC002',
      address: '124 Main St',
      city: 'Metropolis',
      province: 'Western',
      phone: '0123456789',
      email: 'dtcnewzzz@example.com',
      openingStart: '08:00',
      openingEnd: '17:00',
      daysOpen: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      donationTypes: ['Whole Blood', 'Platelets'],
      maxCapacity: 50,
    },
    {
      _id: '3',
      centerName: 'Firsts',
      centerCode: 'FST001',
      address: '10 Bandura Rd',
      city: 'Banduragoda',
      province: 'Western',
      phone: '0766251204',
      email: 'firsts@example.com',
      openingStart: '21:59',
      openingEnd: '12:59',
      daysOpen: ['Monday', 'Wednesday', 'Friday'],
      donationTypes: ['Whole Blood'],
      maxCapacity: 30,
    },
    {
      _id: '4',
      centerName: 'mine',
      centerCode: 'MIN001',
      address: '11 Bandura Rd',
      city: 'Banduragoda',
      province: 'Western',
      phone: '0766251204',
      email: 'mine@example.com',
      openingStart: '23:22',
      openingEnd: '23:25',
      daysOpen: ['Tuesday', 'Thursday'],
      donationTypes: ['Plasma'],
      maxCapacity: 20,
    },
    {
      _id: '5',
      centerName: 'Colombo Center',
      centerCode: 'COL001',
      address: '12 Bandura Rd',
      city: 'Banduragoda',
      province: 'Western',
      phone: '0766251204',
      email: 'colombo@example.com',
      openingStart: '09:37',
      openingEnd: '11:37',
      daysOpen: ['Monday', 'Friday'],
      donationTypes: ['Whole Blood', 'Plasma', 'Platelets'],
      maxCapacity: 40,
    },
    {
      _id: '6',
      centerName: 'Kaduwela',
      centerCode: 'KAD001',
      address: '13 Bandura Rd',
      city: 'Banduragoda',
      province: 'Western',
      phone: '0766251204',
      email: 'kaduwela@example.com',
      openingStart: '18:59',
      openingEnd: '16:59',
      daysOpen: ['Wednesday', 'Saturday'],
      donationTypes: ['Whole Blood'],
      maxCapacity: 25,
    },
    {
      _id: '7',
      centerName: 'Malabe',
      centerCode: 'MAL001',
      address: '14 Bandura Rd',
      city: 'Banduragoda',
      province: 'Western',
      phone: '0766251204',
      email: 'malabe@example.com',
      openingStart: '08:11',
      openingEnd: '21:12',
      daysOpen: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      donationTypes: ['Whole Blood', 'Plasma'],
      maxCapacity: 60,
    },
    {
      _id: '8',
      centerName: 'Kaduwela',
      centerCode: 'KAD002',
      address: '15 Bandura Rd',
      city: 'Banduragoda',
      province: 'Western',
      phone: '0766251204',
      email: 'kaduwela2@example.com',
      openingStart: '22:25',
      openingEnd: '23:25',
      daysOpen: ['Friday', 'Saturday'],
      donationTypes: ['Platelets'],
      maxCapacity: 30,
    },
    {
      _id: '9',
      centerName: 'MalabeNewest',
      centerCode: 'MAL002',
      address: '16 Bandura Rd',
      city: 'Banduragoda',
      province: 'Western',
      phone: '0766251204',
      email: 'malabenewest@example.com',
      openingStart: '10:34',
      openingEnd: '22:34',
      daysOpen: ['Monday', 'Wednesday', 'Friday'],
      donationTypes: ['Whole Blood', 'Plasma', 'Platelets'],
      maxCapacity: 50,
    },
    {
      _id: '10',
      centerName: 'LastCenters',
      centerCode: 'LST001',
      address: '17 Bandura Rd',
      city: 'Banduragoda',
      province: 'Western',
      phone: '0766251204',
      email: 'lastcenters@example.com',
      openingStart: '10:39',
      openingEnd: '22:50',
      daysOpen: ['Tuesday', 'Thursday', 'Saturday'],
      donationTypes: ['Whole Blood'],
      maxCapacity: 35,
    },
  ];

  const fetchDonorCenters = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/donorCenters/get');
      setDonorCenters(response.data || []);
    } catch (error) {
      console.error("Error fetching donor centers:", error);
      setDonorCenters(mockDonorCenters);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDonorCenters();
  }, [fetchDonorCenters]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18).text('QuickBlood Donation System', 14, 20);
    doc.setFontSize(15).text('Donor Centers Report', 14, 30);

    const columns = [
      'Center Name',
      'City',
      'Province',
      'Opening Hours',
      'Days Open',
      'Donation Types',
      'Capacity',
    ];
    const data = donorCenters.map(center => [
      center.centerName,
      center.city,
      center.province,
      `${center.openingStart} - ${center.openingEnd}`,
      center.daysOpen.join(', '),
      center.donationTypes.join(', '),
      center.maxCapacity,
    ]);

    autoTable(doc, {
      startY: 40,
      head: [columns],
      body: data,
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 128], textColor: 255, fontSize: 12, halign: 'center' },
      bodyStyles: { fontSize: 10, textColor: 0, halign: 'left' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      columnStyles: {
        0: { cellWidth: 40, halign: 'left' },
        1: { cellWidth: 30, halign: 'center' },
        2: { cellWidth: 30, halign: 'center' },
        3: { cellWidth: 25, halign: 'center' },
        4: { cellWidth: 35, halign: 'left' },
        5: { cellWidth: 30, halign: 'left' },
        6: { cellWidth: 15, halign: 'center' },
      },
      margin: { top: 40, bottom: 30, left: 4, right: 20 },
      tableWidth: 'wrap',
    });

    const signatureY = doc.lastAutoTable.finalY + 10;
    doc.text('______________', 14, signatureY + 5);
    doc.setFontSize(12).setFont('times', 'italic').text('Mr. Shahsiran Perera', 14, signatureY + 15);
    doc.setFont('times', 'normal').text('(Director of Nursing)', 14, signatureY + 25);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, signatureY + 35);

    doc.save('Donor_Centers_Report.pdf');
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <style>{`.table-container { max-width: 1500px; margin: 30px auto; padding: 0 15px; } .no-results { text-align: 'center', color: '#000', padding: '20px' }`}</style>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 1.5rem', width: '1515px', marginLeft: '-30px', marginTop: '-20px', backgroundColor: '#1a2a44', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', zIndex: 10 }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#333' }}><span style={{ color: '#ff4d4f' }}>🩸</span><span style={{ color: '#c3c3c3' }}>Quick</span><span style={{ color: '#8B0000' }}>Blood</span></div>
        <div style={{ display: 'flex', gap: '1.8rem' }}>
          <a href="#" style={{ color: '#fff', fontWeight: 500, fontSize: 16 }} onMouseOver={e => e.target.style.color='#ff4d4f'} onMouseOut={e => e.target.style.color='#fff'} onClick={() => navigate('/')}>Home</a>
          <a href="#" style={{ color: '#fff', fontWeight: 500, fontSize: 16 }} onMouseOver={e => e.target.style.color='#ff4d4f'} onMouseOut={e => e.target.style.color='#fff'} onClick={() => navigate('/createDonorCenter')}>Centers</a>
          <a href="#" style={{ color: '#fff', fontWeight: 500, fontSize: 16 }} onMouseOver={e => e.target.style.color='#ff4d4f'} onMouseOut={e => e.target.style.color='#fff'} onClick={() => navigate('/dashsentBloodForm')}>Donations</a>
          <a href="#" style={{ color: '#fff', fontWeight: 500, fontSize: 16 }} onMouseOver={e => e.target.style.color='#ff4d4f'} onMouseOut={e => e.target.style.color='#fff'}>Report</a>
        </div>
      </nav>
      <Typography variant="h4" align="center" sx={{ color: '#000', mt: 3, fontWeight: 'bold' }}>QuickBlood Donation System</Typography>
      <Typography variant="h5" align="center" sx={{ color: '#000', mb: 3, fontWeight: 'bold' }}>Donor Centers Report</Typography>
      <div className="table-container">
        {loading ? <Typography align="center" sx={{ color: '#000' }}>Loading...</Typography> : donorCenters.length > 0 ? (
          <>
            <TableContainer component={Paper} sx={{ borderRadius: 0, border: '1px solid #000' }}>
              <Table>
                <TableHead><TableRow sx={{ backgroundColor: '#00008B' }}><TableCell sx={{ color: '#fff', border: '1px solid #000', py: 1 }}>Center Name</TableCell><TableCell sx={{ color: '#fff', border: '1px solid #000', py: 1 }}>City</TableCell><TableCell sx={{ color: '#fff', border: '1px solid #000', py: 1 }}>Province</TableCell><TableCell sx={{ color: '#fff', border: '1px solid #000', py: 1 }}>Opening Hours</TableCell><TableCell sx={{ color: '#fff', border: '1px solid #000', py: 1 }}>Days Open</TableCell><TableCell sx={{ color: '#fff', border: '1px solid #000', py: 1 }}>Donation Types</TableCell><TableCell sx={{ color: '#fff', border: '1px solid #000', py: 1 }}>Capacity</TableCell></TableRow></TableHead>
                <TableBody>{donorCenters.map(center => <TableRow key={center._id} sx={{ backgroundColor: '#fff' }}><TableCell sx={{ border: '1px solid #000', py: 1, color: '#000' }}>{center.centerName}</TableCell><TableCell sx={{ border: '1px solid #000', py: 1, color: '#000' }}>{center.city}</TableCell><TableCell sx={{ border: '1px solid #000', py: 1, color: '#000' }}>{center.province}</TableCell><TableCell sx={{ border: '1px solid #000', py: 1, color: '#000' }}>{`${center.openingStart} - ${center.openingEnd}`}</TableCell><TableCell sx={{ border: '1px solid #000', py: 1, color: '#000' }}>{center.daysOpen.join(', ')}</TableCell><TableCell sx={{ border: '1px solid #000', py: 1, color: '#000' }}>{center.donationTypes.join(', ')}</TableCell><TableCell sx={{ border: '1px solid #000', py: 1, color: '#000' }}>{center.maxCapacity}</TableCell></TableRow>)}</TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 2, textAlign: 'center' }}><Button variant="contained" onClick={downloadPDF} sx={{ backgroundColor: '#ff4d4f', color: '#fff', '&:hover': { backgroundColor: '#c71800' }, padding: '8px 16px' }}>Download PDF</Button></Box>
          </>
        ) : <div className="no-results">No donor centers found.</div>}
      </div>
    </div>
  );
}