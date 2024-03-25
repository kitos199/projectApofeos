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
  const loadScript = function (urlSelection) {
    if (urlSelection.includes('aboutUs')) {
      document.querySelector('.btn').addEventListener('click', (e) => {
        console.log('Нажал', e.target);
      });
    }
  };
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
