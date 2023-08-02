export default () => {
  const div = document.createElement('div');
  div.className = 'modal border alert';
  document.body.appendChild(div);
  div.innerHTML = '<h1>Sorry</h1><p>Your browser doesn\'t support this game</p><div class="fail"></div>';
};
