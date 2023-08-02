import { STATUSES } from '../utils/constants';

export const renderUI = (value, status) => {
  if (status === STATUSES.playing || status === STATUSES.pending) {
    const { isMouseDown } = value;

    const menuBtn = document.querySelector('.menu button');
    if (isMouseDown) menuBtn.classList.add('down');
    else menuBtn.classList.remove('down');
  }
};

export const renderFail = (state) => {
  state.game.data.forEach((value, key) => {
    const item = document.querySelector(`.item[data-value="${key}"]`);
    if (value.isMine) {
      if (value.isFailed) item.className = 'item mine-boom';
      else item.className = 'item mine';
    }
    if (!value.isMine && value.isMark) {
      item.className = 'item mine-fail';
    }
  });
};

export const renderStatus = (status, state) => {
  const menuBtn = document.querySelector('.menu button');

  switch (status) {
    case STATUSES.failed: {
      menuBtn.classList.add('fail');
      renderFail(state);
      break;
    }
    case STATUSES.success:
      menuBtn.classList.add('success');
      break;
    default:
      menuBtn.className = '';
      break;
  }
};
