const category = [
    {id: 1, category: "Lịch sử", categoryEmoji: "📚 "},
    {id: 2, category: "Khoa học", categoryEmoji: "🧠"},
    {id: 3, category: "Giải trí", categoryEmoji: "🎤"},
    {id: 4, category: "Đời sống", categoryEmoji: "🏠"},
    {id: 5, category: "Lịch sử", categoryEmoji: "📚 "},
    {id: 6, category: "Khoa học", categoryEmoji: "🧠"},
    {id: 7, category: "Giải trí", categoryEmoji: "🎤"},
    {id: 8, category: "Khoa học", categoryEmoji: "🧠"}
]

document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("overlay");
    const addModal = document.getElementById("add-modal");
    const deleteModal = document.getElementById("delete-modal");
    const btnAdd = document.getElementById("btn-add");
    const btnSave = document.getElementById("btn-save");
    const btnConfirmDelete = document.getElementById("btn-confirm-delete");
    const btnClose = document.querySelectorAll(".close-btn");
    const btnHuy = document.querySelectorAll(".btn-huy");
    const btnDeleteHuy = document.getElementById("btn-delete-huy");
    const categoryNameInput = document.getElementById("category-name");
    const categoryEmojiInput = document.getElementById("category-emoji");
    const errorMessage = document.getElementById("error-message");
    const table = document.querySelector(".table tbody");
    let rowCount = 9;
    const rowsPerPage = 8;
    let currentPage = 1;
    let selectedRow = null;

    function openAddModal(editRow = null) {
        selectedRow = editRow;
        errorMessage.style.display = "none";
        addModal.classList.add("active");
        overlay.classList.add("active");

        if (editRow) {
            const categoryData = editRow.cells[1].textContent.split(" ");
            const emoji = categoryData.shift();
            const name = categoryData.join(" ");
            categoryNameInput.value = name;
            categoryEmojiInput.value = emoji;
        } else {
            categoryNameInput.value = "";
            categoryEmojiInput.value = "";
        }
    }

    function closeModal() {
        addModal.classList.remove("active");
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
        const name = categoryNameInput.value.trim();
        const emoji = categoryEmojiInput.value.trim();

        if (!name || !emoji) {
            errorMessage.textContent = "Vui lòng nhập đầy đủ thông tin!";
            errorMessage.style.display = "block";
            return;
        }

        if (selectedRow) {
            selectedRow.cells[1].textContent = `${emoji} ${name}`;
        } else {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${rowCount}</td>
                <td>${emoji} ${name}</td>
                <td>
                    <button class="btn-change">Sửa</button>
                    <button class="btn-delete">Xóa</button>
                </td>
            `;

            table.appendChild(newRow);
            addEventListenersForRow(newRow);
            rowCount++
        }

        closeModal();
    });

    btnConfirmDelete.addEventListener("click", function () {
        if (selectedRow) {
            selectedRow.remove(); // Xóa dòng được chọn
            closeDeleteModal(); // Đóng modal xác nhận xóa
        }
    });

    btnAdd.addEventListener("click", () => openAddModal());
    btnClose.forEach(button => button.addEventListener("click", closeModal));
    btnHuy.forEach(button => button.addEventListener("click", closeModal));
    btnDeleteHuy.addEventListener("click", closeDeleteModal);
    overlay.addEventListener("click", closeModal);

    table.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-change")) {
            openAddModal(event.target.closest("tr"));
        }
        if (event.target.classList.contains("btn-delete")) {
            openDeleteModal(event.target.closest("tr"));
        }
    });

    function addEventListenersForRow(row) {
        row.querySelector(".btn-change").addEventListener("click", function () {
            openAddModal(row);
        });

        row.querySelector(".btn-delete").addEventListener("click", function () {
            openDeleteModal(row);
        });
    }
});
