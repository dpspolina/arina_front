
        // Логика модального окна выхода
        const logoutButton = document.getElementById('logoutButton');
        const logoutModal = document.getElementById('logoutModal');

        logoutButton.addEventListener('click', () => {
            logoutModal.style.display = 'flex';
        });

        function closeModal() {
            logoutModal.style.display = 'none';
        }