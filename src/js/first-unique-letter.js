const formEl = document.querySelector('.text-form');
const resultEl = document.querySelector('.result-wrap');
const resetEl = document.querySelector('.btn-reset');

formEl.addEventListener('submit', onFormSubmit);
resetEl.addEventListener('click', onResetForm);

function onFormSubmit(e) {
  e.preventDefault();

  const formData = e.target.text.value;

  const uniqueLetter = createWords(formData);

  if (formData.trim().length === 0 || uniqueLetter === undefined) {
    alert('Enter any text in area!');
    return;
  }

  const result = `<p class='result'> Your first unique letter in text: <span class='result-inner'>"${uniqueLetter}"</span></p>`;
  resultEl.innerHTML = '';

  return resultEl.insertAdjacentHTML('beforeend', result);
}

function onResetForm() {
  resultEl.innerHTML = '';
  formEl.reset();
}

const createWords = text => {
  const uniqueLetters = [];
  text.split(/[ -/\n/\t.,"<>^0-9/\s+/]/).map(el => {
    const allLetters = filterLetter(el);

    if (allLetters) {
      uniqueLetters.push(allLetters);
    }
  });

  const result = filterLetter(uniqueLetters.toString());

  return result;
};

const filterLetter = word => {
  if (word === null || word === undefined) {
    return;
  }

  let mapWords = new Map();

  for (let i = 0; i < word.length; i++) {
    let currentLetter = word[i];
    if (mapWords.has(currentLetter)) {
      mapWords.set(currentLetter, mapWords.get(currentLetter) + 1);
    } else {
      mapWords.set(currentLetter, 1);
    }
  }

  for (let i = 0; i < word.length; i++) {
    if (mapWords.get(word[i]) === 1) {
      return word[i];
    }
  }
  return;
};
