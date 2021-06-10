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
  const { data, loading, fetchMore, client } = useQuery(payload.query, {
    variables: { offset: 0, ...variable },
  });

  useEffect(
    () => () => {
      client.cache.evict({ fieldName: payload.queryResult });
    },
    [client.cache, payload.queryResult],
  );

  const lastPostRefLikes = useInfiniteScroll(
    data,
    () =>
      !!data[`${payload.queryResult}`] &&
      fetchMore({
        variables: { offset: data[`${payload.queryResult}`].length },
      }).then(
        newProfiles => newProfiles.data[`${payload.queryResult}`].length < 3,
      ),
  );

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
