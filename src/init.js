import appWatcher from './watchers/appWatcher';
import appState from './models/appState';

import generateInitialTable from './utils/generateInitialTable';

import { renderSettingsModal } from './renders/renderSettingsModal';

import { handleInputChange, handleModeChange } from './handlers/settingsHandlers';
import handleMouseUp from './handlers/mouseupHandler';
import { MODES, STATUSES } from './utils/constants';

export default () => {
  const watchedAppState = appWatcher(appState);

  renderSettingsModal();

  document.querySelector('.settings select').addEventListener('change', (e) => {
    handleModeChange(e, watchedAppState);
  });
  document.querySelectorAll('.settings input').forEach((input) => {
    input.addEventListener('input', (e) => {
      handleInputChange(e, watchedAppState);
    });
  });
  document.querySelector('.settings button').addEventListener('click', () => {
    watchedAppState.ui.isSettingsModalShown = false;
    watchedAppState.game = {
      ...watchedAppState.game,
      data: generateInitialTable(watchedAppState.settings),
      status: STATUSES.pending,
    };
  });
  document.querySelector('.table-wrapper').addEventListener('mousedown', (e) => {
    if (e.button === 0 && watchedAppState.game.status !== STATUSES.success) {
      watchedAppState.ui = {
        ...watchedAppState.ui,
        isMouseDown: true,
      };
    }
  });
  document.querySelector('.table-wrapper').addEventListener('mouseup', (e) => {
    handleMouseUp(e, watchedAppState);
  });
  document.querySelector('.table-wrapper').addEventListener('contextmenu', (e) => e.preventDefault());

  document.querySelector('.menu-wrapper').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      watchedAppState.game = {
        data: generateInitialTable(watchedAppState.settings),
        timer: 0,
        status: STATUSES.pending,
        minesLeft: MODES[watchedAppState.settings.mode].mines,
        shownCount: 0,
      };
      handleMouseUp(null, watchedAppState);
    }
  });
};
