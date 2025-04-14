// Biến toàn cục từ localStorage

let nextId ;

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("questionTable");
    const overlay = document.getElementById("overlay");
    const addModal = document.getElementById("add-modal");
    const btnAdd = document.getElementById("btn-add");
    const deleteModal = document.getElementById("delete-modal");
    const btnSave = document.getElementById("btn-save");
    const btnConfirmDelete = document.getElementById("btn-confirm-delete");
    const btnClose = document.querySelectorAll(".close-btn");
    const btnHuy = document.querySelectorAll(".btn-huy");
    const btnDeleteHuy = document.getElementById("btn-delete-huy");
    const h = document.getElementById("h");
    const btnSaveQuestion = document.getElementById("btn-save-question");
    const testQuestionInput = document.getElementById("test-question");
    const answerList = document.getElementById("answer-list");
    const addOrEdit = localStorage.getItem("addOrEdit");
    const selectedProduct = localStorage.getItem("selectedProduct");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    let testItem = JSON.parse(localStorage.getItem("testItem")) || [
        { id: 1, questionName: "What is the capital of France?" },
        { id: 2, questionName: "Which planet is known as the Red Planet?" },
    ];
    nextId = testItem.length + 1;
    let productData = null;
    let selectedRow = null;

    // Hàm renderTable được khai báo ngoài nhánh if/else để sử dụng chung
    function renderTable() {
        tableBody.innerHTML = "";
        for (let i = 0; i < productData.question; i++) {
            const questionItem = testItem[i] || { id: i + 1, questionName: "Chưa có câu hỏi" };
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${questionItem.id}</td>
                <td>${questionItem.questionName}</td>
                <td>
                    <button class="btn-change">Sửa</button>
                    <button class="btn-delete">Xóa</button>
                </td>`;
            tableBody.appendChild(row);
        }
    }

    if (addOrEdit === "edit") {
        h.textContent = "Sửa bài test";
        productData = products.find(p => p.productName === selectedProduct);
        if (!productData) {
            console.warn("Không tìm thấy sản phẩm phù hợp:", selectedProduct);
            return;
        }
        document.getElementById("test-name").value = productData.productName || "";
        document.getElementById("test-category").value = productData.category || "";
        document.getElementById("test-time").value = productData.time || "";

        console.log("🟡 Đang sửa bài test:", productData);
        renderTable();
        btnSave.addEventListener("click", function () {
            const name = document.getElementById("test-name").value.trim();
            const categoryValue = document.getElementById("test-category").value;
            const time = document.getElementById("test-time").value;
            // Cập nhật thông tin
            productData.productName = name;
            productData.category = categoryValue;
            productData.time = time;
            const updatedProducts = products.map(p =>
                p.productName === selectedProduct ? productData : p
            );
            localStorage.setItem("products", JSON.stringify(updatedProducts));
        });
    } else {
        h.textContent = "Tạo bài test";
        console.log("🟢 Tạo bài test mới");
        productData = { id: null, productName: "", category: "", question: 0, time: 0 };
    }

    btnSaveQuestion.addEventListener("click", () => {
        const questionText = testQuestionInput.value.trim();
        if (!questionText) {
             showError(testQuestionInput, "Vui lòng nhập câu hỏi!");
            return;
        }
    
        const newQuestion = {
            id: nextId++,
            questionName: questionText,
            answers: Array.from(document.querySelectorAll(".answer-item")).map((item, index) => ({
                id: index + 1,
                text: item.querySelector(".answer-input").value.trim(),
                isCorrect: item.querySelector(".answer-checkbox").checked
            }))
        };
    
        testItem.push(newQuestion);
        localStorage.setItem("testItem", JSON.stringify(testItem));
    
        // Tăng số lượng câu hỏi trong sản phẩm
        if (productData) {
            productData.question = (productData.question || 0) + 1;
            const updatedProducts = products.map(p =>
                p.productName === selectedProduct ? productData : p
            );
            localStorage.setItem("products", JSON.stringify(updatedProducts));
        }
    
        renderTable();
        testQuestionInput.value = "";
        renderAnswerList();
        closeModal();
    });

    function openModal(row = null) {
        selectedRow = row;
        addModal.classList.add("active");
        overlay.classList.add("active");
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
    function renderAnswerList() {
        answerList.innerHTML = "";
        const numAnswers = 4;
        for (let i = 0; i < numAnswers; i++) {
            const answerItem = document.createElement("div");
            answerItem.className = "answer-item";
            answerItem.innerHTML = `
                <div class="checkbox-wrapper">
                    <input type="checkbox" class="answer-checkbox" />
                </div>
                <div class="input-wrapper">
                    <input type="text" placeholder="Nhập câu trả lời" class="answer-input" />
                    <button class="delete-btn" onclick="removeAnswer(this)">
                        <img src="../assets/icons/Trash_Full.png" alt="Xóa">
                    </button>
                </div>`;
            answerList.appendChild(answerItem);
        }
    }

    // Gắn sự kiện cho các nút
    btnAdd.addEventListener("click", () => openModal());
    btnClose.forEach(button => button.addEventListener("click", closeModal));
    btnHuy.forEach(button => button.addEventListener("click", closeModal));
    btnDeleteHuy.addEventListener("click", closeDeleteModal);
    overlay.addEventListener("click", closeModal);

    tableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-change")) {
            openModal(event.target.closest("tr"));
        }
        if (event.target.classList.contains("btn-delete")) {
            openDeleteModal(event.target.closest("tr"));
        }
    });

    renderAnswerList();

    // Gắn danh mục vào select
    const categorySelect = document.getElementById("test-category");
    const categorys = JSON.parse(localStorage.getItem("categorys")) || [];
    const uniqueCategoryMap = {};
    categorys.forEach(({ category, categoryEmoji }) => {
        uniqueCategoryMap[category] = categoryEmoji;
    });
    for (let cat in uniqueCategoryMap) {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = `${uniqueCategoryMap[cat]} ${cat}`;
        categorySelect.appendChild(option);
    }

    // Định nghĩa addAnswer và removeAnswer để sử dụng từ HTML
    document.getElementById("btn-add-answer").addEventListener("click", function () {
        const answerItem = document.createElement("div");
        answerItem.className = "answer-item";
        answerItem.innerHTML = `
            <div class="checkbox-wrapper">
                <input type="checkbox" class="answer-checkbox" />
            </div>
            <div class="input-wrapper">
                <input type="text" placeholder="Nhập câu trả lời" class="answer-input" />
                <button class="delete-btn" onclick="removeAnswer(this)">
                    <img src="../assets/icons/Trash_Full.png" alt="Xóa">
                </button>
            </div>`;
        document.getElementById("answer-list").appendChild(answerItem);
    });
    
    window.removeAnswer = function (button) {
        const answerItem = button.closest(".answer-item");
        if (answerItem) {
            answerItem.remove();
        }
    }
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