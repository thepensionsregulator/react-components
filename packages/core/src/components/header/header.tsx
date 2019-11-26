import React from 'react';
import styled from 'styled-components';

const Toolbar = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  padding: 0 10px;
  width: 100%;
  height: 50px;
  background: grey;
`;

export const Header: React.FC = () => {
  return <Toolbar>header</Toolbar>;
};
