const program = (() => {

  function stillaHeader(cat, title, backgr) {
    document.querySelector('.header__tag').appendChild(document.createTextNode(cat));
    document.querySelector('.header__header').appendChild(document.createTextNode(title));
    if (backgr === 0) {
      document.querySelector('.header__lect').style['background-color'] = '#ccc';
    } else {
      document.querySelector('.header__lect').style.background = `url(./${backgr})`;
    }
  }

  function videoHandler(slod) {

  }

  function displayText(text) {
    console.log(text);
    // slug, title, category, image, thumbnail, content

    if (text.image) {
      stillaHeader(text.category, text.title, text.image);
    } else {
      stillaHeader(text.category, text.title, 0);
    }

    console.log(text.content[0]);

    for (let i = 0; i < text.content.length; i += 1) {
      let butur = text.content[i];
      if (butur.type === 'youtube') {
        videoHandler(butur.data);
      }
    }


  }








  function init() {
 //   console.log(window.location.search);
    fetch(`http://${window.location.host}/lectures.json`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
//        const [{slug}] = data.lectures;


      /*  for (let i = 0; i < slug.length; i += 1) {
          console.log(slug[i]);
          if (slug[i] === window.location.search.substring(6)) {
            gogn = slug[i];
          }
      } */

        for (let i = 0; i < data.lectures.length; i += 1) {
          if (data.lectures[i].slug === window.location.search.substring(6)) {
            displayText(data.lectures[i]);
          }
        }
        
      })
      .catch((error) => {
      //  displayError('Villa við að sækja gögn');
        console.error(error); /* eslint-disable-line */
      });


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
