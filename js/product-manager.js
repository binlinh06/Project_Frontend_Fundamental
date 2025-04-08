document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("overlay");
    const changeModal = document.getElementById("change-modal");
    const deleteModal = document.getElementById("delete-modal");
    const btnSave = document.getElementById("btn-save");
    const btnConfirmDelete = document.getElementById("btn-confirm-delete");
    const btnClose = document.querySelectorAll(".close-btn");
    const btnHuy = document.querySelectorAll(".btn-huy");
    const btnDeleteHuy = document.getElementById("btn-delete-huy");
    const testNameInput = document.getElementById("test-name");
    const categoryNameInput = document.getElementById("test-category");
    const questionInput = document.getElementById("test-question");
    const timeInput = document.getElementById("test-time");
    const errorMessage = document.getElementById("error-message");
    const table = document.querySelector(".table tbody");
    let selectedRow = null;

    function openChangeModal(editRow = null) {
        selectedRow = editRow;
        errorMessage.style.display = "none";
        changeModal.classList.add("active");
        overlay.classList.add("active");

        if (editRow) {
            const name = editRow.cells[1].textContent;
            const category = editRow.cells[2].textContent;
            const question = editRow.cells[3].textContent;
            const timeCellText = editRow.cells[4].textContent.trim(); // "10 min"
            const timeOnly = timeCellText.replace(" min", "");         // "10"
            timeInput.value = timeOnly;



            testNameInput.value = name;
            categoryNameInput.value = category;
            questionInput.value = question;
            timeInput.value = time;
        } else {
            testNameInput.value = "";
            categoryNameInput.value = "";
            questionInput.value = "";
            timeInput.value = "";
        }
    }

    function closeModal() {
        changeModal.classList.remove("active");
        deleteModal.classList.remove("active");
        overlay.classList.remove("active");
        selectedRow = null;
    }

    function openDeleteModal(row) {
        selectedRow = row;
        deleteModal.classList.add("active");
        overlay.classList.add("active");
    }

    function closeDeleteModal() {
        deleteModal.classList.remove("active");
        overlay.classList.remove("active");
        selectedRow = null;
    }

    btnSave.addEventListener("click", function () {
        const name = testNameInput.value.trim();
        const category = categoryNameInput.value.trim();
        const question = questionInput.value.trim();
        const time = timeInput.value.trim();

        if (!name || !category || !question || !time) {
            errorMessage.textContent = "Vui lòng nhập đầy đủ thông tin!";
            errorMessage.style.display = "block";
            return;
        }

        if (selectedRow) {
            selectedRow.cells[1].textContent = `${name}`;
            selectedRow.cells[2].textContent = `${category}`;
            selectedRow.cells[3].textContent = `${question}`;
            selectedRow.cells[4].innerHTML = `${time} <span>min</span>`;
            closeModal();
            selectedRow = null;
        } else {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                    <td>${name}</td>
                    <td>${category}</td>
                    <td>${question}</td>
                    <td>${time} <span>min</span></td>
                    <td>
                        <button class="btn-change">Sửa</button>
                        <button class="btn-delete">Xóa</button>
                    </td>
                `;


            table.appendChild(newRow);
            addEventListenersForRow(newRow);
        }

        closeModal();
    });

    btnConfirmDelete.addEventListener("click", function () {
        if (selectedRow) {
            selectedRow.remove(); // Xóa dòng được chọn
            closeDeleteModal(); // Đóng modal xác nhận xóa
        }
    });

    btnClose.forEach(button => button.addEventListener("click", closeModal));
    btnHuy.forEach(button => button.addEventListener("click", closeModal));
    btnDeleteHuy.addEventListener("click", closeDeleteModal);
    overlay.addEventListener("click", closeModal);

    table.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-change")) {
            openChangeModal(event.target.closest("tr"));
        }
        if (event.target.classList.contains("btn-delete")) {
            openDeleteModal(event.target.closest("tr"));
        }
    });

    function addEventListenersForRow(row) {
        row.querySelector(".btn-change").addEventListener("click", function () {
            openChangeModal(row);
        });

        row.querySelector(".btn-delete").addEventListener("click", function () {
            openDeleteModal(row);
        });
    }
});
