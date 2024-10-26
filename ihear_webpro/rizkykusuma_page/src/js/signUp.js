document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("sign-up-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Cegah refresh halaman

        const email = document.getElementById("text-field-email-address").value;
        const password = document.getElementById("text-field-password").value;

        if (email === "" || password === "") {
            alert("Email dan Password tidak boleh kosong!");
            return;
        }

        try {
            const response = await fetch("../../src/js/authentication.json");
            const users = await response.json();

            const isEmailExist = users.some(user => user.email === email);
            if (isEmailExist) {
                alert("Email sudah terdaftar, gunakan email lain.");
                return;
            }

            users.push({ email, password });

            localStorage.setItem("users", JSON.stringify(users));

            alert("Akun berhasil dibuat! Silakan login.");
            window.location.href = "signIn.html";
        } catch (error) {
            console.error("Gagal membaca data:", error);
            alert("Terjadi kesalahan, coba lagi.");
        }
    });
});
