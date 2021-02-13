/* eslint-disable no-underscore-dangle */
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
import OptionsMenu from '../../components/Post/OptionsMenu';
import useDeletePost from '../../hooks/posts';

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

  const [deletePost] = useDeletePost(post._id);

  useEffect(() => {
    if (data) {
      const newPost = post;
      newPost.isLiked = data.getPost.isLiked;
      setPostData({ ...newPost });
    }
  }, [data, post]);

  return (
    <PostPageContainer>
      <nav>
        <FaArrowLeft />
        <Link href="/profile/">
          <a>
            <FaUserAlt />
          </a>
        </Link>
      </nav>
      <main>
        <div className="post">
          {postData.isAudio ? (
            <AudioPost post={postData} />
          ) : (
            <FullImagePost post={postData} />
          )}
        </div>
        <div className="comments">
          {/* {<div className="post-author">
            <div className="author-info">
              <img
                alt={`Imagem de perfil de ${post.artist.name}`}
                src={post.avatar || '/profile.jpg'}
              />
              <Link href={`/profile/${post.artist.username}`}>
                <a>
                  <div>
                    <h4>{post.artist.name}</h4>
                    <span>
                      <p>
                        {new Date(post.createdAt).toLocaleDateString('en-GB')}
                      </p>
                      <p>&nbsp;●&nbsp;</p>
                      <p>@{post.artist.username}</p>
                    </span>
                  </div>
                </a>
              </Link>
            </div>
            <div className="post-config">
              <OptionsMenu
                deletePost={deletePost}
                id={post._id}
                username={post.artist.username}
              />
            </div>
          </div>
          <div className="post-description">
            <p>{post.description}</p>
          </div>} */}
          <div className="comment-content">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
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
              <IconButton>
                <div className="send-button">
                  <AiOutlineSend />
                </div>
              </IconButton>
            </footer>
          </ThemeProvider>
        </div>
      </main>
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
