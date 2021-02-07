export interface IPost {
  _id: string;
  description: string;
  body: string;
  likes: [
    {
      username: string;
      avatar: string;
      createdAt: string;
    },
  ];
  likesCount: number;
  sharedCount: number;
  commentsCount: number;
  createdAt: string;
  artist: {
    username: string;
    name: string;
  };
  isAudio: boolean;
  avatar: string;
  isLiked?: boolean;
}

export interface PostProps {
  post: IPost;
}
