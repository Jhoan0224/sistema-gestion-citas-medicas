import { promisify } from 'util'
import jwt from 'jsonwebtoken'

const jwtSignPromise = promisify(jwt.sign);
const jwtVerifyDecodedPromise = promisify(jwt.verify);

export default class JwtToken {
    static #secretKey = "hello-world";

    static #jwtOptions = {
        expiresIn: "1h"
    };

    static async generateJwt(payload) {
        
        const token = jwtSignPromise(payload, JwtToken.#secretKey, JwtToken.#jwtOptions);
        return token;
    }

    static async jwtVerfyDecoded(tokenVerify) {
        try {
            const tokenDecoded = await jwtVerifyDecodedPromise(tokenVerify, JwtToken.#secretKey);
            return tokenDecoded;

        } catch (error) {
            return null;
        }
    }
    
}