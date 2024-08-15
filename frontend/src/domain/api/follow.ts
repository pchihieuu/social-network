import axios from "axios";
import { apiUrlFollow } from "../../utils/constant";

export async function FollowUser(id: number): Promise<any> {
    return (axios.post(apiUrlFollow, {
        target_user_id: id,
    }, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return Promise.reject(error);
    }));
}

export async function UnfollowUser(id: number): Promise<any> {
    return (axios.delete(apiUrlFollow + id, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return Promise.reject(error);
    }));
}

export async function GetAllFollowersOfUser(id: number): Promise<any> {
    return (axios.get(apiUrlFollow + id, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return Promise.reject(error);
    }));
}

export async function GetAllFollowingOfUser(id: number): Promise<any> {
    return (axios.get(apiUrlFollow + "following/" + id, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return Promise.reject(error);
    }));
}

export async function IsFollowing(id: number): Promise<any> {
    return (axios.get(apiUrlFollow + "is_following/" + id, {
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
    FollowUser,
    UnfollowUser,
    GetAllFollowersOfUser,
    GetAllFollowingOfUser,
    IsFollowing,
}