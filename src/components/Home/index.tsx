import React from 'react';

import HomeProfile from '../HomeProfile';
import { IProfile } from '../../interfaces/Profile';
import SuggestedProfiles from '../SuggestedProfiles';
import HashtagsProfile from '../HomeProfile/HashtagsProfile';

interface HomeProps {
  getLoggedProfile?: IProfile;
  children: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ getLoggedProfile, children }) => (
  <div className="home-desktop-content">
    {getLoggedProfile ? (
      <>
        <aside>
          <HomeProfile getLoggedProfile={getLoggedProfile} />
          <HashtagsProfile
            hashtags={getLoggedProfile.hashtags}
            isArtist={getLoggedProfile.isArtist}
          />
        </aside>
        <div className="timeline">{children}</div>
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

export default React.memo(Home);
