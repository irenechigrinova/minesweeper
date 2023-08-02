import { MODES, STATUSES } from '../utils/constants';

const appState = {
  settings: {
    mode: MODES.beginner.value,
    rows: MODES.beginner.rows,
    columns: MODES.beginner.columns,
    mines: MODES.beginner.mines,
  },
  ui: {
    isMouseDown: false,
    isSettingsModalShown: true,
  },
  game: {
    timer: 0,
    status: STATUSES.pending,
    data: new Map(),
    minesLeft: MODES.beginner.mines,
    shownCount: 0,
  },
};

export default appState;
