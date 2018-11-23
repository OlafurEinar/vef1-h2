
const program = (() => {
  function filter() {
    const htmlLects = document.querySelectorAll('.html');
    const cssLects = document.querySelectorAll('.css');
    const jsLects = document.querySelectorAll('.js');
    const rowChildren = document.querySelector('.lectures__row').children;
    this.classList.toggle('button--clicked');

    if (this.textContent === 'HTML') {
      this.classList.toggle('green');
      for (let i = 0; i < htmlLects.length; i += 1) {
        htmlLects[i].classList.toggle('hide');
      }
    } else if (this.textContent === 'CSS') {
      this.classList.toggle('green');
      for (let i = 0; i < cssLects.length; i += 1) {
        cssLects[i].classList.toggle('hide');
      }
    } else if (this.textContent === 'JavaScript') {
      this.classList.toggle('green');
      for (let i = 0; i < jsLects.length; i += 1) {
        jsLects[i].classList.toggle('hide');
      }
    }

    for (let i = 0; i < rowChildren.length; i += 1) {
      if (!rowChildren[i].classList.contains('hide')) {
        return;
      }
    }
    for (let i = 0; i < htmlLects.length; i += 1) {
      htmlLects[i].classList.toggle('hide');
    }
    for (let i = 0; i < cssLects.length; i += 1) {
      cssLects[i].classList.toggle('hide');
    }
    for (let i = 0; i < jsLects.length; i += 1) {
      jsLects[i].classList.toggle('hide');
    }
  }

  function tjekk(list) {
    const links = document.querySelectorAll('a');

    for (let i = 0; i < links.length; i += 1) {
      if (links[i].getAttribute('href').substring(22) === list) {
        window.localStorage.setItem(i, list);
      }
    }

    for (let i = 0; i < 13; i += 1) {
      if (window.localStorage.getItem(i)) {
        const tekk = document.createElement('p');
        tekk.appendChild(document.createTextNode('  ✓'));
        tekk.classList.add('graenn');
        links[i].childNodes[1].appendChild(tekk);
      }
    }
  }

  function init(list) {
    const filterButtons = document.querySelectorAll('.filter__button');

    tjekk(list);

    for (let i = 0; i < filterButtons.length; i += 1) {
      filterButtons[i].addEventListener('click', filter);
    }
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const list = window.localStorage.getItem('data');

  program.init(list);
});
