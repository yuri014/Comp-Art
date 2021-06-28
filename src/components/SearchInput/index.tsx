import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useLazyQuery } from '@apollo/client';
import { IconButton } from '@material-ui/core';
import { FaSearch } from 'react-icons/fa';

import { GET_PROFILE_PREVIEW_SEARCH } from '@graphql/queries/profile';
import useOutsideClick from '@hooks/outsideClick';
import { ISearchProfile } from '@interfaces/Profile';
import SearchInputContainer from './styles';

const SearchInput: React.FC = () => {
  const router = useRouter();
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
    setShowSearch(true);
    setSearchProfile(e.target.value);
    getProfile();
  };

  const modalSearchRef = useRef(null);
  useOutsideClick(modalSearchRef, () => setShowSearch(false));

  const Search = () => (
    <div className="search-button">
      <IconButton
        type="button"
        aria-label="Buscar"
        onClick={() => router.push(`/search/${searchProfile}`)}
      >
        <FaSearch />
      </IconButton>
    </div>
  );

  return (
    <SearchInputContainer ref={modalSearchRef}>
      <input
        type="text"
        title="Buscar..."
        onChange={e => handleSearchProfile(e)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            router.push(`/search/${searchProfile}`);
          }
        }}
        placeholder="Buscar..."
      />
      <Search />
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
    </SearchInputContainer>
  );
};

export default SearchInput;
