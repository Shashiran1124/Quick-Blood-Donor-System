import axios from "axios";
import environment from "../../environment";


class HospitalBloodTypeInventoryService{
    static async getAllHospitalBloodTypesDetailsAsync() {
		try {
			const response = await axios.get(`${environment.apiUrl}hosBloodInve/all`);
			return response;
		} catch (error) {
			throw error;
		}
	}

    static async updateBloodPacketCount(model){
        try {
           
            const response = await axios.put(`${environment.apiUrl}hosBloodInve/updateCount`, model);

            return response;
        } catch (error) {
            
        }
    }
}

export default HospitalBloodTypeInventoryService;