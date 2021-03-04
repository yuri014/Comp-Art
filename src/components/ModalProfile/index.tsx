import React, { useEffect, useRef } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { DocumentNode, useQuery } from '@apollo/client';

import Link from 'next/link';
import mainTheme from '../../styles/themes/MainTheme';
import ModalLikesContainer from './styles';
import useOutsideClick from '../../hooks/outsideClick';
import LoadingProfileLikes from './Loading';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { IProfile } from '../../interfaces/Profile';

interface ModalProps {
  onHide: () => void;
  id: string;
  query: DocumentNode;
  queryResult: string;
}

const ModalProfile: React.FC<ModalProps> = ({
  onHide,
  id,
  query,
  queryResult,
}) => {
  const { data, loading, fetchMore, client } = useQuery(query, {
    variables: { id, offset: 0 },
  });

  useEffect(
    () => () => {
      client.cache.evict({ fieldName: queryResult });
    },
    [client.cache, queryResult],
  );

  const ref = useRef(null);
  useOutsideClick(ref, onHide);

  const lastPostRefLikes = useInfiniteScroll(
    data,
    () =>
      !!data.getLikes &&
      fetchMore({
        variables: { offset: data[`${queryResult}`].length },
      }).then(newProfiles => newProfiles.data[`${queryResult}`].length < 3),
  );

  return (
    <ThemeProvider theme={mainTheme}>
      <ModalLikesContainer>
        <div className="modal-content" ref={ref}>
          {loading ? (
            <>
              <LoadingProfileLikes />
              <LoadingProfileLikes />
              <LoadingProfileLikes />
              <LoadingProfileLikes />
              <LoadingProfileLikes />
            </>
          ) : (
            <>
              {data[`${queryResult}`].map(
                (profile: IProfile, index: number) => {
                  if (data[`${queryResult}`].length === index + 1) {
                    return (
                      <Link
                        href={`/profile/${profile.owner}`}
                        key={profile.owner}
                      >
                        <a ref={lastPostRefLikes} className="profile">
                          <img
                            src={
                              process.env.NEXT_PUBLIC_API_HOST + profile.avatar
                            }
                            alt="Profile"
                          />
                          <div className="profile-content">
                            <div className="profile-info">
                              <strong>{profile.name}</strong>
                              <p>@{profile.owner}</p>
                              <div className="level">{profile.level}</div>
                            </div>
                            <p className="bio">{profile.bio}</p>
                          </div>
                        </a>
                      </Link>
                    );
                  }

                  return (
                    <Link
                      href={`/profile/${profile.owner}`}
                      key={profile.owner}
                    >
                      <a className="profile">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_API_HOST + profile.avatar
                          }
                          alt="Profile"
                        />
                        <div className="profile-content">
                          <div className="profile-info">
                            <strong>{profile.name}</strong>
                            <p>@{profile.owner}</p>
                            <div className="level">{profile.level}</div>
                          </div>
                          <p className="bio">{profile.bio}</p>
                        </div>
                      </a>
                    </Link>
                  );
                },
              )}
            </>
          )}
        </div>
      </ModalLikesContainer>
    </ThemeProvider>
  );
};

export default ModalProfile;
