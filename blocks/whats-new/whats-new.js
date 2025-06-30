export default function decorate(block) {
  const cards = block.querySelectorAll('img');
  cards.forEach(img => {
    const wrapper = document.createElement('div');
    wrapper.className = 'gift-card';
    img.parentElement.replaceChild(wrapper, img);
    wrapper.appendChild(img);
  });

  // Optional: wrap cards in grid container if not already
  const grid = document.createElement('div');
  grid.className = 'gift-grid';
  block.querySelectorAll('.gift-card').forEach(card => grid.appendChild(card));
  block.appendChild(grid);
}
