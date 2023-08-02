import { generateIndexes } from '../utils/generateInitialTable';
import { STATUSES } from '../utils/constants';

let interval;

const getNeighbours = (key, used) => {
  const ids = generateIndexes(key);
  const result = [];
  ids.forEach((id) => {
    if (!used.has(id)) {
      result.push(id);
      used.add(id);
    }
  });
  return result;
};

const getEmptyArea = (start, data) => {
  const queue = [start];
  const items = [];
  const used = new Set();
  while (queue.length) {
    const current = queue.shift();
    const item = data.get(current);
    if (item) {
      if (item.isEmpty) {
        items.push(current);
        queue.push(...getNeighbours(current, used));
      }
      if (item.value) {
        items.push(current);
      }
    }
  }
  return items;
};

const handleItemClick = (e, state) => {
  if (e.target && e.target.dataset.value) {
    const { value } = e.target.dataset;
    const item = state.game.data.get(value) || {};
    if (item.isMark) return;

    if (item.isMine) {
      state.game.data.set(value, { ...item, isFailed: true });
      state.game.status = STATUSES.failed;
      clearInterval(interval);
      interval = undefined;
    }
    if (item.value) {
      state.game.data.set(value, { ...item, isHidden: false });
      state.game.shownCount += 1;
    }
    if (item.isEmpty) {
      const area = getEmptyArea(value, state.game.data);
      area.forEach((key) => {
        const current = state.game.data.get(key);
        if (current.isHidden) state.game.shownCount += 1;
        state.game.data.set(key, { ...current, isHidden: false });
      });
    }
    const size = state.settings.rows * state.settings.columns;
    if (state.game.shownCount === size && state.game.status === STATUSES.playing) {
      state.game.status = STATUSES.success;
      clearInterval(interval);
      interval = undefined;
    }
  }
};

const handleRightClick = (e, state) => {
  if (e.target && e.target.dataset.value) {
    const { value } = e.target.dataset;
    const item = state.game.data.get(value) || {};
    if (!item.isMark && !item.isQuestion && state.game.minesLeft > 0) {
      state.game.data.set(value, { ...item, isHidden: false, isMark: true });
      state.game.minesLeft -= 1;
      state.game.shownCount += 1;
    } else if (item.isMark) {
      state.game.data.set(value, {
        ...item, isHidden: false, isMark: false, isQuestion: true,
      });
      state.game.minesLeft += 1;
      state.game.shownCount += 1;
    } else if (item.isQuestion) {
      state.game.data.set(value, {
        ...item, isHidden: true, isMark: false, isQuestion: false,
      });
      state.game.shownCount -= 1;
    }
  }
};

export default (e, state) => {
  if (!e) {
    clearInterval(interval);
    interval = undefined;
    return;
  }

  if (state.game.status !== STATUSES.failed) {
    state.ui = {
      ...state.ui,
      isMouseDown: false,
    };
    if (state.game.status === STATUSES.pending) {
      state.game.status = STATUSES.playing;
    }
    if (!state.game.timer && typeof interval === 'undefined') {
      interval = setInterval(() => {
        if (state.game.timer === 999) {
          clearInterval(interval);
          interval = undefined;
          state.game.status = STATUSES.failed;
        } else {
          state.game.timer += 1;
        }
      }, 1000);
    }
    if (e.button === 0) {
      handleItemClick(e, state);
    } else {
      e.preventDefault();
      handleRightClick(e, state);
    }
  } else if (state.game.status !== STATUSES.playing) {
    clearInterval(interval);
    interval = undefined;
  }
};
