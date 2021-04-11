import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import SuggestedProfilesContainer from './styles';
import LoadingSuggestedProfile from './loading';
import { IProfile } from '../../interfaces/Profile';
import {
  FOLLOW_PROFILE,
  UNFOLLOW_PROFILE,
} from '../../graphql/mutations/profile';

const GET_SUGGESTED_PROFILES = gql`
  query GetSuggestedProfiles {
    getSuggestedProfiles {
      avatar
      name
      owner
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
        <button
          type="button"
          className="followed"
          onClick={() => {
            unfollow({
              variables: { username },
            });
            setIsFollowing(false);
          }}
        >
          SEGUINDO
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            follow({
              variables: { username },
            });
            setIsFollowing(true);
          }}
        >
          SEGUIR
        </button>
      )}
    </>
  );
};

const SuggestedProfiles: React.FC = () => {
  const { data, loading } = useQuery<ISuggestedProfile>(GET_SUGGESTED_PROFILES);

  return (
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
            <div key={profile.owner} className="suggested-profile-container">
              <div className="suggested-profile">
                <img
                  src={process.env.NEXT_PUBLIC_API_HOST + profile.avatar}
                  alt={profile.name}
                />

                <div className="suggested-profile-info">
                  <p className="limited-text">{profile.name}</p>
                  <p className="limited-text">@{profile.owner}</p>
                </div>
              </div>
              <FollowButton username={profile.owner} />
            </div>
          ))}
        </>
      )}
    </SuggestedProfilesContainer>
  );
};

export default SuggestedProfiles;
