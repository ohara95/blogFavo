import { useState, useEffect } from 'react';
import { db } from '../firebase';

export const useCollection = <T>(path: string) => {
  const [state, setState] = useState<T[]>([]);
  useEffect(() => {
    db.collection(path).onSnapshot((res) => {
      const data = res.docs.map((doc) => {
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
