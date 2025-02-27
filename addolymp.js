        // Ссылки на элементы формы
        const title = document.getElementById("title");
        const direction = document.getElementById("direction");
        const level = document.getElementById("Participation-level");
        const participation = document.getElementById("Result-of-participation");
        const photo = document.getElementById("photo");
        const photoPreview = document.getElementById("photoPreview");
        const uploadBox = document.getElementById("uploadBox");
        const submit = document.getElementById("submit");

        // Массив для хранения загруженных фотографий
        let photos = [];
        const maxPhotos = 3;  // Максимум 3 фотографии

        // Функция проверки, чтобы кнопка отправки была активна только при заполнении всех обязательных полей
        const validateForm = () => {
            submit.disabled = !(title.value.trim() && direction.value && level.value && participation.value && photos.length > 0);
        };

        // Слушатели событий для каждого поля формы, чтобы при изменении данных проверялась валидность
        title.addEventListener("input", validateForm);
        direction.addEventListener("change", validateForm);
        level.addEventListener("change", validateForm);
        participation.addEventListener("change", validateForm);

        // Слушатель для выбора фотографий
        photo.addEventListener("change", (e) => {
            const files = Array.from(e.target.files);  // Преобразуем файл в массив

            // Проверка на максимальное количество фотографий
            if (photos.length + files.length > maxPhotos) {
                alert(`Можно загрузить не более ${maxPhotos} фотографий.`);
                return;
            }

            // Чтение выбранных фотографий
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    if (photos.length < maxPhotos) {
                        photos.push(reader.result);  // Добавляем изображение в массив

                        // Создаем элемент для отображения фото
                        const photoItem = document.createElement("div");
                        photoItem.classList.add("photo-item");
                        photoItem.innerHTML = `<img src="${reader.result}"><button>×</button>`;

                        // Кнопка для удаления фотографии
                        photoItem.querySelector("button").addEventListener("click", () => {
                            photos = photos.filter(src => src !== reader.result);  // Удаляем фото из массива
                            photoPreview.removeChild(photoItem);  // Удаляем элемент фотографии из DOM

                            // Показываем блок для загрузки фото, если есть место
                            if (photos.length < maxPhotos) {
                                uploadBox.style.display = "flex";
                            }

                            // Обновляем проверку формы
                            validateForm();
                        });

                        // Добавляем фото в контейнер для превью
                        photoPreview.insertBefore(photoItem, uploadBox);
                        validateForm();  // Проверка формы после добавления фото
                    }

                    // Если фотографии больше нельзя добавлять, скрываем кнопку добавления
                    if (photos.length >= maxPhotos) {
                        uploadBox.style.display = "none";
                    }
                };
                reader.readAsDataURL(file);  // Чтение файла как data URL (изображение)
            });
        });

        // Слушатель для кнопки отправки формы
        submit.addEventListener("click", () => {
            // Собираем все данные формы в объект
            const formData = {
                title: title.value.trim(),
                direction: direction.value,
                level: level.value,
                participation: participation.value,
                photos,
            };

            // Получаем текущий список олимпиад из localStorage (если они есть)
            const olympiads = JSON.parse(localStorage.getItem('olympiads')) || [];
            
            // Добавляем текущую олимпиаду в список
            olympiads.push(formData);

            // Сохраняем обновленный список в localStorage
            localStorage.setItem('olympiads', JSON.stringify(olympiads));

            // Переход на страницу просмотра олимпиад
            window.location.href = "watch Olympiad.html";
        });