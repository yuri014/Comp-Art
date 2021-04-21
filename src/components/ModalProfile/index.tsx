import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { DocumentNode, useQuery } from '@apollo/client';

import Link from 'next/link';
import mainTheme from '../../styles/themes/MainTheme';
import LoadingProfileLikes from './Loading';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { IProfile } from '../../interfaces/Profile';
import Modal from '../Modal';
import ModalProfileContainer from './styles';
import CASecondaryButton from '../../styles/components/secondaryButton';

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
      <Modal onHide={onHide} show title="Ver curtidas" fontSize="2.4rem">
        <ModalProfileContainer>
          <div className="modal-content">
            {loading ? (
              <>
                <LoadingProfileLikes />
                <LoadingProfileLikes />
              </>
            ) : (
              <>
                {data[`${queryResult}`].map(
                  (profile: IProfile, index: number) => {
                    if (data[`${queryResult}`].length === index + 1) {
                      return (
                        <div className="profile" ref={lastPostRefLikes}>
                          <Link
                            href={`/profile/${profile.owner}`}
                            key={profile.owner}
                          >
                            <a>
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_API_HOST +
                                  profile.avatar
                                }
                                alt="Perfil"
                              />
                              <div className="profile-content">
                                <div className="first-row">
                                  <strong>{profile.name}</strong>
                                  <div className="level">{profile.level}</div>
                                </div>
                                <div className="second-row">
                                  <p>@{profile.owner}</p>
                                  <p className="bio">{profile.bio}</p>
                                </div>
                              </div>
                            </a>
                          </Link>
                          <CASecondaryButton
                            className="main-color"
                            type="button"
                          >
                            SEGUIR
                          </CASecondaryButton>
                        </div>
                      );
                    }

                    return (
                      <div className="profile">
                        <Link
                          href={`/profile/${profile.owner}`}
                          key={profile.owner}
                        >
                          <a>
                            <img
                              src={
                                process.env.NEXT_PUBLIC_API_HOST +
                                profile.avatar
                              }
                              alt="Perfil"
                            />
                            <div className="profile-content">
                              <div className="first-row">
                                <strong>{profile.name}</strong>
                                <div className="level">{profile.level}</div>
                              </div>
                              <div className="second-row">
                                <p>@{profile.owner}</p>
                                <p className="bio">{profile.bio}</p>
                              </div>
                            </div>
                          </a>
                        </Link>
                        <CASecondaryButton className="main-color" type="button">
                          SEGUIR
                        </CASecondaryButton>
                      </div>
                    );
                  },
                )}
              </>
            )}
          </div>
        </ModalProfileContainer>
      </Modal>
    </ThemeProvider>
  );
};

export default ModalProfile;
