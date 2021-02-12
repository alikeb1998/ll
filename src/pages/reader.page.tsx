import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactHtmlParser, { Transform } from 'react-html-parser';
import styled from 'styled-components';
import { BackHome, ChapterController, Page, SelectStyle } from '../components';
import { RootState } from '../store';
import { Color } from '../store/settings/types';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SelectStyleContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const BackHomeContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow: auto;
  padding: 20px;
`;

interface ContentProps {
  color: Color;
}

const Content = styled.div<ContentProps>`
  width: 800px;
  margin: auto;
  color: ${({ color }) => color};

  @media only screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const Reader = () => {
  const history = useHistory();

  const { book: { data, currentChapter }, settings: { theme: { foreground } } } = useSelector((state: RootState) => state);

  const [isLoading, setLoading] = useState(false);
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (!data)
      history.push('/');
  }, [data, history]);

  useEffect(() => {
    setLoading(true);
    if (data) {
      const currentChapterId = data.content.chapters[currentChapter].idref;

      const chapter = data.content.items.find(({ id }) => id === currentChapterId);

      if (!chapter)
        return;

      data.result.file(chapter.href)?.async('string')?.then(data => {
        setHtml(data);
        setLoading(false);
      });
    }
  }, [currentChapter, data]);

  const transformImage: Transform = (node) => {
    if (node.name === 'img') return <></>;
  };

  return (
    <Page>
      <BackHomeContainer>
        <BackHome />
      </BackHomeContainer>
      <SelectStyleContainer>
        <SelectStyle />
      </SelectStyleContainer>
      <Container>
        <ContentContainer>
          {
            isLoading ?
              <></> :
              <Content color={foreground}>
                {ReactHtmlParser(html, {
                  transform: transformImage
                })}
              </Content>
          }
        </ContentContainer>
        <ChapterController />
      </Container>
    </Page>
  );
};
