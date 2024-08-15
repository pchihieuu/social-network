import axios from "axios";
import { apiUrlComment } from "../../utils/constant";

export async function GetAllComments(id: string): Promise<any> {
    return (axios.get(apiUrlComment + "post/" + id, {
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

export async function GetCommentById(id: string): Promise<any> {
    return (axios.get(apiUrlComment + id, {
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

export async function CreateComment(comment: any, postID: string): Promise<any> {
    return (axios.post(apiUrlComment + postID, comment, {
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

export async function UpdateComment(comment: any, id: string): Promise<any> {
    return (axios.put(apiUrlComment + id, comment, {
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

export async function DeleteComment(id: string): Promise<any> {
    return (axios.delete(apiUrlComment + id, {
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

export async function CountComments(id: number): Promise<any> {
    return (axios.get(apiUrlComment + "count/" + id, {
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

export default{
    GetAllComments,
    GetCommentById,
    CreateComment,
    UpdateComment,
    DeleteComment,
    CountComments,
}