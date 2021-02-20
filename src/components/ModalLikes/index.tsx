import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { gql, useQuery } from '@apollo/client';
import { ThemeProvider } from '@material-ui/core';

import mainTheme from '../../styles/themes/MainTheme';
import ModalLikesContainer from './styles';
import { IPost } from '../../interfaces/Post';

const GET_LIKES = gql`
  query GetLikes {
    getPost(id: "60308b75a13d0853616d6b62") {
      likes {
        profile {
          name
          avatar
          bio
          owner
          level
        }
      }
    }
  }
`;

interface IGetPost {
  getPost: IPost;
}

const ModalLikes: React.FC = () => {
  const { data, loading } = useQuery<IGetPost>(GET_LIKES);

  return (
    <ThemeProvider theme={mainTheme}>
      <ModalLikesContainer>
        <div className="modal-content">
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
              {data.getPost.likes.map(({ profile }) => (
                <div key={profile.owner} className="profile">
                  <img src={profile.avatar || '/profile.jpg'} alt="Profile" />
                  <div className="profile-content">
                    <div className="profile-info">
                      <strong>{profile.name}</strong>
                      <p>@{profile.owner}</p>
                      <div className="level">{profile.level}</div>
                    </div>
                    <p className="bio">{profile.bio}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </ModalLikesContainer>
    </ThemeProvider>
  );
};

export default ModalLikes;
