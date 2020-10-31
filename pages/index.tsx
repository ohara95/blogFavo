import styled from 'styled-components';
import { Button, Input } from '@material-ui/core';

export default function Home() {
  return (
    <Container>
      <Title>My page</Title>
      <Input />
      <Button>Click!</Button>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;
