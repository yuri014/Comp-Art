import { gql } from '@apollo/client';

export const GET_POST = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      description
      body
      likesCount
      sharedCount
      commentsCount
      createdAt
      artist {
        name
        owner
        avatar
      }
      likes {
        profile {
          owner
          avatar
        }
      }
      mediaId
      isLiked
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($offset: Int!) {
    getPosts(offset: $offset) {
      ... on Post {
        _id
        description
        body
        likes {
          profile {
            owner
            avatar
          }
        }
        likesCount
        sharedCount
        commentsCount
        createdAt
        mediaId
        artist {
          name
          owner
          avatar
        }
        isLiked
        darkColor
        lightColor
        thumbnail
        imageHeight
      }
      ... on Share {
        _id
        description
        post {
          _id
          description
          body
          artist {
            name
            owner
            avatar
          }
          createdAt
          mediaId
          darkColor
          lightColor
          thumbnail
        }
        likes {
          profile {
            name
            avatar
            owner
          }
        }
        likesCount
        sharedCount
        profile {
          name
          owner
          avatar
        }
        createdAt
        isLiked
      }
    }
  }
`;

export const GET_EXPLORE_POSTS = gql`
  query GetExplorePosts($offset: Int!) {
    getExplorePosts(offset: $offset) {
      _id
      description
      body
      likesCount
      sharedCount
      commentsCount
      createdAt
      artist {
        name
        owner
        avatar
      }
      likes {
        profile {
          owner
          avatar
        }
      }
      mediaId
      isLiked
    }
  }
`;

export const GET_PROFILE_POSTS = gql`
  query GetProfilePosts($offset: Int!, $username: String!) {
    getProfilePosts(offset: $offset, username: $username) {
      _id
      description
      body
      likesCount
      sharedCount
      commentsCount
      createdAt
      artist {
        name
        owner
        avatar
      }
      likes {
        profile {
          owner
          avatar
        }
      }
      mediaId
      isLiked
    }
  }
`;
