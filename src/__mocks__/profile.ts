import { IProfile } from '@interfaces/Profile';
import { nanoid } from 'nanoid';

const ProfileMock: IProfile = {
  _id: nanoid(),
  avatar: '',
  bio: '',
  coverImage: '',
  createdAt: '',
  followers: 0,
  following: 0,
  followsYou: false,
  hashtags: [],
  isArtist: false,
  isFollowing: false,
  level: 0,
  links: {
    bandcamp: '',
    customLink: '',
    deviantart: '',
    facebook: '',
    pinterest: '',
    soundcloud: '',
    twitter: '',
    wattpad: '',
  },
  name: '',
  owner: '',
  xp: 0,
  postCount: 0,
  sharedPostCount: 0,
};

export default ProfileMock;
