import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { gql, useMutation, useQuery } from '@apollo/client';

import ProfileImage from '@components/ProfileImage';
import SuggestedProfilesContainer from './styles';
import LoadingSuggestedProfile from './loading';
import { IProfile } from '../../interfaces/Profile';
import {
  FOLLOW_PROFILE,
  UNFOLLOW_PROFILE,
} from '../../graphql/mutations/profile';
import CASecondaryButton from '../../styles/components/secondaryButton';
import { CORE_PROFILE_VIEW } from '../../graphql/fragments/profile';

const GET_SUGGESTED_PROFILES = gql`
  ${CORE_PROFILE_VIEW}
  query GetSuggestedProfiles {
    getSuggestedProfiles {
      ...CoreProfileView
    }
  }
`;

interface ISuggestedProfile {
  getSuggestedProfiles: Array<IProfile>;
}

const FollowButton: React.FC<{ username: string }> = ({ username }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const [follow] = useMutation(FOLLOW_PROFILE);
  const [unfollow] = useMutation(UNFOLLOW_PROFILE);
  return (
    <>
      {isFollowing ? (
        <CASecondaryButton
          type="button"
          className="active"
          onClick={() => {
            unfollow({
              variables: { username },
            });
            setIsFollowing(false);
          }}
        >
          SEGUINDO
        </CASecondaryButton>
      ) : (
        <CASecondaryButton
          type="button"
          onClick={() => {
            follow({
              variables: { username },
            });
            setIsFollowing(true);
          }}
        >
          SEGUIR
        </CASecondaryButton>
      )}
    </>
  );
};

const SuggestedProfiles: React.FC = () => {
  const [showComponent, setShowComponent] = useState(true);
  const { data, loading } = useQuery<ISuggestedProfile>(GET_SUGGESTED_PROFILES);

  useEffect(() => {
    if (data && !loading) {
      setShowComponent(data.getSuggestedProfiles.length !== 0);
    }
  }, [data, loading]);

  return (
    <>
      {showComponent && (
        <SuggestedProfilesContainer>
          <h4>Sugestões para seguir</h4>
          {loading && !data ? (
            <>
              <LoadingSuggestedProfile />
              <LoadingSuggestedProfile />
              <LoadingSuggestedProfile />
              <LoadingSuggestedProfile />
              <LoadingSuggestedProfile />
            </>
          ) : (
            <>
              {data.getSuggestedProfiles.map(profile => (
                <React.Fragment key={profile.owner}>
                  <div className="suggested-profile-container">
                    <Link href={`/profile/${profile.owner}`}>
                      <a className="suggested-profile">
                        <ProfileImage
                          avatar={profile.avatar}
                          alt={profile.name}
                          username={profile.owner}
                          className="suggested-profile-image"
                        />

                        <div className="suggested-profile-info">
                          <p className="limited-text">{profile.name}</p>
                          <p className="limited-text">@{profile.owner}</p>
                        </div>
                      </a>
                    </Link>
                    <FollowButton username={profile.owner} />
                  </div>
                </React.Fragment>
              ))}
            </>
          )}
        </SuggestedProfilesContainer>
      )}
    </>
  );
};

export default SuggestedProfiles;
