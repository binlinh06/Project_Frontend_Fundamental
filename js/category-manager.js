const categorys = JSON.parse(localStorage.getItem("categorys")) || [
    { id: 1, category: "Lịch sử", categoryEmoji: "📚" },
    { id: 2, category: "Khoa học", categoryEmoji: "🧠" },
    { id: 3, category: "Giải trí", categoryEmoji: "🎤" },
    { id: 4, category: "Đời sống", categoryEmoji: "🏠" },
    { id: 5, category: "Lịch sử", categoryEmoji: "📚" },
    { id: 6, category: "Khoa học", categoryEmoji: "🧠" },
    { id: 7, category: "Giải trí", categoryEmoji: "🎤" },
    { id: 8, category: "Khoa học", categoryEmoji: "🧠" }
];
localStorage.setItem("categorys", JSON.stringify(categorys));
let nextId = categorys.length + 1;

document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("categoryTable");
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
    const rowsPerPage = 8;
    let currentPage = 1;
    let selectedRow = null;

    function renderTable() {
        tableBody.innerHTML = "";
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedItems = categorys.slice(start, end);

        for (let i = 0; i < paginatedItems.length; i++) {
            const category = paginatedItems[i];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${category.id}</td>
                <td>${category.categoryEmoji} ${category.category}</td>
                <td>
                    <button class="btn-change">Sửa</button>
                    <button class="btn-delete">Xóa</button>
                </td>
            `;
            tableBody.appendChild(row);
        }


        renderPagination();
    }

    function renderPagination() {
        const pagination = document.getElementById("pageNumbers");
        pagination.innerHTML = "";

        const totalPages = Math.ceil(categorys.length / rowsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.textContent = i;
            btn.className = i === currentPage ? "active" : "";
            btn.addEventListener("click", () => {
                currentPage = i;
                renderTable();
            });
            pagination.appendChild(btn);
        }
    }

    function openAddModal(editRow = null) {
        selectedRow = editRow;
        hideError(categoryNameInput);
        hideError(categoryEmojiInput);
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
        const isDuplicate = categorys.some((c, index) => {
            // Nếu đang sửa thì bỏ qua chính mình (selectedRow !== null)
            if (selectedRow) {
                const rowIndex = selectedRow.rowIndex - 1 + (currentPage - 1) * rowsPerPage;
                return index !== rowIndex && c.category.toLowerCase() === name.toLowerCase();
            }
            return c.category.toLowerCase() === name.toLowerCase();
        });
        if (!name) {
            showError(categoryNameInput, "Vui lòng nhập tên danh mục!");
        } else if (isDuplicate) {
            showError(categoryNameInput, "Tên danh mục đã tồn tại!");
            return;
        } else {
            hideError(categoryNameInput);
        }

        if (!emoji) {
            showError(categoryEmojiInput, "Vui lòng nhập emoji!");
            return;
        } else {
            hideError(categoryEmojiInput);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Sửa thành công!",
                showConfirmButton: false,
                timer: 1000
            });
        }

        if (selectedRow) {
            const index = selectedRow.rowIndex - 1 + (currentPage - 1) * rowsPerPage;
            categorys[index].category = name;
            categorys[index].categoryEmoji = emoji;
        } else {
            categorys.push({ id: nextId++, category: name, categoryEmoji: emoji });
        }

        localStorage.setItem("categorys", JSON.stringify(categorys));
        categoryNameInput.value = "";
        categoryEmojiInput.value = "";

        renderTable();
        closeModal();
    });

    // ✅ Xử lý xóa dòng khỏi mảng + localStorage + cập nhật giao diện
    btnConfirmDelete.addEventListener("click", function () {
        if (selectedRow) {
            const index = selectedRow.rowIndex - 1 + (currentPage - 1) * rowsPerPage;
            categorys.splice(index, 1);
            localStorage.setItem("categorys", JSON.stringify(categorys));

            const totalPages = Math.ceil(categorys.length / rowsPerPage);
            if (currentPage > totalPages) {
                currentPage = totalPages;
            }

            renderTable();
            closeDeleteModal();
        }
    });

    btnAdd.addEventListener("click", () => openAddModal());
    btnClose.forEach(button => button.addEventListener("click", closeModal));
    btnHuy.forEach(button => button.addEventListener("click", closeModal));
    btnDeleteHuy.addEventListener("click", closeDeleteModal);
    overlay.addEventListener("click", closeModal);

    tableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-change")) {
            openAddModal(event.target.closest("tr"));
        }
        if (event.target.classList.contains("btn-delete")) {
            openDeleteModal(event.target.closest("tr"));
        }
    });

    renderTable();
});
function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.innerText = message;
    errorElement.classList.add("show");
    input.classList.add("error");
}

function hideError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.classList.remove("show");
    input.classList.remove("error");
}


