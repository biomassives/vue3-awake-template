document.addEventListener('DOMContentLoaded', function() {
    // Initialize wow.js
    new WOW().init();

    // Logic to generate the timeline based on the JSON data
    const data = /* JSON data loaded here */;
    const timeline = document.querySelector('.timeline');

    data.forEach(item => {
        if(item.theme === "Organic Farming") {
            // Create and append timeline entry elements
            const entry = document.createElement('div');
            entry.className = 'wow fadeInUp';
            entry.innerHTML = `<h3>${item.goal}</h3><p>${item.date} - ${item.location}</p>`;
            timeline.appendChild(entry);
        }
    });

    // Popup overlay logic
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.innerHTML = `
        <p>Welcome to the Eco Ops Portal. This data is simulated and serves to calibrate how we collect and share information about sustainable community development initiatives, specifically under the eco ops project of SCD Hub, a USA 501(c)(3) not-for-profit organization dedicated to sustainable community development.</p>
    `;
});
