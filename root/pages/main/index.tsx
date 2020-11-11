import React, { FC, useState } from 'react';
import { Category, FormValues } from '../../../types';
import { useRecoilValue } from 'recoil';
import { currentDisplayData } from '../../../recoil/root';
import useFirebase from '../utils/hooks/useFirebase';

//components
import { Header, Footer, AddButton } from '../../components';
import { BlogDetail, PageTop, CategoryDetail } from '../main/components';

const Main: FC = () => {
  const [open, setOpen] = useState(false);
  const currentDisplay = useRecoilValue(currentDisplayData);
  const [blog] = useFirebase<FormValues>('blog');
  const [categoryList] = useFirebase<Category>('categoryList');

  const data = [{ name: 'category', id: 'dfghj' }];

  const displayData = (current: string) => {
    if (!blog) return;
    if (current === 'list') {
      return blog;
    } else if (current === 'category') {
      return data;
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Header />
      <main>
        <PageTop title="blogFavo" />
        {currentDisplay === 'list' ? (
          <BlogDetail data={blog} />
        ) : (
          <CategoryDetail data={categoryList} number={categoryList.length} />
        )}
      </main>
      <Footer />
      <AddButton
        onClickOpen={handleOpen}
        open={open}
        onClickClose={handleClose}
        title="ブログ追加"
      />
    </>
  );
};

export default Main;
