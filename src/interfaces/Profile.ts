export interface IProfileInput {
  name: string;
  avatar: File;
  coverImage: File;
  bio: string;
}

export interface IProfile {
  name: string;
  avatar: string;
  coverImage: string;
  bio: string;
  level: number;
  xp: number;
  followers: number;
  following: number;
}
