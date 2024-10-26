document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("sign-up-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const email = document.getElementById("text-field-email-address").value;
        const password = document.getElementById("text-field-password").value;

        if (email === "" || password === "") {
            alert("Email dan Password tidak boleh kosong!");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const isEmailExist = users.some(user => user.email === email);
        if (isEmailExist) {
            alert("Email sudah terdaftar, gunakan email lain.");
            return;
        }

        users.push({ email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Akun berhasil dibuat! Silakan login.");
        window.location.href = "signIn.html";
    });
});