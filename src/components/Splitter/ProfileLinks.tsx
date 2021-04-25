import React from 'react';
import { SiWattpad } from 'react-icons/si';
import {
  FaBandcamp,
  FaDeviantart,
  FaFacebook,
  FaLink,
  FaPinterest,
  FaSoundcloud,
  FaTwitter,
} from 'react-icons/fa';

interface ProfileLinksProps {
  links: {
    soundcloud: string;
    twitter: string;
    facebook: string;
    wattpad: string;
    pinterest: string;
    bandcamp: string;
    deviantart: string;
    customLink: string;
  };
}

const ProfileLinks: React.FC<ProfileLinksProps> = ({ links }) => (
  <div className="profile-links">
    <div>
      {links.soundcloud && (
        <a
          href={`http://soundcloud.com/${links.soundcloud}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Soundcloud"
        >
          <FaSoundcloud className="soundcloud-icon" />
        </a>
      )}
      {links.twitter && (
        <a
          href={`http://twitter.com/${links.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Twitter"
        >
          <FaTwitter className="twitter-icon" />
        </a>
      )}
      {links.deviantart && (
        <a
          href={`http://deviantart.com/${links.deviantart}`}
          target="_blank"
          rel="noopener noreferrer"
          title="DeviantArt"
        >
          <FaDeviantart className="deviantart-icon" />
        </a>
      )}
      {links.bandcamp && (
        <a
          href={`http://${links.bandcamp}.bandcamp.com`}
          target="_blank"
          rel="noopener noreferrer"
          title="Bandcamp"
        >
          <FaBandcamp className="bandcamp-icon" />
        </a>
      )}
    </div>
    <div>
      {links.wattpad && (
        <a
          href={`http://wattpad.com/user/${links.wattpad}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Wattpad"
        >
          <SiWattpad className="wattpad-icon" />
        </a>
      )}
      {links.facebook && (
        <a
          href={`http://facebook.com/${links.facebook}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
        >
          <FaFacebook className="facebook-icon" />
        </a>
      )}
      {links.pinterest && (
        <a
          href={`http://pinterest.com/${links.pinterest}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Pinterest"
        >
          <FaPinterest className="pinterest-icon" />
        </a>
      )}
      {links.customLink && (
        <a
          href={links.customLink}
          target="_blank"
          rel="noopener noreferrer"
          title="Link Externo"
        >
          <FaLink className="primary-icon" />
        </a>
      )}
    </div>
  </div>
);

export default ProfileLinks;
