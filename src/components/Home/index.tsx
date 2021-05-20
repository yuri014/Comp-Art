import React, { useContext } from 'react';

import CreatePost from '@components/CreatePost';
import { AuthContext } from '@context/auth';
import HomeProfile from '../HomeProfile';
import { IProfile } from '../../interfaces/Profile';
import SuggestedProfiles from '../SuggestedProfiles';
import HashtagsProfile from '../HomeProfile/HashtagsProfile';

interface HomeProps {
  getLoggedProfile?: IProfile;
  children: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ getLoggedProfile, children }) => {
  const auth = useContext(AuthContext);

  return (
    <div className="home-desktop-content">
      {getLoggedProfile ? (
        <>
          <aside>
            <HomeProfile getLoggedProfile={getLoggedProfile} />
            <HashtagsProfile hashtags={getLoggedProfile.hashtags} />
          </aside>
          <div className="timeline">
            {auth.user && auth.user.isArtist && (
              <CreatePost getLoggedProfile={getLoggedProfile} />
            )}
            {children}
          </div>
          <aside>
            <SuggestedProfiles />
          </aside>
        </>
      ) : (
        <>
          <aside />
          <div className="timeline">{children}</div>
          <aside />
        </>
      )}
    </div>
  );
};

export default React.memo(Home);
