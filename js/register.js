const users = [
    { id:1,fullName:"admin", email: "admin@gmail.com", password: "admin123", role: "admin" },
];

// Lưu user mẫu nếu chưa có trong localStorage
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
}
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
    if (password.value.length < 8) {
        showError(password, "Mật khẩu ít nhất 8 ký tự");
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
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const emailExists = users.some(user => user.email === email.value);
        if (emailExists) {
            showError(email, "Email đã được đăng ký");
            return;
        }

        const newUser = {
            id: users.length + 1,
            fullName : fullName.value,
            email : email.value,
            password: password.value,
            role: "user" // Mặc định là user
        }

        users.push(newUser)
        localStorage.setItem("users",JSON.stringify(users))
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Đăng ký thành công!",
            showConfirmButton: false,
            timer: 1500
        });

        // Chờ 1.5 giây rồi chuyển trang
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
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
