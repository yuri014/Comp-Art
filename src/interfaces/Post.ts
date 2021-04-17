import { IProfile } from './Profile';

export interface IPost {
  body: string;
  artist: IProfile;
  mediaId: number;
}

export interface IShare {
  post: IPost;
  profile: IProfile;
}

interface Timeline extends IPost, IShare {
  _id: string;
  description: string;
  likes: Array<{
    profile: IProfile;
  }>;
  likesCount: number;
  sharedCount: number;
  commentsCount: number;
  createdAt: string;
  isLiked?: boolean;
}

export interface PostProps {
  post: IPost;
}

export interface IGetPosts {
  getPosts: Array<Timeline>;
}

export interface IComment {
  author: {
    name: string;
    owner: string;
    avatar: string;
  };
  body: string;
  createdAt: string;
}

export interface IGetComment {
  getComments: [IComment];
}
