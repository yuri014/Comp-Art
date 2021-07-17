import { gql } from '@apollo/client';

export const CORE_POST_VIEW = gql`
  fragment CorePostView on Post {
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
    title
    isSaved
    alt
  }
`;

export const CORE_SHARE_VIEW = gql`
  fragment CoreShareView on Share {
    _id
    description
    post {
      ... on NullPost {
        error
      }

      ... on Post {
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
        title
      }
    }
    likes {
      profile {
        name
        avatar
        owner
      }
    }
    likesCount
    commentsCount
    profile {
      name
      owner
      avatar
    }
    createdAt
    isLiked
    imageHeight
    isSaved
  }
`;
