import axios from "axios";

const PUBLIC_API = import.meta.env.VITE_PUBLIC_API;

export async function getSintomasList() {
    try {
        const resp = await axios.get(`${PUBLIC_API}/sintomas-list`);
        return resp.data;

    } catch (error) {
        console.error(error);        
    }
};

export async function getSignosList() {
    try {
        const resp = await axios.get(`${PUBLIC_API}/signos-list`);
        return resp.data;

    } catch (error) {
        console.error(error);        
    }
};

export async function getDepartamentosList() {
    try {
        const resp = await axios.get(`${PUBLIC_API}/departamentos-list`);
        return resp.data;
    } catch (error) {
        console.error(error);        
    }
};

export async function getOcupacionesList() {
    try {
        const resp = await axios.get(`${PUBLIC_API}/ocupaciones-list`);
        return resp.data;
    } catch (error) {
        console.error(error);        
    }
};

export async function getCondicionesList() {
    try {
        const resp = await axios.get(`${PUBLIC_API}/condiciones-list`);
        return resp.data;
    } catch (error) {
        console.error(error);        
    }
};