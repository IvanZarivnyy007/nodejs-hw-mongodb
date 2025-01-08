const parseNamber = (number, defaultValue) => {
  if (typeof number !== 'string') return defaultValue;

  const parseNumber = parseInt(number);
  if (Number.isNaN(parseNumber)) return defaultValue;
  return parseNumber;
};

export const parsePaginationParams = ({ page, perPage }) => {
  const parsedPage = parseNamber(page, 1);
  const parsedPerPage = parseNamber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
