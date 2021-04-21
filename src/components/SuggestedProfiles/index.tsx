import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import SuggestedProfilesContainer from './styles';
import LoadingSuggestedProfile from './loading';
import { IProfile } from '../../interfaces/Profile';
import {
  FOLLOW_PROFILE,
  UNFOLLOW_PROFILE,
} from '../../graphql/mutations/profile';
import CASecondaryButton from '../../styles/components/secondaryButton';

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
    if (data.getSuggestedProfiles) {
      setShowComponent(data.getSuggestedProfiles.length !== 0);
    }
  }, [data.getSuggestedProfiles]);

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
