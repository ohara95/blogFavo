import { useState, useEffect } from 'react';
import { Category, CurrentDisplay, FormValues } from '../../../../../types';

export const usePagination = (
  currentDisplay: CurrentDisplay,
  activePage: 'my' | 'user',
  myCategory: Category[],
  categoryList: Category[],
  switchMyPageDisplay: (currentPage: CurrentDisplay) => FormValues[],
  switchUserPageDisplay: (currentPage: CurrentDisplay) => FormValues[]
) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [currentDisplay, activePage]);

  const paginate = (data?: any[]) => {
    const arr = [];
    const NUM = 12;
    if (!data) return [];
    for (let i = 0; i < Math.ceil(data.length / NUM); i++) {
      arr.push(data.slice(i * NUM, i * NUM + NUM));
    }
    return arr[page - 1];
  };

  const pageCount = () => {
    const NUM = 12;
    switch (currentDisplay) {
      case 'category':
        return Math.ceil(
          (activePage === 'my' ? myCategory : categoryList).length / NUM
        );
      default:
        return Math.ceil(
          activePage === 'my'
            ? switchMyPageDisplay(currentDisplay)!.length / NUM
            : switchUserPageDisplay(currentDisplay).length / NUM
        );
    }
  };
  return { page, setPage, paginate, pageCount };
};
