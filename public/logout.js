document.addEventListener("DOMContentLoaded", function () {
    console.log("Logout script loaded"); // Check if this message appears in the console

    const logoutLink = document.getElementById("logout-link");

    if (logoutLink) {
        logoutLink.addEventListener("click", function (e) {
            e.preventDefault();

            // Show a confirmation dialog
            const confirmation = confirm("Do you want to logout?");

            // If the user confirms, redirect to login.html
            if (confirmation) {
                window.location.href = "http://localhost:3000/";
            }
        });
    }
});
