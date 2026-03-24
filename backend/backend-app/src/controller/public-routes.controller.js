import { NOT_FOUND, SERVER_ERROR } from "../utils/http-status-messages.js";
import * as publicSvc from '../services/public_access_svc/public-access.svc.js'

export const sintomasList = async (req, res) => {
    try {
        
        const processResult = await publicSvc.sintomasListSvc();

        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(404).json(NOT_FOUND);
        
    } catch (error) {
        return res.status(500).json(SERVER_ERROR);   
    }
};

export const signosList = async (req, res) => {
    try {
        const processResult = await publicSvc.signosListSvc();

        if (processResult.success) {
            return res.status(200).json(processResult);
        }
        return res.status(404).json(NOT_FOUND);

    } catch (error) {
        console.error(error)
        return res.status(500).json(SERVER_ERROR);   
    }
};

export const departamentosList = async (req, res) => {
    try {
        const processResult = await publicSvc.departamentosListSvc();

        return processResult.success 
            ? res.status(200).json(processResult)
            : res.status(404).json(NOT_FOUND);

    } catch (error) {
        console.error(error)
        return res.status(500).json(SERVER_ERROR);   
    }
};

export const condicionesList = async (req, res) => {
    try {
        const processResult = await publicSvc.condicionesListSvc();
        return processResult.success 
            ? res.status(200).json(processResult)
            : res.status(404).json(NOT_FOUND);

    } catch (error) {
        console.error(error)
        return res.status(500).json(SERVER_ERROR);   
    }
};

export const ocupacionesList = async (req, res) => {
    try {
        const processResult = await publicSvc.ocupacionesListSvc();
        return processResult.success
            ? res.status(200).json(processResult)
            : res.status(404).json(NOT_FOUND);

    } catch (error) {
        console.error(error)
        return res.status(500).json(SERVER_ERROR);   
    }
};