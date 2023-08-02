import { renderValue, renderValues } from '../renders/renderSettingsModal';
import renderGame from '../renders/renderGame';
import { renderUI, renderStatus } from '../renders/renderUI';
import { renderTimer, renderMines } from '../renders/renderMenu';

const mapWatcher = (key, value, map, parent) => {
  const item = document.querySelector(`.item[data-value="${key}"]`);
  if (!value.isHidden) {
    item.classList.remove('hidden');
    if (value.isMark) {
      item.classList.add('mine-mark');
    } else if (value.isQuestion) {
      item.classList.remove('mine-mark');
      item.classList.add('question');
    } else if (value.value) {
      item.classList.add(`value-${value.value}`);
    } else if (value.isEmpty) {
      item.classList.add('empty');
    }
  } else {
    item.className = 'item hidden';
  }
};

const appWatcher = (obj, tree = [], parent = {}) => {
  const handler = {
    get(target, prop) {
      // eslint-disable-next-line prefer-rest-params
      const value = Reflect.get(...arguments);

      if (value && typeof value === 'object') {
        if (typeof value.size !== 'undefined') {
          const { set, get } = value;

          value.set = (...args) => {
            mapWatcher(...args, value, parent);
            set.apply(value, args);
          };

          value.get = (...args) => get.apply(value, args);
        }
        return appWatcher(value, tree.concat(prop), target);
      }

      return value;
    },
    set(target, prop, value) {
      const path = tree.concat(prop).join('.');
      switch (path) {
        case 'settings':
          renderValues(value);
          break;
        case 'settings.rows':
        case 'settings.columns':
          renderValue(prop, value);
          break;
        case 'ui.isSettingsModalShown':
          document.querySelector('.modal.settings').remove();
          break;
        case 'game':
          renderGame({ ...target, game: value });
          break;
        case 'ui':
          renderUI(value, target.game.status);
          break;
        case 'game.status':
          renderStatus(value, parent);
          break;
        case 'game.timer':
          document.querySelector('.timer').innerHTML = renderTimer(value);
          break;
        case 'game.minesLeft':
          document.querySelector('.mines').innerHTML = renderMines(value);
          break;
        default:
          break;
      }

      // eslint-disable-next-line prefer-rest-params
      return Reflect.set(...arguments);
    },
  };
  return new Proxy(obj, handler);
};

export default appWatcher;
