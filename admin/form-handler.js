document.addEventListener("DOMContentLoaded", function () {
  // Get references to the form sections in your HTML
  const adminForm = document.getElementById("adminForm");
  const facultyForm = document.getElementById("facultyForm");
  const studentForm = document.getElementById("studentForm");

  // Get the user type dropdown element
  const userTypeDropdown = document.getElementById("userType");
  
  // Get the message element
  const messageElement = document.getElementById("message");

  // Add an event listener to the user type dropdown
  userTypeDropdown.addEventListener("change", function () {
    // Get the selected user type
    const selectedUserType = userTypeDropdown.value;

    // Hide all forms
    adminForm.classList.add("hidden");
    facultyForm.classList.add("hidden");
    studentForm.classList.add("hidden");

    // Show the selected form based on the user type
    if (selectedUserType === "admin") {
      adminForm.classList.remove("hidden");
    } else if (selectedUserType === "faculty") {
      facultyForm.classList.remove("hidden");
    } else if (selectedUserType === "student") {
      studentForm.classList.remove("hidden");
    }
  });
})



