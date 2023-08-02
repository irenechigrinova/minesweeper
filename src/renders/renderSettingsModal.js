import { MODES } from '../utils/constants';

export const renderSettingsModal = () => {
  const div = document.createElement('div');
  div.className = 'modal border settings';
  document.body.appendChild(div);
  div.innerHTML = `
    <h1>Settings</h1>
    <p>Please, set up game settings</p>
    <div class="field">
        <label for="mode">Select mode</label>
        <select name="mode">
            ${Object.keys(MODES).map((key) => (
    `        <option id="${MODES[key].value}" value="${MODES[key].value}">${MODES[key].name}</option>`
  ))}
        </select>
        <div class="values">
            <div class="block">
                <label for="rows">Rows</label>
                <input type="number" name="rows" value="${MODES.beginner.rows}" disabled>
            </div>
            <div class="block">
                <label for="columns">Columns</label>
                <input type="number" name="columns" value="${MODES.beginner.columns}" disabled>
            </div>
            <div class="block">
                <label for="mines">Mines</label>
                <input type="number" name="mines" value="${MODES.beginner.mines}" max="100" disabled>
            </div>
        </div>
        <button type="button">Start</button>
    </div>
    `;
};

export const renderValues = (settings) => {
  const rows = document.querySelector('input[name="rows"]');
  const columns = document.querySelector('input[name="columns"]');
  const mines = document.querySelector('input[name="mines"]');

  rows.value = settings.rows;
  columns.value = settings.columns;
  mines.value = settings.mines;

  if (settings.mode === MODES.custom.value) {
    rows.removeAttribute('disabled');
    columns.removeAttribute('disabled');
    mines.removeAttribute('disabled');
  } else {
    rows.setAttribute('disabled', 'true');
    columns.setAttribute('disabled', 'true');
    mines.setAttribute('disabled', 'true');
  }
};

export const renderValue = (name, value) => {
  const element = document.querySelector(`input[name="${name}"]`);

  element.value = value;
};
