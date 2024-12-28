const parseNamber = (number, defaultValue) => {
  if (typeof number !== 'string') return defaultValue;

  const parseNumber = parseInt(number);
  if (Number.isNaN(parseNamber)) return defaultValue;
  return parseNamber;
};

export const parsePaginationParams = ({ page, perPage }) => {
  const parsedPage = parseNamber(page, 1);
  const parsedPerPage = parseNamber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
