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

    let selectedRow = null;

    function openAddModal(editRow = null) {
        selectedRow = editRow;
        errorMessage.style.display = "none";
        addModal.classList.add("active");
        overlay.classList.add("active");

        if (editRow) {
            const categoryData = editRow.cells[2].textContent.split(" ");
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

        const allCategories = Array.from(document.querySelectorAll(".table tbody tr td:nth-child(2)")).map(td => td.textContent);

        if (selectedRow) {
            selectedRow.cells[1].textContent = `${emoji} ${name}`;
        } else {
            if (allCategories.includes(`${emoji} ${name}`)) {
                errorMessage.textContent = "Tên danh mục đã tồn tại!";
                errorMessage.style.display = "block";
                return;
            }

            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td>${table.children.length+1}</td>
                <td>${emoji} ${name}</td>
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
            selectedRow.remove();
            closeDeleteModal();
        }
        closeDeleteModal();
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

    document.querySelectorAll(".table tbody tr:not(:first-child)").forEach(addEventListenersForRow);
});
