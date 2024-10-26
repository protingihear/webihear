document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("sign-in-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("text-field-email-address").value;
        const password = document.getElementById("text-field-password").value;

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        
        const user = existingUsers.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Login berhasil! Selamat datang kembali.");
            
            window.location.href = "welcome.html"; 
        } else {
            alert("Email atau password salah. Coba lagi.");
        }
    });
});