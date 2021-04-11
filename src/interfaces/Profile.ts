export interface IProfileInput {
  name: string;
  avatar: File;
  coverImage: File;
  bio: string;
}

export interface IProfile {
  _id: string;
  name: string;
  avatar: string;
  coverImage: string;
  bio: string;
  level: number;
  xp: number;
  followers: number;
  following: number;
  hashtags: Array<string>;
  owner: string;
  isArtist: boolean;
  links: {
    soundcloud: string;
    twitter: string;
    facebook: string;
    wattpad: string;
    pinterest: string;
    bandcamp: string;
    deviantart: string;
    customLink: string;
  };
  sharedPostCount?: number;
  postCount?: number;
}

export interface ILoggedProfile {
  getLoggedProfile: IProfile;
}
