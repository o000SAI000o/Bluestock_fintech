document.getElementById("signup-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    full_name: document.getElementById("full_name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    phone_number: document.getElementById("phone_number").value,
    profile_image: "",
    role: "user"
  };

  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert("User registered successfully!");
      // Try one of the following:
      window.location.assign("index.html");
      // OR window.location.replace("index.html");
      // OR window.open("index.html", "_self");
    } else {
      alert(result.error || "Registration failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Server error occurred");
  }
});
