import React from 'react';
import { gql, useQuery } from '@apollo/client';

import SuggestedProfilesContainer from './styles';
import LoadingSuggestedProfile from './loading';
import { IProfile } from '../../interfaces/Profile';

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

const SuggestedProfiles: React.FC = () => {
  const { data, loading } = useQuery<ISuggestedProfile>(GET_SUGGESTED_PROFILES);

  return (
    <SuggestedProfilesContainer>
      <h4>Sugestões para seguir</h4>
      {loading ? (
        <LoadingSuggestedProfile />
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
              <button type="button">SEGUIR</button>
            </div>
          ))}
        </>
      )}
    </SuggestedProfilesContainer>
  );
};

export default SuggestedProfiles;
