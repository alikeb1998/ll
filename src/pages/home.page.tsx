import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Button, FileInput, Page } from '../components';
import { handleEpubThunk } from '../thunks';
import { Color } from '../store/settings/types';
import { RootState } from '../store';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

export const Home = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { data } = useSelector(({ book }: RootState) => book);

  const fileInputRef = useRef<HTMLInputElement & { files: File[] }>(null);

  const onOpenFileClick = () => () => fileInputRef.current?.click();
  const onFileChange = (file: File) => {
    dispatch(handleEpubThunk(file));
  };

  useEffect(() => {
    if (data)
      history.push('/reader');
  }, [data, history]);

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
