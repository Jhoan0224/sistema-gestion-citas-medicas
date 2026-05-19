import bcrypt from 'bcrypt';

export default class PasswordSecurity {

    static #SALT_ROUNDS = 10;

    static async getPasswordHash(passPlainText) {
        try {
            const passwordHash = await bcrypt.hash(passPlainText, PasswordSecurity.#SALT_ROUNDS);
            return passwordHash;
        } catch (error) {
            throw error;
        }       
    }
    
    static async passwordMatches(passPlainText, passHash) {
        try {
            const match = await bcrypt.compare(passPlainText, passHash);
            return match;
            
        } catch (error) {
            throw error;
        }
    }
}