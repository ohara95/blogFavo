import { CurrentDisplay, FormValues, Category } from '../../../../types';

export const displayPage = (
  searchValue: string,
  onlyMyBlog: FormValues[],
  selectCategory: string,
  blog: FormValues[]
) => {
  const switchMyPageDisplay = (currentPage: CurrentDisplay) => {
    switch (currentPage) {
      case 'yet':
        const yetBlog = onlyMyBlog.filter((item) => !item.isDone);
        return searchBlogResult(yetBlog);
      case 'done':
        const doneBlog = onlyMyBlog.filter((item) => item.isDone);
        return searchBlogResult(doneBlog);
      case 'myCategoryBlog':
        const categoryBlog = onlyMyBlog.filter(
          (item) => item.myCategory === selectCategory
        );
        return searchBlogResult(categoryBlog);
      default:
        return searchBlogResult(onlyMyBlog);
    }
  };

  const switchUserPageDisplay = (currentPage: CurrentDisplay) => {
    switch (currentPage) {
      case 'userCategoryBlog':
        const displayCategoryBlog = blog?.filter(
          (item) =>
            !item?.isPrivate &&
            !item.otherUserBlogId &&
            item.category === selectCategory
        );
        return searchBlogResult(displayCategoryBlog);
      default:
        const displayBlog = blog?.filter(
          (item) => !item?.isPrivate && !item.otherUserBlogId
        );
        return searchBlogResult(displayBlog);
    }
  };
  //* カテゴリーの検索フィルター **/
  const searchCategoryResult = (searchItem: Category[]) => {
    return searchItem.filter((item) => item.name.includes(searchValue));
  };
  //** ブログの検索フィルター*/
  const searchBlogResult = (searchItem: FormValues[]) => {
    return searchItem.filter(
      (item) =>
        item.title.includes(searchValue) ||
        item.memo.includes(searchValue) ||
        item.tag.includes(searchValue)
    );
  };

  return {
    switchMyPageDisplay,
    switchUserPageDisplay,
    searchCategoryResult,
  };
};
