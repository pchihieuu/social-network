import { Post } from './post';
import User from './user';

export interface Comment {
    id: number;
    content: string;
    user: User;
}

export default Comment;