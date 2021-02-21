import React, { useRef } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { gql, useQuery } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';

import Link from 'next/link';
import mainTheme from '../../styles/themes/MainTheme';
import ModalLikesContainer from './styles';
import useOutsideClick from '../../hooks/outsideClick';
import useInfiniteScroll from '../../hooks/infiniteScroll';
import { IProfile } from '../../interfaces/Profile';

const GET_LIKES = gql`
  query GetLikes($id: ID!, $offset: Int!) {
    getLikes(postID: $id, offset: $offset) {
      name
      avatar
      bio
      owner
      level
    }
  }
`;

interface IGetPost {
  getLikes: [IProfile];
}

interface ModalProps {
  onHide: () => void;
  id: string;
}

const ModalLikes: React.FC<ModalProps> = ({ onHide, id }) => {
  const { data, loading, fetchMore } = useQuery<IGetPost>(GET_LIKES, {
    variables: { id, offset: 0 },
  });

  const lastPostRef = useInfiniteScroll(
    data,
    !data,
    () =>
      !!data.getLikes &&
      fetchMore({
        variables: { offset: data.getLikes.length },
      }).then(newComments => newComments.data.getLikes.length < 3),
  );

  const ref = useRef(null);
  useOutsideClick(ref, onHide);

  return (
    <ThemeProvider theme={mainTheme}>
      <ModalLikesContainer>
        <div className="modal-content" ref={ref}>
          {loading ? (
            <>
              <Skeleton animation="wave" height={60} width="100%" />
              <Skeleton animation="wave" height={60} width="100%" />
              <Skeleton animation="wave" height={60} width="100%" />
              <Skeleton animation="wave" height={60} width="100%" />
              <Skeleton animation="wave" height={60} width="100%" />
              <Skeleton animation="wave" height={60} width="100%" />
            </>
          ) : (
            <>
              {data.getLikes.map((profile, index) => {
                if (data.getLikes.length === index + 1) {
                  return (
                    <Link
                      href={`/profile/${profile.owner}`}
                      key={profile.owner}
                    >
                      <a ref={lastPostRef} className="profile">
                        <img src={profile.avatar} alt="Profile" />
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
                  <Link href={`/profile/${profile.owner}`} key={profile.owner}>
                    <a className="profile">
                      <img
                        src={process.env.NEXT_PUBLIC_API_HOST + profile.avatar}
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
              })}
            </>
          )}
        </div>
      </ModalLikesContainer>
    </ThemeProvider>
  );
};

export default ModalLikes;
