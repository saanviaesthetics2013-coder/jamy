const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

// CHANGE LOGIN DETAILS HERE
const correctUsername = "admin";
const correctPassword = "1234";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === correctUsername && password === correctPassword) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    errorMsg.textContent = "❌ Wrong username or password!";
  }
});
