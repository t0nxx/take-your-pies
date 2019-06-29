import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export async function generateJwtToken(args: any) {
    return await sign(args, process.env.JWTSECRET, { expiresIn: '1h' })
}