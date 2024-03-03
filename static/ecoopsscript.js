document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('modalOverlay');
    var learnMoreBtn = document.getElementById('learnMoreBtn');
    var closeModalBtn = document.querySelector('closeModalBtn'); // Ensure this selector matches your button
    
    // Function to show the modal
    function showModal() {
        modal.style.display = 'flex';
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Attach event listeners
    learnMoreBtn.addEventListener('click', showModal);
    closeModalBtn.addEventListener('click', closeModal); // Attach listener to your close button
    modal.addEventListener('click', closeModal); // Assuming you want to close the modal when clicking outside

    // Fetch the JSON data from the same directory
    fetch('ot6.json')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Process your data here
            // For example, populate the timeline based on the fetched data
        })
        .catch(error => console.error('Error fetching the JSON file:', error));

    // Optionally, show the modal on page load
    showModal();
});
