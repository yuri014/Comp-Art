import React, { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { DocumentNode, useQuery } from '@apollo/client';

import mainTheme from '../../styles/themes/MainTheme';
import LoadingProfileLikes from './Loading';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { IProfile } from '../../interfaces/Profile';
import Modal from '../Modal';
import ModalProfileContainer from './styles';
import ProfileSimpleCard from '../ProfileCard';

interface ModalProps {
  onHide: () => void;
  variable: { [key: string]: string };
  query: DocumentNode;
  queryResult: string;
}

const ModalProfile: React.FC<ModalProps> = ({
  onHide,
  variable,
  query,
  queryResult,
}) => {
  const { data, loading, fetchMore, client } = useQuery(query, {
    variables: { offset: 0, ...variable },
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
      !!data[`${queryResult}`] &&
      fetchMore({
        variables: { offset: data[`${queryResult}`].length },
      }).then(newProfiles => newProfiles.data[`${queryResult}`].length < 3),
  );

  return (
    <ThemeProvider theme={mainTheme}>
      <Modal onHide={onHide} show title="Ver curtidas" fontSize="2.4rem">
        <ModalProfileContainer>
          <div className="modal-content">
            {loading && !data ? (
              <>
                <LoadingProfileLikes />
              </>
            ) : (
              <>
                {data[`${queryResult}`].map(
                  (profile: IProfile, index: number) => {
                    if (data[`${queryResult}`].length === index + 1) {
                      return (
                        <div key={profile._id} ref={lastPostRefLikes}>
                          <ProfileSimpleCard profile={profile} />
                        </div>
                      );
                    }

                    return (
                      <ProfileSimpleCard key={profile._id} profile={profile} />
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
