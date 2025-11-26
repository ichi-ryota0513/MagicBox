const box = document.querySelector('.box');
const propInputs = document.querySelectorAll('input[data-prop]');
const bgInputs = document.querySelectorAll('input[data-bg]');
const resetButton = document.querySelector('.layout button');

// 初期値を保存
const initialProp = {};
propInputs.forEach(input => {
  initialProp[input.dataset.prop] = input.value;
});
const initialBg = Array.from(bgInputs).map(input => input.value);

// transform用 rotate 初期値
let currentRotate = initialProp.rotate || '0deg';

// 背景を更新する関数
function updateBackground() {
  const colors = Array.from(bgInputs)
                      .map(input => input.value)
                      .filter(val => val); // 空欄は無視
  if (colors.length === 0) return;

  if (colors.length === 1) {
    box.style.backgroundImage = '';
    box.style.backgroundColor = colors[0];
  } else {
    box.style.backgroundColor = '';
    box.style.backgroundImage = `linear-gradient(to right, ${colors.join(', ')})`;
  }
}

// プロパティ入力が変わったら反映
propInputs.forEach(input => {
  input.addEventListener('input', () => {
    const prop = input.dataset.prop;
    let value = input.value;

    if (prop === 'rotate') {
      currentRotate = value;
      box.style.transform = `rotate(${currentRotate})`;
    } else {
      box.style[prop] = value;
    }
  });
});

// 背景入力が変わったら反映
bgInputs.forEach(input => input.addEventListener('input', updateBackground));

// 初期値反映
updateBackground();
if (currentRotate) box.style.transform = `rotate(${currentRotate})`;
propInputs.forEach(input => {
  if (input.dataset.prop !== 'rotate') {
    box.style[input.dataset.prop] = input.value;
  }
});

// リセットボタン
resetButton.addEventListener('click', () => {
  // プロパティ
  propInputs.forEach(input => {
    const prop = input.dataset.prop;
    input.value = initialProp[prop];
    if (prop === 'rotate') {
      currentRotate = input.value;
      box.style.transform = `rotate(${currentRotate})`;
    } else {
      box.style[prop] = input.value;
    }
  });

  // 背景
  bgInputs.forEach((input, i) => input.value = initialBg[i]);
  updateBackground();
});
