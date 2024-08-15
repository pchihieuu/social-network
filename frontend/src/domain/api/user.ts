import axios from "axios";
// import { Navigate } from 'react-router-dom'
import { apiUrlUser, apiUrlAuth } from "../../utils/constant";


export async function GetUserProfile(): Promise<any> {
    return (axios.get(apiUrlUser + "profile", {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then
        ((response) => {
            return response.data;
        }).catch((error) => {
            return Promise.reject(error);
        }));
}

export async function GetUserProfileByID(id: string): Promise<any> {
    return (axios.get(apiUrlUser + id, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then
        ((response) => {
            return response.data;
        }).catch((error) => {
            return Promise.reject(error);
        }));
}

export async function UpdateUserProfile(name: string, email: string): Promise<any> {
    return (axios.put(apiUrlUser + "profile", {
        name,
        email,
    }, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then
        ((response) => {
            return response.data;
        }).catch((error) => {
            return Promise.reject(error);
        }));
}

export function LogOut(): any {
    localStorage.removeItem("token");
}

export default {
    GetUserProfile,
    UpdateUserProfile,
    LogOut,
}