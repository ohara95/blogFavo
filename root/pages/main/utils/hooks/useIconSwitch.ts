import { useSetRecoilState } from 'recoil';
import { toastState } from '../../../../../recoil/root';
import firebase, { auth, db } from '../../../../utils/firebase';
import { FormValues } from '../../../../../types';

export const useIconSwitch = (blog: FormValues[]) => {
  const user = auth.currentUser;
  const setToast = useSetRecoilState(toastState);

  const iconSwitch = async (
    id: string,
    type: 'favUsers' | 'laterReadUsers'
  ) => {
    const typeRef = db.collection(`blog/${id}/${type}`);
    const res = await typeRef.get();
    const userIdArr = res.docs.map((doc) => doc.id);
    const favUserIncrement = (num: number) => {
      db.doc(`blog/${id}`).update({
        favCount: firebase.firestore.FieldValue.increment(num),
      });
    };
    const isExistUser = userIdArr.find((id) => id === user?.uid);

    if (isExistUser) {
      return offSwitch(typeRef, favUserIncrement, type, id);
    } else {
      if (blog.find((item) => item.id === id)?.postedUser === user?.uid) {
        return setToast(['myPageに登録済です', 'warning']);
      }
      return onSwitch(typeRef, favUserIncrement, type, id);
    }
  };

  const offSwitch = (
    typeRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
    decrement: (num: number) => void,
    type: 'favUsers' | 'laterReadUsers',
    id: string
  ) => {
    typeRef.doc(user?.uid).delete();
    if (type === 'favUsers') decrement(-1);
    if (type === 'laterReadUsers') {
      const findId = blog.find((data) => data.otherUserBlogId === id)?.id;
      db.doc(`blog/${findId}`).delete();
    }
  };

  const onSwitch = (
    typeRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>,
    increment: (num: number) => void,
    type: 'favUsers' | 'laterReadUsers',
    id: string
  ) => {
    typeRef.doc(user?.uid).set({
      userRef: db.collection('users').doc(user?.uid),
    });
    if (type === 'favUsers') increment(1);
    if (type === 'laterReadUsers') {
      const findBlog = blog.find((blogId) => blogId.id === id);
      db.collection('blog').add({
        title: findBlog?.title,
        url: findBlog?.url,
        memo: '',
        category: findBlog?.category,
        tag: [],
        isPrivate: false,
        postedUser: user?.uid,
        postedAt: firebase.firestore.Timestamp.now(),
        otherUserBlogId: id,
        priority: 2,
        favCount: 0,
      });
    }
  };

  return iconSwitch;
};
