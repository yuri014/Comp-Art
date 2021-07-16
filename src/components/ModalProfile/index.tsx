import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { DocumentNode, useQuery } from '@apollo/client';

import { ModalProvider } from '@context/modal';
import LoadingProfileLikes from './Loading';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { IProfile } from '../../interfaces/Profile';
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
    <ModalProvider onHide={onHide} title={payload.title} fontSize="2.4rem">
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
                      !!profile && (
                        <div
                          key={`${profile._id}__${nanoid()}`}
                          ref={lastProfileRefLikes}
                        >
                          <ProfileSimpleCard profile={profile} />
                        </div>
                      )
                    );
                  }

                  return (
                    !!profile && (
                      <ProfileSimpleCard
                        key={`${profile._id}__${nanoid()}`}
                        profile={profile}
                      />
                    )
                  );
                },
              )}
            </>
          )}
        </div>
      </ModalProfileContainer>
    </ModalProvider>
  );
};

export default ModalProfile;
