import renderMenu from './renderMenu';
import renderTable from './renderTable';

export default (state) => {
  const tableWrapper = document.querySelector('.table-wrapper');
  const menuWrapper = document.querySelector('.menu-wrapper');

  menuWrapper.innerHTML = renderMenu(state);

  tableWrapper.innerHTML = renderTable(state);
};
