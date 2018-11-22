
const program = (() => {

  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  function filter() {
    const htmlLects = document.querySelectorAll('.html');
    const cssLects = document.querySelectorAll('.css');
    const jsLects = document.querySelectorAll('.js');
    const rowChildren = document.querySelector('.lectures__row').children;

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

  function init(page) {
    const filterButtons = document.querySelectorAll('.filter__button');

    for (let i = 0; i < filterButtons.length; i += 1) {
      filterButtons[i].addEventListener('click', filter);
    }

    const button = page.querySelector('button');
    button.addEventListener('click', filter);
  }

  return {
    init,
  };
})();


document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');
  program.init(page);

});




/*  if (isLecturePage) {

  } else {
    const list = new List();
    list.load();
  }*/
