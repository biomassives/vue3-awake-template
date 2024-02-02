async function uploadFiles() {
    const file1 = document.getElementById('fileInput1').files[0];
    const file2 = document.getElementById('fileInput2').files[0];

    if (!file1 || !file2) {
        alert('Please select two files.');
        return;
    }

    // Example using a fictional IPFS upload function
    try {
        const hash1 = await uploadToIPFS(file1); // You'll need to implement this function
        const hash2 = await uploadToIPFS(file2); // You'll need to implement this function

        console.log(`File 1 IPFS Hash: ${hash1}`);
        console.log(`File 2 IPFS Hash: ${hash2}`);
        // You might want to display these hashes on the page or proceed with other actions
    } catch (error) {
        console.error('Error uploading files to IPFS:', error);
        alert('Failed to upload files to IPFS.');
    }
}

async function uploadToIPFS(file) {
    const formData = new FormData();
    formData.append('file', file);

    // Replace 'ipfs_api_endpoint' with your actual IPFS upload endpoint
    const response = await fetch('ipfs_api_endpoint', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload to IPFS');
    }

    const data = await response.json();
    return data.hash; // Assuming the API responds with a JSON object containing the file hash
}

