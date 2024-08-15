import {User} from './user'

export interface Post{
    id: number;
    title: string;
    description: string;
    user: User;
    image_path: string;
}

export default Post;