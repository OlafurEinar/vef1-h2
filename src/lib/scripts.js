const program = (() => {
  function filter() {
    const htmlLects = document.querySelectorAll('.html');
    const cssLects = document.querySelectorAll('.css');
    const jsLects = document.querySelectorAll('.js');
    const rowChildren = document.querySelector('.lectures__row').children;
    this.classList.toggle('button--clicked');

    if (this.textContent === 'HTML') {
      this.classList.toggle('green');
    } else if (this.textContent === 'CSS') {
      this.classList.toggle('green');
    } else if (this.textContent === 'JavaScript') {
      this.classList.toggle('green');
    }

    for (let i = 0; i < rowChildren.length; i += 1) {
      rowChildren[i].classList.add('hide');
    }

    for (let i = 0; i < document.querySelectorAll('.green').length; i += 1) {
      if (document.querySelectorAll('.green')[i].textContent === 'HTML') {
        for (let j = 0; j < htmlLects.length; j += 1) {
          htmlLects[j].classList.remove('hide');
        }
      } else if (document.querySelectorAll('.green')[i].textContent === 'JavaScript') {
        for (let j = 0; j < jsLects.length; j += 1) {
          jsLects[j].classList.remove('hide');
        }
      } else if (document.querySelectorAll('.green')[i].textContent === 'CSS') {
        for (let j = 0; j < cssLects.length; j += 1) {
          cssLects[j].classList.remove('hide');
        }
      }
    }

    if (document.querySelectorAll('.green').length === 0) {
      for (let i = 0; i < rowChildren.length; i += 1) {
        rowChildren[i].classList.remove('hide');
      }
    }
    if (document.querySelectorAll('.green').length === 3) {
      for (let i = 0; i < rowChildren.length; i += 1) {
        rowChildren[i].classList.remove('hide');
      }
    }
  }

  function tjekk(list) {
    const links = document.querySelectorAll('a');
    const links2 = document.querySelectorAll('.title__container');

    for (let i = 0; i < links.length; i += 1) {
      if (links[i].getAttribute('href').substring(22) === list) {
        window.localStorage.setItem(i, list);
      }
    }

    for (let i = 0; i < 13; i += 1) {
      if (window.localStorage.getItem(i)) {
        const tekk = document.createElement('p');
        tekk.appendChild(document.createTextNode('✓'));
        tekk.classList.add('graenn');
        links2[i].appendChild(tekk);
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
