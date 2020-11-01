import React, { FC } from 'react';
import Header from './Header';
import PageTop from './PageTop';
import Footer from './Footer';
import AddButton from './AddButton';

const Main: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <PageTop />
        {children}
      </main>
      <Footer />
      <AddButton />
    </>
  );
};

export default Main;
