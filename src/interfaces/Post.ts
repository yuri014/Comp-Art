import { IProfile } from './Profile';

export interface IPost {
  body: string;
  artist: IProfile;
  mediaId: number;
  imageHeight: string;
  title: string;
}

export type ErrorPost = {
  error: boolean;
};

export interface IShare {
  post: Timeline;
  profile: IProfile;
}

export interface Timeline extends IPost, IShare {
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
  darkColor: string;
  lightColor: string;
  thumbnail?: string;
  isSaved: boolean;
  alt: string;
}

export interface PostProps {
  post: Timeline;
}

export interface ArtistPostProps extends PostProps {
  isShare?: boolean;
}

export interface IGetPost {
  getPost: Timeline;
}

export interface IGetPosts {
  getPosts: Array<Timeline>;
}

export interface IComment {
  _id: string;
  author: {
    name: string;
    owner: string;
    avatar: string;
  };
  body: string;
  createdAt: string;
}

export interface CommentsSectionsProps {
  postId: string;
  profile: IProfile;
}

export interface IGetComment {
  getComments: Array<IComment>;
}
