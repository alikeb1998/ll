import React, { ChangeEventHandler, FC, RefObject } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  display: none;
`;

interface Props {
  fileInputRef?: RefObject<HTMLInputElement & { files: File[] }>;
  onFileChange: (file: File) => void;
  accept?: string;
}

export const FileInput: FC<Props> = ({ fileInputRef, onFileChange, ...props }) => {
  const onChange = (): ChangeEventHandler<HTMLInputElement & { files: File[] }> => ({ target: { files } }) => {
    if (files && files[0])
      onFileChange(files[0]);
  };

  return (
    <Input type="file" ref={fileInputRef} onChange={onChange()} {...props} />
  );
};
