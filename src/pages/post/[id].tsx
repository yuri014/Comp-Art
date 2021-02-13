/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { gql, useQuery } from '@apollo/client';
import { AiOutlineSend } from 'react-icons/ai';

import { FaArrowLeft, FaUserAlt } from 'react-icons/fa';
import Link from 'next/link';
import { IconButton, TextField, ThemeProvider } from '@material-ui/core';
import Header from '../../components/Header';
import { initializeApollo } from '../../graphql/apollo/config';
import { GET_POST } from '../../graphql/queries/post';
import { IPost, PostProps } from '../../interfaces/Post';
import AudioPost from '../../components/Post/AudioPost';
import PostPageContainer from '../../styles/pages/post/styles';
import FullImagePost from '../../components/Post/FullImagePost';
import mainTheme from '../../styles/themes/MainTheme';
import Comment from '../../components/Comment';

interface PostQuery {
  getPost: IPost;
}

const GET_IS_LIKED = gql`
  query GetPost($id: ID!) {
    getPost(id: $id) {
      isLiked
    }
  }
`;

const Post: React.FC<PostProps> = ({ post }) => {
  const [postData, setPostData] = useState<IPost>(post);
  const { data } = useQuery<PostQuery>(GET_IS_LIKED, {
    variables: { id: post._id },
  });

  useEffect(() => {
    if (data) {
      const newPost = post;
      newPost.isLiked = data.getPost.isLiked;
      setPostData({ ...newPost });
    }
  }, [data, post]);

  return (
    <PostPageContainer>
      <Header />
      <nav>
        <FaArrowLeft />
        <Link href="/profile/">
          <a>
            <FaUserAlt />
          </a>
        </Link>
      </nav>
      <main>
        {postData.isAudio ? (
          <AudioPost post={postData} />
        ) : (
          <FullImagePost post={postData} />
        )}
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </main>
      <ThemeProvider theme={mainTheme}>
        <footer>
          <img src="/profile.jpg" alt="Profile name" />
          <TextField
            id="send-comment"
            label="Enviar um comentário"
            fullWidth
            multiline
          />
          <IconButton>
            <div className="send-button">
              <AiOutlineSend />
            </div>
          </IconButton>
        </footer>
      </ThemeProvider>
    </PostPageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params;

  const client = initializeApollo();

  const post = await client.query({
    query: GET_POST,
    variables: { id },
    errorPolicy: 'ignore',
  });

  if (!post.data.getPost) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: { ...post.data.getPost, _id: id },
    },
  };
};

export default Post;
