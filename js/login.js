document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    let isValid = true;

    // Lấy dữ liệu từ form
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    // Hàm kiểm tra email hợp lệ
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Kiểm tra email
    if (!isValidEmail(email.value)) {
        showError(email, "Email không hợp lệ");
        isValid = false;
    } else {
        hideError(email);
    }

    // Kiểm tra mật khẩu
    if (password.value.length < 6) {
        showError(password, "Mật khẩu ít nhất 6 ký tự");
        isValid = false;
    } else {
        hideError(password);
    }

    // Nếu form hợp lệ, thực hiện đăng nhập
    if (isValid) {
        alert("Đăng nhập thành công!");
    }
});

// Hiển thị lỗi
function showError(input, message) {
    let errorElement = input.nextElementSibling;
    errorElement.innerText = message;
    errorElement.style.display = "block";
    input.classList.add("error");
}

// Ẩn lỗi
function hideError(input) {
    let errorElement = input.nextElementSibling;
    errorElement.style.display = "none";
    input.classList.remove("error");
}
