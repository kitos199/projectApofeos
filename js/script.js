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
      return (urlSelection = '');
    } else if (selectionButton === 'Услуги') {
      return (urlSelection = 'servises.html');
    } else if (selectionButton === 'О нас') {
      return (urlSelection = 'aboutUs.html');
    } else if (selectionButton === 'Контакты') {
      return (urlSelection = 'contacts.html');
    }
  }
  console.log(urlSelection);
  selectionMenu.forEach((event) => {
    event.addEventListener('click', (e) => {
      e.preventDefault()
      console.log(e.target.id);
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
              console.log('Это данные', data);
              apofiosHome.innerHTML = data;
          } else {
              data.text().then((homeData) => {
                  console.log('Это данные', homeData);
                  apofiosHome.innerHTML = homeData;
              });
          }
      })
      .catch((error) => {
          console.error('Произошла ошибка:', error);
      });
    });
  });
});
