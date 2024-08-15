import axios from "axios";
import Post from '../entity/post';
import { apiUrlPost } from "../../utils/constant";

export async function GetAllPosts(): Promise<any> {
    return axios.get(apiUrlPost, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return Promise.reject(error);
    });
}

export async function GetPostById(id: number): Promise<any> {
    return (axios.get(apiUrlPost + id, {
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

export async function CreatePost(post: Post): Promise<any> {
    return (axios.post(apiUrlPost, post, {
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

export async function UpdatePost(post: Post): Promise<any> {
    return (axios.put(apiUrlPost + post.id, post, {
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

export async function DeletePost(id: string): Promise<any> {
    return (axios.delete(apiUrlPost + id, {
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

export async function GetAllPostsByTopicId(id: string): Promise<any> {
    return (axios.get(apiUrlPost + "topic/" + id, {
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

export async function GetTrendingPosts(): Promise<any> {
    return (axios.get(apiUrlPost + "trending", {
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

export async function GetFollowingPosts(): Promise<any> {
    return (axios.get(apiUrlPost + "following", {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then
        ((response) => {
            return response.data;
        }
        ).catch((error) => {
            return Promise.reject(error);
        }
        ));
}

export async function GetSubscribedTopicPosts(): Promise<any> {
    return (axios.get(apiUrlPost + "subscribed", {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then
        ((response) => {
            return response.data;
        }
        ).catch((error) => {
            return Promise.reject(error);
        }
        ));
}

export async function SearchPosts(search: string): Promise<any> {
    return (axios.get(apiUrlPost + "search/" + search, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    }).then
        ((response) => {
            return response.data;
        }
        ).catch((error) => {
            return Promise.reject(error);
        }
        ));
}

export default {
    GetAllPosts,
    GetPostById,
    CreatePost,
    UpdatePost,
    DeletePost,
    GetAllPostsByTopicId,
    GetTrendingPosts,
    GetFollowingPosts,
    GetSubscribedTopicPosts,
    SearchPosts,
}