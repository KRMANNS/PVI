document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript завантажився!");

    const openFormBtn = document.getElementById("openFormBtn");
    const modal = document.getElementById("studentForm");
    const closeBtn = document.querySelector(".close");
    const form = document.getElementById("addStudentForm");
    const table = document.getElementById("studetnTable");
    const tbody = table.getElementsByTagName("tbody")[0] || table;
    let editingStudentId = null;

    const confirmModal = document.createElement("div");
    confirmModal.innerHTML = `
        <div class="confirm-modal">
            <p>Ви впевнені, що хочете видалити цього студента?</p>
            <button id="confirmDelete">Так</button>
            <button id="cancelDelete">Ні</button>
        </div>
    `;
    confirmModal.style.display = "none";
    document.body.appendChild(confirmModal);

    if (!openFormBtn || !modal || !closeBtn || !form || !table) {
        console.error("Помилка: Один із елементів не знайдено!");
        return;
    }

    function addStudentToTable(student) {
        const newRow = table.insertRow(-1);

        newRow.insertCell(0).innerHTML = `<input type="checkbox">`;
        newRow.insertCell(1).textContent = student.group;
        newRow.insertCell(2).textContent = student.name;
        newRow.insertCell(3).textContent = student.gender;
        newRow.insertCell(4).textContent = student.birthday;
        newRow.insertCell(5).innerHTML = `<span class="status-indicator"></span>`;
        newRow.insertCell(6).innerHTML = `
            <button class="editbutton">Edit</button><button class="deletebutton">Delete</button>
        `;

        newRow.querySelector(".deletebutton").addEventListener("click", function () {
            showDeleteConfirmation(student.id);
        });

        newRow.querySelector(".editbutton").addEventListener("click", function () {
            editStudent(student);
        });
    }

    function saveStudentsToLocalStorage(students) {
        localStorage.setItem("students", JSON.stringify(students));
    }

    function loadStudentsFromLocalStorage() {
        const students = JSON.parse(localStorage.getItem("students")) || [];
        students.forEach(addStudentToTable);
        return students;
    }

    function showDeleteConfirmation(studentId) {
        confirmModal.style.display = "block";

        document.getElementById("confirmDelete").onclick = function () {
            deleteStudent(studentId);
            confirmModal.style.display = "none";
        };

        document.getElementById("cancelDelete").onclick = function () {
            confirmModal.style.display = "none";
        };
    }

    function deleteStudent(studentId) {
        let students = JSON.parse(localStorage.getItem("students")) || [];
        students = students.filter(student => student.id !== studentId);
        saveStudentsToLocalStorage(students);
        location.reload();
    }

    function editStudent(student) {
        document.getElementById("group").value = student.group;
        document.getElementById("name").value = student.name;
        document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
        document.getElementById("birthday").value = student.birthday;
        
        editingStudentId = student.id;
        modal.style.display = "flex";
    }

    let students = loadStudentsFromLocalStorage();

    openFormBtn.addEventListener("click", function () {
        form.reset();
        editingStudentId = null;
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const group = document.getElementById("group").value.trim();
        const name = document.getElementById("name").value.trim();
        const gender = document.querySelector('input[name="gender"]:checked')?.value;
        const birthday = document.getElementById("birthday").value;

        if (!group || !name || !gender || !birthday) {
            alert("Заповніть всі поля!");
            return;
        }

        if (editingStudentId !== null) {
            students = students.map(student => 
                student.id === editingStudentId ? { id: editingStudentId, group, name, gender, birthday } : student
            );
        } else {
            const student = {
                id: Date.now(),
                group,
                name,
                gender,
                birthday
            };
            students.push(student);
        }

        saveStudentsToLocalStorage(students);
        location.reload();
    });
});

function showTooltip(element) {
    element.querySelector('.tooltip').style.display = 'block';
}

function hideTooltip(element) {
    element.querySelector('.tooltip').style.display = 'none';
}
function showTooltip2(element) {
    element.querySelector('.tooltip2').style.display = 'block';
}

function hideTooltip2(element) {
    element.querySelector('.tooltip2').style.display = 'none';
}

function changeImage(isHover) {
    const bell = document.getElementById("bell");
    bell.src = isHover ? "icons8-напоминания.gif" : "bell_1827349.png"; // Замініть "..." на шлях до іншого зображення
    
}

/*<script>
    const buttons = document.querySelectorAll(".pagination button");

    buttons.forEach(button =gt {
        button.addEventListener("click", function() {
            buttons.forEach(btn => btn.classList.remove("active")); // Видаляємо "active" у всіх кнопок
            this.classList.add("active"); // Додаємо "active" до натиснутої кнопки
        })
    });
</script>*/