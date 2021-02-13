import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { IconButton, TextField, ThemeProvider } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import { AiOutlineSend } from 'react-icons/ai';
import { FaArrowLeft, FaUserAlt } from 'react-icons/fa';

import { initializeApollo } from '../../graphql/apollo/config';
import { GET_POST } from '../../graphql/queries/post';
import { IPost, PostProps } from '../../interfaces/Post';
import AudioPost from '../../components/Post/AudioPost';
import PostPageContainer from '../../styles/pages/post/styles';
import FullImagePost from '../../components/Post/FullImagePost';
import mainTheme from '../../styles/themes/MainTheme';
import Comment from '../../components/Comment';
import Meta from '../../components/SEO/Meta';

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
      <Meta
        description={`Post de ${postData.artist.name}`}
        keywords={`comp-art, post, artista, divulgação, ${postData.artist.name}`}
        title={`Post - ${postData.artist.name}`}
        uri={`/post/${postData._id}`}
      />

      <main>
        <nav>
          <FaArrowLeft />
          <Link href="/profile/">
            <a title="Meu perfil">
              <FaUserAlt />
            </a>
          </Link>
        </nav>
        {postData.isAudio ? (
          <AudioPost post={postData} />
        ) : (
          <FullImagePost post={postData} />
        )}
      </main>
      <div className="comments">
        <div className="comment-content">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
        <ThemeProvider theme={mainTheme}>
          <footer>
            <img src="/profile.jpg" alt="Profile name" />
            <TextField
              id="send-comment"
              label="Enviar um comentário"
              fullWidth
              multiline
            />
            <IconButton aria-label="enviar comentário" color="primary">
              <div className="send-button">
                <AiOutlineSend />
              </div>
            </IconButton>
          </footer>
        </ThemeProvider>
      </div>
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
