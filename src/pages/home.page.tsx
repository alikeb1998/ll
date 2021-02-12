import React, { useRef } from 'react';
import styled from 'styled-components';

import { Button, FileInput, Page } from '../components';
import { Color } from '../store/settings/types';
import { epubParser } from '../utils/parser/epub.parser';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

export const Home = () => {
  const fileInputRef = useRef<HTMLInputElement & { files: File[] }>(null);

  const onOpenFileClick = () => () => fileInputRef.current?.click();
  const onFileChange = (file: File) => {
    epubParser(file);
  };

  return (
    <>
      <FileInput onFileChange={onFileChange} fileInputRef={fileInputRef} accept="application/epub+zip" />
      <Page>
        <Container>
          <Button color={Color.WHITE} onClick={onOpenFileClick()}>Open File</Button>
        </Container>
      </Page>
    </>
  );
};
