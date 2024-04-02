window.addEventListener('DOMContentLoaded', function () {
  const elementMenu = document.querySelector('.element-menu');
  const emergeMenu = document.querySelector('.emerge-menu');
  const selectionMenu = elementMenu.querySelectorAll('.selection-menu');
  const apofiosHome = document.querySelector('.apofios-home');

  // Меню
  elementMenu.addEventListener('click', function () {
    elementMenu.classList.toggle('change');
    emergeMenu.classList.toggle('value');
  });

  // Для загрузки других страниц
  let urlSelection = '';
  function buttonPresset(selectionButton) {
    if (selectionButton === 'Главная') {
      return (urlSelection = 'page/home.html');
    } else if (selectionButton === 'Услуги') {
      return (urlSelection = 'page/servises.html');
    } else if (selectionButton === 'О нас') {
      return (urlSelection = 'page/aboutUs.html');
    } else if (selectionButton === 'Контакты') {
      return (urlSelection = 'page/contacts.html');
    }
  }

  // Загрузка скрипта 'О нас'
  const swithingPicture = () => {
    const imgAbout = document.querySelectorAll('.img-about');
    const currentImage = document.querySelector('.img-about.active');
    const currentIndex = Array.from(imgAbout).indexOf(currentImage);
    currentImage.classList.remove('active');
    let nextIndex = (currentIndex + 1) % imgAbout.length;
    imgAbout[nextIndex].classList.add('active');
  };

  const backPage = () => {};

  const loadScript = function (urlSelection) {
    if (urlSelection.includes('aboutUs')) {
      document.querySelector('.btn').addEventListener('click', () => {
        swithingPicture();
      });
    }
  };
  //
  selectionMenu.forEach((event) => {
    event.addEventListener('click', (e) => {
      e.preventDefault();
      buttonPresset(e.target.id);

      fetch(urlSelection)
        .then((response) => {
          if (response.url === 'http://127.0.0.1:5500/index.html') {
            return fetch('home.html');
          } else {
            return response.text();
          }
        })
        .then((data) => {
          if (typeof data === 'string') {
            apofiosHome.innerHTML = data;
          } else {
            data.text().then((homeData) => {
              apofiosHome.innerHTML = homeData;
              buttonClick();
            });
          }
        })
        .then(() => {
          loadScript(urlSelection);
        })
        .catch((error) => {
          console.error('Произошла ошибка:', error);
        });
    });
  });
});
