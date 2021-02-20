import { IProfile } from './Profile';

export interface IPost {
  _id: string;
  description: string;
  body: string;
  likes: [
    {
      profile: IProfile;
    },
  ];
  likesCount: number;
  sharedCount: number;
  commentsCount: number;
  createdAt: string;
  artist: {
    owner: string;
    name: string;
  };
  isAudio: boolean;
  avatar: string;
  isLiked?: boolean;
}

export interface PostProps {
  post: IPost;
}

export interface IGetPosts {
  getPosts: Array<IPost>;
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
