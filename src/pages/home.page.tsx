import React from 'react';
import styled from 'styled-components';

import { Page } from '../components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

export const Home = () => {
  return (
    <Page>
      <Container>
      </Container>
    </Page>
  );
};
