import React from 'react';
import PageDetail from '../components/PageDetail';

const MyPage = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <PageDetail data={data} title="title" memo="memo" number={1} isCategory />
  );
};

export default MyPage;
