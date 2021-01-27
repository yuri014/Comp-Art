export interface IPost {
  getPosts: [
    {
      description: string;
      body: string;
      likes: {
        username: string;
        avatar: string;
        createdAt: string;
      };
      sharedCount: number;
      createdAt: string;
      artist: string;
    },
  ];
}
