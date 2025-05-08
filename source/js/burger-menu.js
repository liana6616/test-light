const btn = document.querySelector('.header__button-burger');
const list = document.querySelector('.header__nav');

btn.addEventListener('click', () => {
  list.style.display === 'flex' ? list.style.display = 'none' : list.style.display = 'flex';
  btn.classList.toggle('active');
});
