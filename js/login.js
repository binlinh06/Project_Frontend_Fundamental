const users = [
    { id: 1, fullName: "admin", email: "admin@gmail.com", password: "admin123", role: "admin" },
];

// Lưu user mẫu nếu chưa có trong localStorage
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
}

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;

    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");

    let email = emailInput.value.trim();
    let password = passwordInput.value;

    // Kiểm tra định dạng email
    if (!isValidEmail(email)) {
        showError(emailInput, "Email không hợp lệ");
        isValid = false;
    } else {
        hideError(emailInput);
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 8) {
        showError(passwordInput, "Mật khẩu ít nhất 8 ký tự");
        isValid = false;
    } else {
        hideError(passwordInput);
    }

    if (!isValid) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        if (user.role === "admin") {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "WELLCOME BOSS!",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Đăng nhập thành công!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        setTimeout(() => {
            if (user.role === "admin") {
                window.location.href = "category-manager.html";
            } else {
                window.location.href = "dashboard.html";
            }
        }, 1500);
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email hoặc mật khẩu không đúng!"
        });
    }
});

// Hàm kiểm tra định dạng email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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
