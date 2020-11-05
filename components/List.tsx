import React from 'react';
import PageDetail from './template/PageDetail';

const MyPage = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return <PageDetail data={data} title="title" memo="memo" tag="tag" />;
};

export default MyPage;
