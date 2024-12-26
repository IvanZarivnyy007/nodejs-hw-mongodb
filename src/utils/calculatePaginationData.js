export const calculatePaginationData = ({ totalItems, page, perPage }) => {
  const totalPages = Math.ceil(totalItems / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviosPage = page != 1;

  return {
    totalPages,
    hasNextPage,
    hasPreviosPage,
  };
};
