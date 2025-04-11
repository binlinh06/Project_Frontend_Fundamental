const products = JSON.parse(localStorage.getItem("products")) || [
    { id: 1, productName: "History Quiz", category: "📚Lịch sử", question: 15, time: 10 },
    { id: 2, productName: "Science Challenge", category: "🧠Khoa học", question: 20, time: 15 },
    { id: 3, productName: "Entertainment Trivia", category: "🎤Đời sống", question: 10, time: 5 },
    { id: 4, productName: "Entertainment Trivia", category: "🎤Đời sống", question: 10, time: 5 },
    { id: 5, productName: "Entertainment Trivia", category: "🎤Đời sống", question: 10, time: 5 },
    { id: 6, productName: "Entertainment Trivia", category: "🎤Đời sống", question: 10, time: 5 },
    { id: 7, productName: "Entertainment Trivia", category: "🎤Đời sống", question: 10, time: 5 },
    { id: 8, productName: "Entertainment Trivia", category: "🎤Đời sống", question: 10, time: 5 },
    { id: 9, productName: "Entertainment Trivia", category: "🎤Đời sống", question: 10, time: 5 }
];
let nextId = products.length + 1;
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("categoryTable");
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
    let selectedRow = null;
    const rowsPerPage = 8;
    let currentPage = 1;

    function renderTable() {
        tableBody.innerHTML = "";
        const searchKeyword = document.getElementById("search-input").value.toLowerCase();
        // Lọc theo từ khóa trước khi phân trang
        const filteredProducts = products.filter(product =>
            product.productName.toLowerCase().includes(searchKeyword)
        );
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedItems = filteredProducts.slice(start, end);

        for (let i = 0; i < paginatedItems.length; i++) {
            const product = paginatedItems[i];
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.productName}</td>
                <td>${product.category}</td>
                <td>${product.question}</td>
                <td>${product.time} <span>min</span></td>
                <td>
                    <button class="btn-change">Sửa</button>
                    <button class="btn-delete">Xóa</button>
                </td>
            `;
            tableBody.appendChild(row);
        }


        renderPagination(filteredProducts);
    }
    document.getElementById("search-input").addEventListener("input", function () {
        currentPage = 1; // quay về trang đầu khi tìm kiếm
        renderTable();
    });
    function renderPagination(filteredItems) {
        const pagination = document.getElementById("pageNumbers");
        pagination.innerHTML = "";

        const totalPages = Math.ceil(filteredItems.length / rowsPerPage);
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

            testNameInput.value = name;
            categoryNameInput.value = category;
            questionInput.value = question;
            timeInput.value = timeOnly;
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
            // Cập nhật sản phẩm hiện có
            const index = selectedRow.rowIndex - 1 + (currentPage - 1) * rowsPerPage;
            products[index].productName = name;
            products[index].category = category;
            products[index].question = Number(question);
            products[index].time = Number(time);
        } else {
            // Thêm sản phẩm mới
            products.push({
                id: nextId++,
                productName: name,
                category: category,
                question: Number(question),
                time: Number(time)
            });
        }

        localStorage.setItem("products", JSON.stringify(products));
        closeModal();
        renderTable();
    });

    btnConfirmDelete.addEventListener("click", function () {
        if (selectedRow) {
            const index = selectedRow.rowIndex - 1 + (currentPage - 1) * rowsPerPage;
            products.splice(index, 1);
            localStorage.setItem("products", JSON.stringify(products));

            const totalPages = Math.ceil(products.length / rowsPerPage);
            if (currentPage > totalPages) {
                currentPage = totalPages;
            }

            renderTable();
            closeDeleteModal();
        }
    });
    document.getElementById("sort-select").addEventListener("change", function () {
        const value = this.value;
        switch (value) {
            case "name-asc":
                products.sort((a, b) => a.productName.localeCompare(b.productName))
                break;
            case "name-desc":
                products.sort((a, b) => b.productName.localeCompare(a.productName))
                break;
            case "category-asc":
                products.sort((a, b) => a.category.localeCompare(b.category))
                break
            case "category-desc":
                products.sort((a, b) => b.category.localeCompare(a.category))
                break
            case "question-asc":
                products.sort((a, b) => a.question - b.question)
                break
            case "question-desc":
                products.sort((a, b) => b.question - a.question)
                break
            case "time-asc":
                products.sort((a, b) => a.time - b.time)
                break
            case "time-desc":
                products.sort((a, b) => b.time - a.time)
                break
            default:
                break
        }

        currentPage = 1
        renderTable()
    })

    btnClose.forEach(button => button.addEventListener("click", closeModal));
    btnHuy.forEach(button => button.addEventListener("click", closeModal));
    btnDeleteHuy.addEventListener("click", closeDeleteModal);
    overlay.addEventListener("click", closeModal);

    tableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-change")) {
            openChangeModal(event.target.closest("tr"));
        }
        if (event.target.classList.contains("btn-delete")) {
            openDeleteModal(event.target.closest("tr"));
        }
    });

    renderTable();
});
document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("test-category");
    const categorys = JSON.parse(localStorage.getItem("categorys")) || [];

    // Xoá trùng lặp danh mục (nếu có nhiều dòng trùng)
    const uniqueCategoryMap = {};
    categorys.forEach(({ category, categoryEmoji }) => {
        uniqueCategoryMap[category] = categoryEmoji;
    });

    for (let cat in uniqueCategoryMap) {
        const option = document.createElement("option");
        option.value = `${uniqueCategoryMap[cat]}${cat}`;
        option.textContent = `${uniqueCategoryMap[cat]} ${cat}`;
        categorySelect.appendChild(option);
    }
});