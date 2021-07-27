import React from 'react';
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
  const excludedQueries = ['getFollowers', 'getFollowing'];

  const isAExcludedQuery = excludedQueries.includes(payload.queryResult);

  const { data, loading, fetchMore } = useQuery(payload.query, {
    variables: { offset: isAExcludedQuery ? [0, 0] : 0, ...variable },
  });

  const dataLength = () => {
    if (isAExcludedQuery) {
      const artistLength = data[`${payload.queryResult}`].filter(
        item => item.isArtist,
      ).length;

      const userLength = data[`${payload.queryResult}`].length - artistLength;

      return [artistLength || 0, userLength || 0];
    }
    return data[`${payload.queryResult}`].length;
  };

  const lastProfileRefLikes = useInfiniteScroll(data, async () => {
    const newProfiles = await fetchMore({
      variables: { offset: dataLength() },
    });

    return newProfiles.data[`${payload.queryResult}`].length >= 4;
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
                      <div
                        key={`${profile._id}__${nanoid()}`}
                        ref={lastProfileRefLikes}
                      >
                        <ProfileSimpleCard profile={profile} />
                      </div>
                    );
                  }

                  return (
                    <ProfileSimpleCard
                      key={`${profile._id}__${nanoid()}`}
                      profile={profile}
                    />
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
