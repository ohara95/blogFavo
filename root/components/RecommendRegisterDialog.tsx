import React from 'react';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import { RECOMMEND_REGISTER } from '../../recoil/dialog';
import { DialogBase } from './DialogBase';

export const RecommendRegisterDialog = () => {
  return (
    <DialogBase title="" dialogKey={RECOMMEND_REGISTER}>
      <h1>ユーザー登録をして、blogFavoをもっと便利に使ってみませんか？</h1>
      <p>ログインするとこんな機能が使えます</p>
      <div css="display: flex">
        <ol>
          <li>お気に入りの記事を保存できます</li>
          <li>他のユーザーのお気に入り記事を保存できます</li>
          <li>お気に入りの記事を整理できます</li>
        </ol>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/blogfavo.appspot.com/o/Bibliophile-pana.png?alt=media&token=afd3a2d9-ad4a-4dcc-94dc-289fd998e114"
          // src="https://wired.jp/app/uploads/2018/01/GettyImages-522585140.jpg"
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
