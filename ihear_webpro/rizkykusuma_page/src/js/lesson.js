document.addEventListener("DOMContentLoaded", function() {
    const navbarHTML = `
        <div class="navbar-brand">
            <img src="../../../navbar_independent/ear 1.png" alt="IHear Logo" class="logo">
            <p class="brand-name">IHear</p>
        </div>
        <ul class="navbar-links">
            <li><a href="#"><span class="icon">🏠</span> Home</a></li>
            <li><a href="#"><span class="icon">🔗</span> Relations</a></li>
            <li><a href="#"><span class="icon">📘</span> Lesson</a></li>
        </ul>
        <div class="navbar-profile">
            <div class="profile-placeholder">A</div>
        </div>
    `;

    // Insert the navbar HTML into the <nav class="navbar"></nav>
    document.querySelector(".navbar").innerHTML = navbarHTML;
});
