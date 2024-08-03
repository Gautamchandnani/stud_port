// Function to print an achievement
function printAchievement(achievementId) {
    // Get the achievement content based on its ID
    const achievementElement = document.getElementById(achievementId);

    if (!achievementElement) {
        alert('Achievement not found');
        return;
    }

    const achievementContent = achievementElement.textContent;

    // Create a new window for printing
    const printWindow = window.open('', '', 'width=600,height=600');

    // Write the achievement content to the new window
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print Achievement</title></head><body>');
    printWindow.document.write('<h1>Achievement</h1>');
    printWindow.document.write(`<p>${achievementContent}</p>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    // Trigger the print dialog in the new window
    printWindow.print();
    printWindow.close();
}

// Function to view an achievement (you can replace this with your desired behavior)
function viewAchievement(achievementId) {
    // Replace this with your code to display the achievement in a modal or a new page
    alert(`Viewing Achievement: ${achievementId}`);
}
