//　Boxのスタイル変更
const box = document.querySelector('.box');
const propInputs = document.querySelectorAll('input[data-prop]');
const bgInputs = document.querySelectorAll('input[data-bg]');
const resetButton = document.querySelector('.layout button');

const initialProp = {};
propInputs.forEach(input => {
  initialProp[input.dataset.prop] = input.value;
});
const initialBg = Array.from(bgInputs).map(input => input.value);

let currentRotate = initialProp.rotate || '0deg';

function updateBackground() {
  const color1 = bgInputs[0].value;
  const color2 = bgInputs[1].value;
  const angle = bgInputs[2].value;  // デフォルト角度

  // 色がないときは何もしない
  if (!color1 && !color2) {
    box.style.backgroundImage = '';
    box.style.backgroundColor = '';
    return;
  }

  // 色が1つだけのときは単色
  if (color1 && !color2) {
    box.style.backgroundImage = '';
    box.style.backgroundColor = color1;
    return;
  }
  if (!color1 && color2) {
    box.style.backgroundImage = '';
    box.style.backgroundColor = color2;
    return;
  }

  // 色が2つ → グラデーション
  box.style.backgroundColor = '';
  box.style.backgroundImage = `linear-gradient(${angle}, ${color1}, ${color2})`;
}


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

bgInputs.forEach(input => input.addEventListener('input', updateBackground));

updateBackground();
if (currentRotate) box.style.transform = `rotate(${currentRotate})`;
propInputs.forEach(input => {
  if (input.dataset.prop !== 'rotate') {
    box.style[input.dataset.prop] = input.value;
  }
});


// リセットボタン
resetButton.addEventListener('click', () => {
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
  bgInputs.forEach((input, i) => input.value = initialBg[i]);
  updateBackground();
});


// ラベルの英語・日本語切り替え
const labelTexts = [
  { english: 'width', japanese: '幅' },
  { english: 'height', japanese: '高さ' },
  { english: 'box-shadow', japanese: '影' },
  { english: 'background-color', japanese: '背景色' },
  { english: 'background-color', japanese: '背景色' },
  { english: 'angle', japanese: '角度' },
  { english: 'border-radius', japanese: '角丸' },
  { english: 'border-color', japanese: '境界線の色' },
  { english: 'border-width', japanese: '境界線の太さ' },
  { english: 'opacity', japanese: '不透明度' },
  { english: 'rotate', japanese: '回転' },
  { english: 'reset', japanese: 'リセット' },
  { english: 'help', japanese: 'ヘルプ' }
];

const labels = document.querySelectorAll('.control label');
let showEnglish = true;

setInterval(() => {
  labels.forEach((label, i) => {
    if (labelTexts[i]) {
      label.style.opacity = 0;
      setTimeout(() => {
        label.textContent = showEnglish ? labelTexts[i].english : labelTexts[i].japanese;
        label.style.opacity = 1;
      }, 250);
    }
  });
  showEnglish = !showEnglish;
}, 3000);