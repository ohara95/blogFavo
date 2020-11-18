import React, { FC } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

//material
import { Container, Button, Paper, Grid, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

type Props = {
  handleSubmit: any;
  title: string;
};

export const EditBase: FC<Props> = ({ handleSubmit, children, title }) => {
  const router = useRouter();
  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <main>
        <StyledPaper>
          <Typography variant="h6">{title}</Typography>
          <form onSubmit={handleSubmit}>
            {children}
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Button
                onClick={() => {
                  router.back();
                }}
              >
                キャンセル
              </Button>
              <Button type="submit">送信</Button>
            </Grid>
          </form>
        </StyledPaper>
      </main>
    </Container>
  );
};

export default EditBase;

const StyledPaper = styled(Paper)`
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px;
`;
