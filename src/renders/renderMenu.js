const setValue = (num) => {
  if (num < 10) return `00${num}`;
  if (num < 100) return `0${num}`;
  return `${num}`;
};

export const renderMines = (mines) => {
  const [minesH, minesD, minesU] = setValue(mines).split('');
  return `
    <div class="num-${minesH}"></div>
    <div class="num-${minesD}"></div>
    <div class="num-${minesU}"></div>
  `;
};

export const renderTimer = (timer) => {
  const [timerH, timerD, timerU] = setValue(timer).split('');
  return `
    <div class="num-${timerH}"></div>
    <div class="num-${timerD}"></div>
    <div class="num-${timerU}"></div>
  `;
};

export default (state) => {
  const { settings: { mines }, game: { timer } } = state;

  return `
        <div class="menu border-medium-invert">
            <div class="mines number">
             ${renderMines(mines)}   
            </div>
            <button type="button"></button>
            <div class="timer number">
              ${renderTimer(timer)}
            </div>
        </div>
    `;
};
