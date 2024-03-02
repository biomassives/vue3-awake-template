// Sample data structure from the "ot6.json" file
const data = [
    {"theme": "Organic Farming", "goal": "Start an organic vegetable patch in your backyard.", "date": "2025-01-17", "location": "City Park"},
    // Add more items as needed
];

function showModal() {
    document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

window.onload = function() {
    const timeline = document.getElementById('timeline');
    data.forEach(item => {
        if (item.theme === "Organic Farming") {
            const entry = document.createElement('div');
            entry.innerHTML = `<h3>${item.goal}</h3><p>Date: ${item.date} - Location: ${item.location}</p>`;
            timeline.appendChild(entry);
        }
    });
};
