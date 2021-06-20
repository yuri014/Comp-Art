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
  payload: {
    query: DocumentNode;
    queryResult: string;
    title: string;
  };
}

const ModalProfile: React.FC<ModalProps> = ({ onHide, variable, payload }) => {
  const { client, data, loading, fetchMore } = useQuery(payload.query, {
    variables: { offset: 0, ...variable },
  });

  useEffect(
    () => () => {
      client.cache.evict({
        id: 'ROOT_QUERY',
        fieldName: payload.queryResult,
        broadcast: false,
      });
      client.cache.gc();
    },
    [client.cache, payload.queryResult],
  );

  const lastProfileRefLikes = useInfiniteScroll(data, async () => {
    if (data[`${payload.queryResult}`].length === 6) {
      const newProfiles = await fetchMore({
        variables: { offset: data[`${payload.queryResult}`].length },
      });
      return newProfiles.data[`${payload.queryResult}`].length === 6;
    }

    return false;
  });

  return (
    <ThemeProvider theme={mainTheme}>
      <Modal onHide={onHide} show title={payload.title} fontSize="2.4rem">
        <ModalProfileContainer>
          <div className="modal-content">
            {loading && !data ? (
              <>
                <LoadingProfileLikes />
              </>
            ) : (
              <>
                {data[`${payload.queryResult}`].map(
                  (profile: IProfile, index: number) => {
                    if (data[`${payload.queryResult}`].length === index + 1) {
                      return (
                        <div key={profile._id} ref={lastProfileRefLikes}>
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
