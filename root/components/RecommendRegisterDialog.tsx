import { Button } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import { RECOMMEND_REGISTER } from '../../recoil/dialog';
import { DialogBase } from './DialogBase';

export const RecommendRegisterDialog = () => {
  return (
    <DialogBase title="" noActions dialogKey={RECOMMEND_REGISTER}>
      <h1>ユーザー登録をして、blogFavoをもっと便利に使ってみませんか？</h1>
      <p>ログインするとこんな機能が使えます</p>
      <div style={{ display: 'flex' }}>
        <ol>
          <li>ブログを書いて、それを共有できます</li>
          <li>お気に入りの記事を保存できます</li>
        </ol>
        <img
          src="https://wired.jp/app/uploads/2018/01/GettyImages-522585140.jpg"
          alt="マスコットキャラクターの写真"
          width="300px"
          height="200px"
        />
      </div>
      <div>
        <Button>
          <Link href="/signup">登録する</Link>
        </Button>
        <Button>
          <Link href="/signin">ログインする</Link>
        </Button>
      </div>
    </DialogBase>
  );
};
