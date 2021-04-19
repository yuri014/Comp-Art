import React from 'react';
import { LabelInputContainer } from '../Input/styles';

interface SocialInputProps {
  label: string;
  name: string;
  register: unknown;
  endAdornment?: string;
}

const SocialInput: React.FC<SocialInputProps> = ({
  label,
  name,
  register,
  endAdornment,
  children,
}) => (
  <div className="social-input">
    <LabelInputContainer htmlFor={name}>
      <p>{label}</p>
      <div className="input-container">
        <div className="link-label">{children}</div>
        <input
          type="text"
          name={name}
          id={name}
          ref={register as React.Ref<HTMLInputElement>}
        />
        <div className="link-label">
          <p>{endAdornment}</p>
        </div>
      </div>
    </LabelInputContainer>
  </div>
);

export default SocialInput;
