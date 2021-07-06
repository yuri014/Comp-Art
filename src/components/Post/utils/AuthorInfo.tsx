import React from 'react';
import Link from 'next/link';

import ProfileImage from '@components/ProfileImage';
import { IProfile } from '@interfaces/Profile';
import formatDistanceTimePass from '@utils/formatDistanceTimePass';
import { AuthorInfoContainer } from '../utilsStyles';
import OptionsMenu from '../OptionsMenu';

interface AuthorInfoProps {
  profile: IProfile;
  handleDeletePost: () => void;
  postID: string;
  createdAt: string;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({
  createdAt,
  handleDeletePost,
  profile,
  postID,
}) => (
  <>
    <AuthorInfoContainer>
      <Link href={`/profile/${profile.owner}`}>
        <a>
          <ProfileImage
            alt={`Imagem de perfil de ${profile.name}`}
            avatar={profile.avatar}
            username={profile.owner}
            className="prevent-redirect-post author-image"
          />
          <div>
            <div className="author">
              <strong className="prevent-redirect-post">{profile.name}</strong>
              <p className="prevent-redirect-post">@{profile.owner}</p>
            </div>
            <p>{formatDistanceTimePass(createdAt)}</p>
          </div>
        </a>
      </Link>
    </AuthorInfoContainer>
    <div>
      <OptionsMenu
        deletePost={handleDeletePost}
        id={postID}
        username={profile.owner}
      />
    </div>
  </>
);

export default React.memo(AuthorInfo);
