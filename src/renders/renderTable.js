export default (state) => {
  const { game: { data: table }, settings: { rows, columns } } = state;
  const data = Array.from(table).map(([id]) => `
        <button class="item hidden" data-value="${id}"></button>
    `);

  return `
    <div class="table border-medium-invert" style="grid-template-rows: repeat(${rows}, 35px); grid-template-columns: repeat(${columns}, 35px)">
        ${data.join('')}
    </div>
  `;
};
