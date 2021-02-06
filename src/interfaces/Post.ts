export interface IPost {
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
}

export interface PostProps {
  post: IPost;
}
