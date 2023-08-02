const setRandomNum = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);

const setMine = (rows, columns) => {
  const randomRows = setRandomNum(0, rows - 1);
  const randomCols = setRandomNum(0, columns - 1);
  return `${randomRows}-${randomCols}`;
};

export const generateIndexes = (idx) => {
  const [row, column] = idx.split('-');
  return [
    `${+row - 1}-${+column - 1}`,
    `${+row - 1}-${column}`,
    `${+row - 1}-${+column + 1}`,
    `${row}-${+column - 1}`,
    `${row}-${+column + 1}`,
    `${+row + 1}-${+column - 1}`,
    `${+row + 1}-${column}`,
    `${+row + 1}-${+column + 1}`,
  ];
};

const getMinesAround = (table, idx) => {
  const indexes = generateIndexes(idx);
  let counter = 0;
  indexes.forEach((index) => {
    const item = table.get(index);
    if (item && item.isMine) counter += 1;
  });
  return counter;
};

export default (settings) => {
  const { rows, columns, mines } = settings;
  const table = new Map();
  for (let i = 0; i < rows; i += 1) {
    for (let j = 0; j < columns; j += 1) {
      table.set(`${i}-${j}`, {
        isEmpty: true, isHidden: true, isMine: false, value: 0, isFailed: false, isQuestion: false, isMark: false,
      });
    }
  }

  let counter = mines;
  while (counter) {
    const mineIdx = setMine(rows, columns);
    const item = table.get(mineIdx);
    if (!item.isMine) {
      table.set(mineIdx, { ...item, isMine: true, isEmpty: false });
      counter -= 1;
    }
  }
  table.forEach((value, key) => {
    const item = table.get(key);
    if (!item.isMine) {
      const minesCount = getMinesAround(table, key);
      table.set(key, { ...item, value: minesCount, isEmpty: minesCount === 0 });
    }
  });
  return table;
};
