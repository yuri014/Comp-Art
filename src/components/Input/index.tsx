import React from 'react';

import { InputContainer, LabelInputContainer } from './styles';

interface InputProps {
  name: string;
  refInput: unknown;
  placeholder: string;
  type?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  children,
  name,
  placeholder,
  refInput,
  required,
  type,
}) => (
  <LabelInputContainer htmlFor={name}>
    <p>{children}</p>
    <InputContainer
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      ref={refInput as React.Ref<HTMLInputElement>}
      required={required}
    />
  </LabelInputContainer>
);

Input.defaultProps = {
  required: false,
  type: 'text',
};

export default Input;
