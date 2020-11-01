import React, { FC } from 'react';
import Header from '../organisms/Header';
import PageTop from '../template/PageTop';
import Footer from '../organisms/Footer';
import AddButton from '../atoms/AddButton';

const Main: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <PageTop title="blogFavo" />
        {children}
      </main>
      <Footer />
      <AddButton />
    </>
  );
};

export default Main;
