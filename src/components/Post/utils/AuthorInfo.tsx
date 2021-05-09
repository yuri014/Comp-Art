import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

import { IProfile } from '@interfaces/Profile';
import { AuthorInfoContainer } from '../utilsStyles';

const OptionsMenu = dynamic(() => import('../OptionsMenu'));

interface AuthorInfoProps {
  profile: IProfile;
  handleDeletePost: () => void;
  postID: string;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({
  handleDeletePost,
  profile,
  postID,
}) => (
  <>
    <AuthorInfoContainer>
      <img
        alt={`Imagem de perfil de ${profile.name}`}
        src={process.env.NEXT_PUBLIC_API_HOST + profile.avatar}
      />
      <Link href={`/profile/${profile.owner}`}>
        <a>
          <div>
            <p>{profile.name}</p>
            <span>
              <p>@{profile.owner}</p>
            </span>
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

export default AuthorInfo;
