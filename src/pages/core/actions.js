export const coreNavToPage = ({ page, data }) => ({
  type: 'CORE_NAV_TO_PAGE',
  page,
  data,
});

export const coreUIModalOpen = ({ data, name }) => ({
  type: 'CORE_UI_MODAL_OPEN',
  data,
  name,
});

export const coreUIModalClose = ({ name }) => ({
  type: 'CORE_UI_MODAL_CLOSE',
  name,
});
