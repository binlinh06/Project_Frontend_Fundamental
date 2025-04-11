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


