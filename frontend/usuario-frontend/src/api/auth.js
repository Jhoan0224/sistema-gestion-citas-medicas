import axios from "axios"

const API_AUTH = ''

export async function validarAuth(){
    try {
        const resp = await axios.get();
        return resp.data;
        
    } catch (error) {
        return false;
    }
}