document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    let isValid = true;

    // Lấy dữ liệu từ form
    let fullName = document.getElementById("fullName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");

    // Hàm kiểm tra email hợp lệ
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Kiểm tra họ và tên
    if (fullName.value.trim() === "") {
        showError(fullName, "Vui lòng nhập họ và tên");
        isValid = false;
    } else {
        hideError(fullName);
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

    // Kiểm tra xác nhận mật khẩu
    if (confirmPassword.value !== password.value || confirmPassword.value === "") {
        showError(confirmPassword, "Mật khẩu không khớp");
        isValid = false;
    } else {
        hideError(confirmPassword);
    }

    // Nếu form hợp lệ, có thể submit
    if (isValid) {
        alert("Đăng ký thành công!");
        // Ở đây có thể gửi form đi bằng AJAX hoặc submit thực sự
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
