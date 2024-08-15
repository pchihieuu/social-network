import { apiUrlTopic } from "../../utils/constant";
import axios from "axios";

export async function GetAllTopics(): Promise<any> {
    return axios.get(apiUrlTopic, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return Promise.reject(error);
    });
}

export async function GetTopicById(id: string): Promise<any> {
    return (axios.get(apiUrlTopic + id, {
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

export default {
    GetAllTopics,
    GetTopicById,
}