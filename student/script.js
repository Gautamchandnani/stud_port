// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Move your script code inside this block
    const achievementsList = document.getElementById('achievements-list');

    function deleteAchievement(event) {
        const listItem = event.target.parentElement;
        listItem.remove();
    }

    function addNewAchievement() {
        const newAchievement = document.createElement('li');
        newAchievement.innerHTML = `
            <img src="achieve.jpg" alt="New Achievement">
            <h3>New Achievement</h3><br>
            <input type="file" accept=".pdf, .doc, .docx" name="achievement_documents">
            <button class="delete-achievement">Delete</button>
        `;
        achievementsList.appendChild(newAchievement);

        // Add event listener for the new "Delete" button within newAchievement
        const deleteButton = newAchievement.querySelector('.delete-achievement');
        deleteButton.addEventListener('click', deleteAchievement);
    }

    // Add event listener for the "Add Achievement" button
    const addAchievementButton = document.getElementById('add-achievement');
    if (addAchievementButton) {
        addAchievementButton.addEventListener('click', addNewAchievement);
    }
});
