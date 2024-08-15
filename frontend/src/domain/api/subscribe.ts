import axios from "axios";
import { apiUrlSubscribe } from "../../utils/constant";

export async function SubscribeTopic(id: string): Promise<any> {
    return (axios.post(apiUrlSubscribe + id, {}, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return Promise.reject(error);
    }));
}

export async function UnsubscribeTopic(id: string): Promise<any> {
    return (axios.delete(apiUrlSubscribe + id, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return Promise.reject(error);
    }));
}

export async function AllSubscribersOfTopic(id: string): Promise<any> {
    return (axios.get(apiUrlSubscribe + id, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return Promise.reject(error);
    }));
}

export async function CountSubscribersOfTopic(id: string): Promise<any> {
    return (axios.get(apiUrlSubscribe + "count/" + id, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return Promise.reject(error);
    }));
}

export async function IsSubscribed(id: string): Promise<any> {
    return (axios.get(apiUrlSubscribe + "is_subscribed/" + id, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return Promise.reject(error);
    }));
}

export default {
    SubscribeTopic,
    UnsubscribeTopic,
    AllSubscribersOfTopic,
    CountSubscribersOfTopic,
    IsSubscribed,
}