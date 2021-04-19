const filters = document.querySelector('.filters');
const img = document.querySelector('img');

//change output value and add filter
filters.addEventListener('input', (event) => {
  if (event.target.matches('input[type="range"]')) {
    let result = event.target.nextElementSibling;
    let newValue = event.target.value;
    result.value = newValue;
    let suffix = event.target.dataset.sizing || '';
    img.style.setProperty(`--${event.target.name}`, newValue + suffix);
  }
});