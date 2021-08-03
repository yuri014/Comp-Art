import React from 'react';

import { InputContainer, LabelInputContainer } from './styles';

interface InputProps {
  name: string;
  refInput?: unknown;
  placeholder: string;
  type?: string;
  value?: string | number | string[];
  defaultValue?: string | number | string[];
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
  defaultValue,
  name,
  placeholder,
  refInput,
  required,
  value,
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
      value={value}
      defaultValue={defaultValue}
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
  defaultValue: '',
};

export default Input;
