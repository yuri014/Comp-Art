import React from 'react';

import { InputContainer, LabelInputContainer } from './styles';

interface InputProps {
  name: string;
  refInput?: unknown;
  placeholder: string;
  type?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  children,
  error,
  helperText,
  name,
  placeholder,
  refInput,
  required,
  type,
  onChange,
  onKeyDown,
}) => (
  <LabelInputContainer htmlFor={name} className={error ? 'error' : ''}>
    <p>{children}</p>
    <InputContainer
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      ref={refInput as React.Ref<HTMLInputElement>}
      required={required}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
    <span>{error || helperText}</span>
  </LabelInputContainer>
);

Input.defaultProps = {
  required: false,
  type: 'text',
};

export default Input;
