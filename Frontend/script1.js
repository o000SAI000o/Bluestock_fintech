document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const togglePassword = document.querySelector(".fa-eye");
    const loginForm = document.getElementById("login-form");
    const captchaCheckbox = document.getElementById("not-a-robot"); // Fixed ID

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePassword.classList.replace("fa-eye-slash","fa-eye");
            } else {
                passwordInput.type = "password";
                togglePassword.classList.replace("fa-eye","fa-eye-slash");
            }
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission

            if (!captchaCheckbox.checked) {
                alert("Please complete the CAPTCHA.");
                return;
            }

            const email = document.getElementById("email").value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                alert("Email and password are required.");
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) {
                    throw new Error('Login failed');
                }

                const data = await response.json();
                sessionStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                window.location.href = "IPOAdminDashboard.html";
            } catch (error) {
                console.error("Error:", error);
                alert("Server error, please try again later.");
            }
        });
    }
});