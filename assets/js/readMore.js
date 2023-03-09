const readMoreBtn = document.getElementById('read-more-btn');
const readMoreEls = document.querySelectorAll('.read-more');

readMoreBtn.addEventListener('click', () => {
  readMoreEls.forEach(el => el.classList.toggle('read-more'));
  readMoreBtn.textContent = readMoreBtn.textContent === 'Read more' ? 'Read less' : 'Read more';
});
