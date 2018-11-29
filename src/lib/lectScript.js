const program = (() => {
  function stillaHeader(cat, title, backgr) {
    document.querySelector('.header__tag').appendChild(document.createTextNode(cat));
    document.querySelector('.header__header').appendChild(document.createTextNode(title));
    if (backgr !== 0) {
      document.querySelector('.header__lect').style.background = `url(./${backgr})`;
    }
    document.querySelector('.header__lect').style['background-color'] = '#ccc';
  }

  function videoHandler(slod) {
    const foreldri = document.querySelector('.lect__text');
    const video = document.createElement('iframe');

    foreldri.appendChild(video);
    video.setAttribute('src', slod);
    video.setAttribute('width', 795);
    video.setAttribute('height', 460);
    video.setAttribute('frameborder', 0);
    video.setAttribute('allowfullscreen', 0);
  }

  function textHandler(texti) {
    const foreldri = document.querySelector('.lect__text');
    const str = texti.split('\n');

    for (let i = 0; i < str.length; i += 1) {
      const umfjollun = document.createElement('p');
      foreldri.appendChild(umfjollun);
      umfjollun.appendChild(document.createTextNode(str[i]));
      umfjollun.classList.add('lect__item');
    }
  }

  function quoteHandler(quote, tribute) {
    const foreldri = document.querySelector('.lect__text');
    const blokk = document.createElement('blockquote');
    const texti = document.createElement('p');
    texti.appendChild(document.createTextNode(quote));
    blokk.appendChild(texti);
    foreldri.appendChild(blokk);
    blokk.classList.add('quote');

    if (tribute !== 0) {
      const attri = document.createElement('cite');
      attri.appendChild(document.createTextNode(tribute));
      blokk.appendChild(attri);
    }
  }

  function imageHandler(mynd, alt) {
    const foreldri = document.querySelector('.lect__text');
    const img = document.createElement('img');
    foreldri.appendChild(img);
    img.setAttribute('src', mynd);
    img.classList.add('image');

    if (alt !== 0) {
      img.setAttribute('alt', alt);
    }
  }

  function headingHandler(fyrirsogn) {
    const foreldri = document.querySelector('.lect__text');
    const texti = document.createElement('h2');
    foreldri.appendChild(texti);
    texti.appendChild(document.createTextNode(fyrirsogn));
    texti.classList.add('lect__heading');
  }

  function listHandler(listi) {
    const foreldri = document.querySelector('.lect__text');
    const container = document.createElement('ul');
    foreldri.appendChild(container);

    for (let i = 0; i < listi.length; i += 1) {
      const stak = document.createElement('li');
      stak.appendChild(document.createTextNode(listi[i]));
      container.appendChild(stak);
    }
  }

  function codeHandler(kodi) {
    const foreldri = document.querySelector('.lect__text');
    const container = document.createElement('pre');
    container.appendChild(document.createTextNode(kodi));
    foreldri.appendChild(container);
    container.classList.add('lect__item');
  }

  function displayText(text) {
    if (text.image) {
      stillaHeader(text.category, text.title, text.image);
    } else {
      stillaHeader(text.category, text.title, 0);
    }

    for (let i = 0; i < text.content.length; i += 1) {
      const butur = text.content[i];
      if (butur.type === 'youtube') {
        videoHandler(butur.data);
      }
      if (butur.type === 'text') {
        textHandler(butur.data);
      }
      if (butur.type === 'quote') {
        if (butur.attribute) {
          quoteHandler(butur.data, butur.attribute);
        } else {
          quoteHandler(butur.data, 0);
        }
      }
      if (butur.type === 'image') {
        if (butur.caption) {
          imageHandler(butur.data, butur.caption);
        } else {
          imageHandler(butur.data, 0);
        }
      }
      if (butur.type === 'heading') {
        headingHandler(butur.data);
      }
      if (butur.type === 'list') {
        listHandler(butur.data);
      }
      if (butur.type === 'code') {
        codeHandler(butur.data);
      }
    }
  }

  function finish() {
    this.style.color = '#2d2';
    this.innerText = '✓ Fyrirlestur kláraður';
    window.localStorage.setItem('data', window.location.search.substring(6));
  }

  function init() {
    fetch(`http://${window.location.host}/lectures.json`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        for (let i = 0; i < data.lectures.length; i += 1) {
          if (data.lectures[i].slug === window.location.search.substring(6)) {
            displayText(data.lectures[i]);
          }
        }
      })
      .catch((error) => {
        console.error(error); /* eslint-disable-line */
      });

    document.querySelector('.footer__tag').addEventListener('click', finish);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  program.init();
});
