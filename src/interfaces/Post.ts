interface Post {
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
}

export interface PostProps {
  post: Post;
}

export interface IPost {
  getPosts: Array<Post>;
}
