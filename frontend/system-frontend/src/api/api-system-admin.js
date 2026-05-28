import axios from "axios";

const API_ADMIN = import.meta.env.VITE_API_SYSTEM_ADMIN;
import { HTTP_HEADERS } from "../app/auth.app.js";

export async function searchUserSysRequest(form, headers) {
    try {
        const resp = await axios.post(`${API_ADMIN}/search-user-form`, form, headers);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
};



export async function deleteNormalUserAccountRequest(form) {
    try {
        const resp = await axios.post(`${API_ADMIN}/delete-normal-user-account`, form, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function deleteUserSysAccountRequest(form) {
    try {
        const resp = await axios.post(`${API_ADMIN}/delete-user-system-account`, form, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateUserSysAccountRequest(form) {
    try {
        const resp = await axios.post(`${API_ADMIN}/update-user-account`, form, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function createUserSysAccountRequest(form) {
    try {
        const resp = await axios.post(`${API_ADMIN}/create-user-sys`, form, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function disableUserSysAccountRequest(form) {
    try {
        const resp = await axios.post(`${API_ADMIN}/disable-normal-user-system`, form, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function searchNormalUserRequest(form, headers) {
    try {
        const resp = await axios.post(`${API_ADMIN}/search-normal-user`, form, headers);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
};

export async function getUserSysAccountInfo(idUsuario) {
    try {
        const resp = await axios.get(`${API_ADMIN}/usuario-sys-account-data/${idUsuario}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
}

// get tables admin
export async function getTableRoles(tableName) {
    try {
        const resp = await axios.get(`${API_ADMIN}/get-info-table/${tableName}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
};

export async function getTablePrivilegios(tableName) {
    try {
        const resp = await axios.get(`${API_ADMIN}/get-info-table/${tableName}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
};

// get table normal users
export async function getTableEstadoCita(tableName) {
    try {
        const resp = await axios.get(`${API_ADMIN}/get-info-table/${tableName}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
};

export async function getTableCondiciones(tableName) {
    try {
        const resp = await axios.get(`${API_ADMIN}/get-info-table/${tableName}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
};

export async function getTableOcupaciones(tableName) {
    try {
        const resp = await axios.get(`${API_ADMIN}/get-info-table/${tableName}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
};

export async function getTableEspecialidad(tableName) {
    try {
        const resp = await axios.get(`${API_ADMIN}/get-info-table/${tableName}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
};

export async function getTableSignos(tableName) {
    try {
        const resp = await axios.get(`${API_ADMIN}/get-info-table/${tableName}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
};

export async function getTableSintomas(tableName) {
    try {
        const resp = await axios.get(`${API_ADMIN}/get-info-table/${tableName}`, HTTP_HEADERS());
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
};
