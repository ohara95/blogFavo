import { useState, useEffect } from 'react';
import { db } from '../firebase';

export const useFirebase = <T>(collection: string) => {
  const [state, setState] = useState<T[]>([]);
  useEffect(() => {
    db.collection(collection).onSnapshot((snap) => {
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
