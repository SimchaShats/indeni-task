const buildURL = ({ page, subPage }) => {
  let url = `#/${ page }`;
  if (subPage) {
    return url += `/${ subPage }`;
  }
  return url;
};

export const goToPage = ({ page, subPage }) => {
  window.location.assign(buildURL({ page, subPage }));
};