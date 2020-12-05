import { useState, useEffect } from 'react';
import { db } from '../firebase';

export const useOrderby = <T>(
  path: string,
  item: string,
  order: 'desc' | 'asc'
) => {
  const [state, setState] = useState<T[]>([]);
  useEffect(() => {
    db.collection(path)
      .orderBy(item, order)
      .onSnapshot((res) => {
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
