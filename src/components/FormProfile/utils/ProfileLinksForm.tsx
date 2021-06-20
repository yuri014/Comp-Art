import React from 'react';
import { SiWattpad } from 'react-icons/si';
import {
  FaSoundcloud,
  FaBandcamp,
  FaPinterest,
  FaTwitter,
  FaFacebook,
  FaDeviantart,
  FaLink,
} from 'react-icons/fa';

import SocialInput from '@components/Splitter/SocialInput';

interface ProfileLinksFormProps {
  register: unknown;
}

const ProfileLinksForm: React.FC<ProfileLinksFormProps> = ({ register }) => (
  <div className="profile-links">
    <SocialInput label="Soundcloud" name="links.soundcloud" register={register}>
      <FaSoundcloud className="soundcloud-icon" />
      <p>soundcloud.com/</p>
    </SocialInput>
    <SocialInput
      label="Bandcamp"
      name="links.bandcamp"
      register={register}
      endAdornment=".bandcamp.com"
    >
      <FaBandcamp className="bandcamp-icon" />
    </SocialInput>
    <SocialInput label="Wattpad" name="links.wattpad" register={register}>
      <SiWattpad className="wattpad-icon" />
      <p>wattpad.com/user/</p>
    </SocialInput>
    <SocialInput name="links.pinterest" label="Pinterest" register={register}>
      <FaPinterest className="pinterest-icon" />
      <p>pinterest.com/</p>
    </SocialInput>
    <SocialInput name="links.twitter" label="Twitter" register={register}>
      <FaTwitter className="twitter-icon" />
      <p>twitter.com/</p>
    </SocialInput>
    <SocialInput name="links.facebook" label="Facebook" register={register}>
      <FaFacebook className="facebook-icon" />
      <p>facebook.com/</p>
    </SocialInput>
    <SocialInput name="links.deviantart" label="Deviantart" register={register}>
      <FaDeviantart className="deviantart-icon" />
      <p>deviantart.com/</p>
    </SocialInput>
    <SocialInput
      name="links.customLink"
      label="Link Adicional"
      register={register}
    >
      <FaLink className="primary-icon" />
    </SocialInput>
  </div>
);

export default ProfileLinksForm;
