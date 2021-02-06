import React, { useReducer } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { FaImage, FaMusic } from 'react-icons/fa';
import { AppBar, Tab, Tabs, ThemeProvider } from '@material-ui/core';

import Header from '../../components/Header';
import MobileFooter from '../../components/MobileFooter';
import CreatePost from '../../components/Post/CreatePost';
import NewPostContainer from '../../styles/pages/new-post/styles';
import mainTheme from '../../styles/themes/MainTheme';

const CreateAudioPost = dynamic(
  () => import('../../components/Post/CreateAudioPost'),
);

const createPostReducer = (state, action) => {
  switch (action.type) {
    case 'imagePost':
      return <CreatePost />;
    case 'audioPost':
      return <CreateAudioPost />;
    default:
      return <CreatePost />;
  }
};

const NewPost: React.FC = () => {
  const [state, dispatch] = useReducer(createPostReducer, <CreatePost />);

  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: number,
  ) => {
    setValue(newValue);
  };
  return (
    <NewPostContainer>
      <Head>
        <title>Novo Post</title>
      </Head>
      <Header />
      <main>
        <div className="container">
          <ThemeProvider theme={mainTheme}>
            <div className="posts-tabs">
              <AppBar position="static" color="secondary">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  aria-label="Tabs para escolher o tipo de arquivo para upload"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab
                    label="Post Imagem"
                    icon={<FaImage />}
                    onClick={() => dispatch({ type: 'imagePost' })}
                  />
                  <Tab
                    label="Post Áudio"
                    icon={<FaMusic />}
                    onClick={() => dispatch({ type: 'audioPost' })}
                  />
                </Tabs>
              </AppBar>
            </div>
          </ThemeProvider>
          {state}
        </div>
      </main>
      <MobileFooter />
    </NewPostContainer>
  );
};

export default NewPost;
