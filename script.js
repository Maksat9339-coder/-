document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.querySelector('#addBtn');
    const nameInput = document.querySelector('#subjectName');
    const timeInput = document.querySelector('#subjectTime');
    const tableBody = document.querySelector('#tableBody');
    const clearSchedule = document.querySelector('#clearSchedule');
    // Находим наш новый datalist
    const dataList = document.querySelector('#subjectList');

    let schedule = JSON.parse(localStorage.getItem('mySchedule')) || [];

    // Функция для обновления списка подсказок
    function updateDatalist() {
        dataList.innerHTML = '';
        // Берем только уникальные названия
        const uniqueSubjects = [...new Set(schedule.map(item => item.name))];
        
        uniqueSubjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            dataList.appendChild(option);
        });
    }

    function renderSchedule() {
        tableBody.innerHTML = '';
        schedule.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.time}</td>
                <td>
                    <button onclick="editItem(${index})">Ред.</button>
                    <button onclick="deleteItem(${index})">Удалить</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
        // Обновляем список выбора каждый раз при перерисовке
        updateDatalist();
    }

    function saveAndRefresh() {
        localStorage.setItem('mySchedule', JSON.stringify(schedule));
        renderSchedule();
    }

    addBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        const name = nameInput.value.trim();
        const time = timeInput.value;

        if (name && time) {
            schedule.push({ name, time });
            saveAndRefresh();
            nameInput.value = '';
            timeInput.value = '08:00'; 
        } else {
            alert('Заполните все поля!');
        }
    });

    clearSchedule.addEventListener('click', () => {
        if (confirm('Вы уверены?')) {
            schedule = [];
            saveAndRefresh();
        }
    });

    window.deleteItem = (index) => {
        schedule.splice(index, 1);
        saveAndRefresh();
    };

    window.editItem = (index) => {
        const newName = prompt('Новое название:', schedule[index].name);
        const newTime = prompt('Новое время:', schedule[index].time);
        if (newName && newTime) {
            schedule[index] = { name: newName, time: newTime };
            saveAndRefresh();
        }
    };

    renderSchedule();
});