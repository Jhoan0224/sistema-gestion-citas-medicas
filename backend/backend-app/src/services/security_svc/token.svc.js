import { SERVER_ERROR, TOKEN_NOT_VALID } from "../../utils/http-status-messages.js";
import JwtToken from "./jwt-token.svc.js";

// Verify the JWT it has not expired or been altered
export const verifyAuthJWT = async (req, res, next) => {
    try {       
        // request the autorization header from the http request
        const authHeader = req.headers["authorization"];
        console.log(req);
        
        // split and get the token value: bearer token
        const token = authHeader.split(" ")[1];

        // decoded and verify the Token
        const TOKEN_DECODED = await JwtToken.jwtVerfyDecoded(token);
        console.log("TOKEN >> " + TOKEN_DECODED);
        
        if (TOKEN_DECODED === null) { return res.status(401).json(TOKEN_NOT_VALID); }

        // if the Token is valid build the params to the next layers
        req.user = {
            id: TOKEN_DECODED.id,
            roles: TOKEN_DECODED.roles
        };

        // send to next layer
        return next();

    } catch (error) {
        console.error("Error en verifyAuthJWT" + error);
        return res.status(500).json(SERVER_ERROR);
    }
};