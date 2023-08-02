import { MODES } from '../utils/constants';

export const handleModeChange = (e, watchedAppState) => {
  const mode = e.target.value;
  watchedAppState.settings = {
    ...watchedAppState.settings,
    mode,
    rows: MODES[mode].rows,
    columns: MODES[mode].columns,
    mines: MODES[mode].mines,
  };
};

export const handleInputChange = (e, watchedAppState) => {
  const name = e.target.getAttribute('name');
  watchedAppState.settings[name] = +e.target.value;
};
