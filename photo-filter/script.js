const filters = document.querySelector('.filters');
const img = document.querySelector('img');
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', 
                '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
const buttonNext = document.querySelector('.btn-next');
const buttonReset = document.querySelector('.btn-reset');
const fileInput = document.querySelector('input[type="file"]');

// change output value and add filter
filters.addEventListener('input', (event) => {
  if (event.target.matches('input[type="range"]')) {
    let result = event.target.nextElementSibling;
    let newValue = event.target.value;
    result.value = newValue;
    let suffix = event.target.dataset.sizing || '';
    img.style.setProperty(`--${event.target.name}`, newValue + suffix);
  }
});

function getDayTime() {
  const date = new Date();
  let dayTime;
  if (date.getHours() >= 6 && date.getHours() < 12) {
    dayTime = 'morning';
  } else if (date.getHours() >= 12 && date.getHours() < 18) {
    dayTime = 'day';
  } else if (date.getHours() >= 18 && date.getHours() <= 23) {
    dayTime = 'evening';
  } else {
    dayTime = 'night';
  }
  return dayTime;
}

function loadImage(src) {
  var image = new Image();
  image.src = src;
  image.onload = function () {
   img.src = src;
}
}

function getImage() {
  const index = i % images.length;
  const imgSrc = base + getDayTime() + '/' + images[index];
  loadImage(imgSrc);
  i++;
}

// change picture when 'next picture' is clicked
buttonNext.addEventListener('click', getImage);

// reset filters
buttonReset.addEventListener('click', function() {
  for (let i = 0; i < filters.children.length; i++) {
    let currentInput = filters.children[i].children[0];
    let result = currentInput.nextElementSibling;
    if (currentInput.matches('input[name="saturate"]')) {
      result.value = 100;
      currentInput.value = 100;
      let suffix = currentInput.dataset.sizing || '';
      img.style.setProperty(`--${currentInput.name}`, 100 + suffix);
    } else {
      result.value = 0;
      currentInput.value = 0;
      let suffix = currentInput.dataset.sizing || '';
      img.style.setProperty(`--${currentInput.name}`, 0 + suffix);
    }
  }
});

// load picture from user's device 
fileInput.addEventListener('change', function() {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function() {
    img.src = reader.result;
  }
  reader.readAsDataURL(file);
})