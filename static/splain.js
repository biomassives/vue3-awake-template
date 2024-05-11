// Your issuesData variable declaration

const issuesSphere = document.getElementById("issuesSphere");
const infoBox = document.getElementById("info-box");
const loadingScreen = document.getElementById("loading-screen");
const accessKey = "qAG7N9e7yM1tY3n5CAmSPCeSBuEDDujF7Uway1dIH5w"; // Your Unsplash access key

const radius = 200;
const hexagonSize = 100;

// Function to convert 2D to 3D coordinates (120-degree sphere section)
function hexToSphereCoords(col, row) {
    const angleX = ((col / 6) * 2 - 1) * Math.PI / 3;
    const angleY = (row / 4 - 0.5) * Math.PI;
    const x = radius * Math.sin(angleY) * Math.cos(angleX);
    const y = radius * Math.cos(angleY);
    const z = radius * Math.sin(angleY) * Math.sin(angleX);
    return { x, y, z, angleX, angleY };
}

// Fetch image from Unsplash
async function fetchImage(query) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${accessKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results[0]?.urls?.regular || 'path/to/default/image.jpg';
    } catch (error) {
        console.error('Error fetching image:', error);
        return 'path/to/error/image.jpg'; 
    }
}


// Function to check in metadata with NFT.storage (replace with your actual implementation)
async function checkInMetadata(issueData) {
    // ... Your NFT.storage integration logic here ...
    console.log(`Checked in metadata for: ${issueData.info}`);
}

// Function to create issue elements
async function createIssueElements() {
    let currentActiveIssue = null;
    let col = 0, row = 0;
    for (const issue in issuesData) {
        issueElement = document.createElement('div');
        issueContent = document.createElement('div');
        issueElement.classList.add('issue');
        issueContent.classList.add('issue-content');
        issueContent.textContent = issue;
        issueElement.appendChild(issueContent);
        issuesSphere.appendChild(issueElement);

        // Fetch and set background image with loading state
        issueElement.classList.add('loading');
        const imageUrl = await fetchImage(issue);
        issuesData[issue].imageUrl = imageUrl; 
        

        issueElement.addEventListener('mouseover', async () => {
            if (currentActiveIssue) {
                currentActiveIssue.classList.remove('active');
                currentActiveIssue.style.backgroundImage = ""; 
            }
            issueElement.classList.add('active');
            currentActiveIssue = issueElement;
            issueElement.style.backgroundImage = `url(${imageUrl})`; 
            const issueData = issuesData[issue];
            infoBox.innerHTML = `<i class="${issueData.icon} mr-2"></i> ${issueData.info}`;
            infoBox.classList.remove('hidden');

            // Check in metadata when hovered
            await checkInMetadata(issueData);
        });

        issueElement.addEventListener('mouseout', () => {
            infoBox.classList.add('hidden');
        });
            
        // Position on 120-degree sphere section AFTER image is fetched
        ({ x, y, z, angleX, angleY } = hexToSphereCoords(col, row)); 
        issueElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${angleX}rad) rotateX(${-angleY}rad)`;
        issueElement.style.transition = 'background-image 0.5s ease';
        issueElement.classList.remove('loading');
        col++;
        if (col >= 6) {
            col = 0;
            row++;
        }
    }
    loadingScreen.classList.add('hidden');
}

createIssueElements(); // Start creating elements
