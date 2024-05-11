const issuesData = {
  "toxic algal blooms": { info: "Excessive nutrients cause rapid algae growth, depleting oxygen and harming marine life.", icon: "fas fa-biohazard" },
  "storminess": { info: "Increased frequency and intensity of storms due to climate change, causing damage and flooding.", icon: "fas fa-cloud-showers-heavy" },
  // Add more issues here...
};

const issuesSphere = document.getElementById('issuesSphere');
const infoBox = document.getElementById('info-box');
const loadingScreen = document.getElementById('loading-screen');
const accessKey = 'YOUR_ACCESS_KEY';

// Sphere properties
const radius = 200;
const hexagonSize = 150;

let issueElement, issueContent, currentActiveIssue = null;

// Helper function for 3D coordinates (120-degree sphere section)
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

// Check in metadata with NFT.Storage (replace with actual implementation)
async function checkInMetadata(issueData) {
  // ... (Your implementation to send issueData to NFT.Storage) ...
  console.log(`Checked in metadata for: ${issueData.info}`);
}

let col = 0, row = 0;
async function createIssueElements() {
  for (const issue in issuesData) {
    // ... (create issueElement and issueContent) ...

    // Fetch and set background image with loading state
issueElement.classList.add('loading');
    const imageUrl = await fetchImage(issue);
    issuesData[issue].imageUrl = imageUrl; 

    issueElement.addEventListener('mouseover', () => {
      if (currentActiveIssue) {
        currentActiveIssue.classList.remove('active');
        currentActiveIssue.style.backgroundImage = ""; // clear previous image 
      }
      issueElement.classList.add('active');
      currentActiveIssue = issueElement;
      issueElement.style.backgroundImage = `url(${imageUrl})`;  
      const issueData = issuesData[issue];
      infoBox.innerHTML = `<i class="${issueData.icon} mr-2"></i> ${issueData.info}`;
      infoBox.classList.remove('hidden');

      // Check in metadata when hovered
      checkInMetadata(issueData);
    });

    issueElement.addEventListener('mouseout', () => {
      infoBox.classList.add('hidden');
    });

    // Position on 120-degree sphere section AFTER image is fetched
    ({ x, y, z, angleX, angleY } = hexToSphereCoords(col, row)); 
    issueElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${angleX}rad) rotateX(${-angleY}rad)`;
    issueElement.style.transition = 'background-image 0.5s ease';
    issueElement.classList.remove('loading');

    issuesSphere.appendChild(issueElement); // Append after positioning

    col++;
    if (col >= 6) {
      col = 0;
      row++;
    }
  }
  loadingScreen.classList.add('hidden');
}

createIssueElements();
