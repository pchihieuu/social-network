import axios from "axios";
import { apiUrlAuth } from "../../utils/constant";

export async function Login(email: string, password: string): Promise<any> {
    return (axios.post(apiUrlAuth + "login", {
        email,
        password,
    }).then
        ((response) => {
            return response.data;
        }).catch((error) => {
            return Promise.reject(error);
        }));
}

export async function Register(email: string, password: string): Promise<any> {
    return (axios.post(apiUrlAuth + "register", {
        email,
        password,
    }).then
        ((response) => {
            return response.data;
        }).catch((error) => {
            return Promise.reject(error);
        }));
}


export async function ValidateToken(token: string): Promise<any> {
    return (axios.post(apiUrlAuth + "validate", {
        token,
    }).then
        ((response) => {
            return response.data;
        }).catch((error) => {
            return Promise.reject(error);
        }));
}

export default {
    Login,
    Register,
    ValidateToken,
}