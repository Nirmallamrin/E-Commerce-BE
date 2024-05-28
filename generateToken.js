import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

const secret_key = process.env.JWT_SECRET;

export const generateToken = (email) => {
    return jwt.sign({ data: email }, secret_key, {expiresIn: "1d"});
};

export const adminToken = (email, role) => {
    return jwt.sign({email, role}, secret_key, {expiresIn: '1d'});
};