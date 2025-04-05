document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const togglePassword = document.querySelector(".toggle-password");

  togglePassword.addEventListener("click", function () {
      if (passwordInput.type === "password") {
          passwordInput.type = "text";
      } else {
          passwordInput.type = "password";
      }
  });

  document.getElementById("signin-form").addEventListener("submit", function (event) {
      event.preventDefault();
      alert("SignUp successful (Mockup)");
  });
});
