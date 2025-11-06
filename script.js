const box = document.querySelector('.box');
const inputs = document.querySelectorAll('.controls input');

inputs.forEach(input => {
  const prop = input.dataset.prop;
  box.style[prop] = input.value;

  input.addEventListener('input', () => {
    box.style[prop] = input.value;
  });
});