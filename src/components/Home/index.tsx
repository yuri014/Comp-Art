import React from 'react';

import HomeProfile from '../HomeProfile';
import QuestsProgress from '../QuestsProgress';
import { IProfile } from '../../interfaces/Profile';
import SuggestedProfiles from '../SuggestedProfiles';
import Timeline from '../Splitter/Timeline';

interface HomeProps {
  getLoggedProfile: IProfile;
}

const Home: React.FC<HomeProps> = ({ getLoggedProfile }) => (
  <div className="home-desktop-content">
    <aside>
      <HomeProfile getLoggedProfile={getLoggedProfile} />
    </aside>
    <div className="timeline">
      <Timeline />
    </div>
    <aside>
      <SuggestedProfiles />
      <br />
      <br />
      <QuestsProgress />
    </aside>
  </div>
);

export default React.memo(Home);
