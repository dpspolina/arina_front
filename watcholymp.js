        // Получаем список олимпиад из localStorage или создаём пустой массив, если данных нет
        const olympiads = JSON.parse(localStorage.getItem('olympiads')) || [];
        const olympiadsContainer = document.getElementById('olympiadsContainer');
        const photoItem = document.querySelectorAll(".photo-item");
        console.log(photoItem)
        // Проверяем, есть ли олимпиады, если их нет - выводим сообщение
        if (olympiads.length === 0) {
            olympiadsContainer.innerHTML = '<p style="text-align: center;"> Олимпиады отсутствуют </p>';
        } else {
            // Если олимпиады есть, выводим их на страницу
            olympiads.forEach((olympiad, index) => {
                const container = document.createElement('div');
                container.classList.add('container');

                const fields = document.createElement('div');
                fields.classList.add('fields');

                // Создаём и заполняем поля олимпиады
                fields.innerHTML = `
                    <div class="field"><span>Название:</span><span>${olympiad.title}</span></div>
                    <div class="field"><span>Направление:</span><span>${olympiad.direction}</span></div>
                    <div class="field"><span>Уровень участия:</span><span>${olympiad.level}</span></div>
                    <div class="field"><span>Результат участия:</span><span>${olympiad.participation}</span></div>
                `;

                const photoContainer = document.createElement('div');
                photoContainer.classList.add('photo-container');

                // Создаём фото для олимпиады, если они есть
                olympiad.photos.forEach(photo => {
                    const photoItem = document.createElement('div');
                    photoItem.classList.add('photo-item');

                    const img = document.createElement('img');
                    img.src = photo;

                    photoItem.appendChild(img);
                    photoContainer.appendChild(photoItem);
                });

                // Блок для действий (кнопки редактирования и удаления)
                const actions = document.createElement('div');
                actions.classList.add('actions');

                // Кнопка редактирования
                const editButton = document.createElement('div');
                editButton.classList.add('action-icon');
                editButton.innerHTML = `<img src="img/ред.svg" alt="Редактировать">`;
                editButton.onclick = () => {
                    localStorage.setItem('editOlympiadIndex', index);  // Сохраняем индекс олимпиады для редактирования
                    window.location.href = 'edit Olympiad.html';  // Перенаправляем на страницу редактирования
                };

                // Кнопка удаления
                const deleteButton = document.createElement('div');
                deleteButton.classList.add('action-icon');
                deleteButton.innerHTML = `<img src="img/удалить.svg" alt="Удалить">`;
                deleteButton.onclick = () => {
                    deleteIndex = index; // Сохраняем индекс
                    deleteModal.style.display = 'flex';
                };

                // Добавляем кнопки в блок с действиями
                actions.appendChild(editButton);
                actions.appendChild(deleteButton);

                // Добавляем поля, фото и действия в контейнер олимпиады
                container.appendChild(fields);
                container.appendChild(photoContainer);
                container.appendChild(actions);

                // Добавляем контейнер олимпиады на страницу
                olympiadsContainer.appendChild(container);
            });
        }

        // Логика подтверждения удаления
        confirmDelete.addEventListener('click', () => {
            if (deleteIndex !== null) {
                olympiads.splice(deleteIndex, 1);
                localStorage.setItem('olympiads', JSON.stringify(olympiads));
                location.reload();
            }
        });

        // Закрытие модального окна удаления
        function closeDeleteModal() {
            deleteModal.style.display = 'none';
        }

        // Логика модального окна выхода
        const logoutButton = document.getElementById('logoutButton');
        const logoutModal = document.getElementById('logoutModal');

        logoutButton.addEventListener('click', () => {
            logoutModal.style.display = 'flex';
        });

        function closeModal() {
            logoutModal.style.display = 'none';
        }

        const photoItems = document.querySelectorAll(".photo-item");
const photoContainer = document.querySelector(".photo-container");
const fields = document.querySelector(".fields");
const imagePlace = document.querySelector(".image-place");
const backgroundImage = document.querySelector(".background__image");
const closeBtn = document.querySelector(".close-btn");
const images = document.querySelectorAll(".photo-item img");

photoItems.forEach((el) => {
    el.addEventListener("click", () => {
        backgroundImage.style.display = "flex";
        backgroundImage.style.justifyContent = "center";
        backgroundImage.style.alignItems = "center";
        backgroundImage.style.position = "fixed";
        backgroundImage.style.top = "0";
        backgroundImage.style.left = "0";
        backgroundImage.style.width = "100vw";
        backgroundImage.style.height = "100vh";
        backgroundImage.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        
        imagePlace.innerHTML = "";
        const img = el.querySelector("img").cloneNode(true);
        img.style.maxWidth = "90vw";
        img.style.maxHeight = "90vh";
        img.style.objectFit = "contain";
        imagePlace.appendChild(img);
    });
});

closeBtn.addEventListener("click", () => {
    backgroundImage.style.display = "none";
});