import { useState, useEffect } from 'react';
import firebase, { db } from '../firebase';

export const useFirebaseWhere = <T>(
  collection: string,
  filedData: string,
  where: string | firebase.User
) => {
  const [state, setState] = useState<T[]>([]);
  useEffect(() => {
    db.collection(collection)
      .where(filedData, '==', where)
      .onSnapshot((snap) => {
        const data = snap.docs.map((doc) => {
          return {
            ...(doc.data() as T),
            id: doc.id,
          };
        });
        setState(data);
      });
  }, []);
  return state;
};
