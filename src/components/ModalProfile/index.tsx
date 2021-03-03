import React, { useEffect, useRef } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { QueryLazyOptions } from '@apollo/client';

import Link from 'next/link';
import mainTheme from '../../styles/themes/MainTheme';
import ModalLikesContainer from './styles';
import useOutsideClick from '../../hooks/outsideClick';
import LoadingProfileLikes from './Loading';
import { UseInfiniteScroll } from '../../hooks/infiniteScroll';
import { IProfile } from '../../interfaces/Profile';

interface ModalProps {
  onHide: () => void;
  lastPostRef: UseInfiniteScroll;
  queryResult: {
    data: {
      [key: string]: Array<IProfile>;
    };
    result: string;
  };
  isLoading: boolean;
  getProfiles: (options?: QueryLazyOptions<Record<string, unknown>>) => void;
}

const ModalProfile: React.FC<ModalProps> = ({
  onHide,
  lastPostRef,
  queryResult,
  getProfiles,
  isLoading,
}) => {
  const ref = useRef(null);
  useOutsideClick(ref, onHide);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <ThemeProvider theme={mainTheme}>
      <ModalLikesContainer>
        <div className="modal-content" ref={ref}>
          {isLoading ? (
            <>
              <LoadingProfileLikes />
              <LoadingProfileLikes />
              <LoadingProfileLikes />
              <LoadingProfileLikes />
              <LoadingProfileLikes />
            </>
          ) : (
            <>
              {queryResult.data[`${queryResult.result}`].map(
                (profile, index) => {
                  if (
                    queryResult.data[`${queryResult.result}`].length ===
                    index + 1
                  ) {
                    return (
                      <Link
                        href={`/profile/${profile.owner}`}
                        key={profile.owner}
                      >
                        <a ref={lastPostRef} className="profile">
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
