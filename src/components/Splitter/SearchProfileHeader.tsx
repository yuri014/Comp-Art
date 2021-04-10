import React, { useState } from 'react';
import Link from 'next/link';
import { gql, useLazyQuery } from '@apollo/client';
import { IconButton } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';

import { IProfile } from '../../interfaces/Profile';

const GET_PROFILE_PREVIEW_SEARCH = gql`
  query GetProfilePreviewSearch($query: String!, $offset: Int!, $limit: Int!) {
    searchProfiles(query: $query, offset: $offset, limit: $limit) {
      name
      owner
      avatar
    }
  }
`;

interface ISearchProfile {
  searchProfiles: Array<IProfile>;
}

const SearchProfileHeader: React.FC = () => {
  const [searchProfile, setSearchProfile] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const [getProfile, { data }] = useLazyQuery<ISearchProfile>(
    GET_PROFILE_PREVIEW_SEARCH,
    {
      variables: { query: searchProfile, offset: 0, limit: 3 },
      onCompleted: () => setShowSearch(data.searchProfiles.length > 0),
      fetchPolicy: 'no-cache',
    },
  );

  const handleSearchProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchProfile(e.target.value);
    getProfile();
  };

  return (
    <div className="search-input">
      <input
        type="text"
        title="Buscar..."
        onChange={e => handleSearchProfile(e)}
        placeholder="Buscar..."
        onFocus={() => setShowSearch(true)}
      />
      <div className="search-button">
        <IconButton type="button" aria-label="Buscar">
          <FaSearch />
        </IconButton>
      </div>
      {data && showSearch && (
        <div className="search-results">
          {data.searchProfiles.map(profile => (
            <Link href={`/profile/${profile.owner}`}>
              <a className="profile-info" key={profile.owner}>
                <img
                  src={process.env.NEXT_PUBLIC_API_HOST + profile.avatar}
                  alt={profile.name}
                />
                <div>
                  <strong>{profile.name}</strong>
                  <p>@{profile.owner}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProfileHeader;
