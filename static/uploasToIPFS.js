function createThumbnail(file, container) {
    const reader = new FileReader();

    reader.onload = function(e) {
        // Remove EXIF data or manipulate the image as needed for privacy
        EXIF.getData(e.target.result, function() {
            // This function can modify the image data to remove EXIF
            // For demonstration, we're not modifying the image data here

            const img = document.createElement('img');
            img.className = 'thumbnail';
            img.src = this.src; // Assuming the EXIF manipulation does not change the source
            container.appendChild(img);
        });
    };

    reader.readAsDataURL(file);
}

function compileAndUploadMetadata(files) {
    const metadata = files.map((file, index) => {
        return {
            name: file.name,
            type: file.type,
            order: index + 1, // Assuming the order is based on the user's arrangement
            // Include any other relevant metadata here
        };
    });

    const metadataFile = new Blob([JSON.stringify(metadata)], {type: 'application/json'});

    // Upload the metadata file to IPFS
    uploadToIPFS(metadataFile).then(hash => {
        console.log(`Metadata IPFS Hash: ${hash}`);
        // You might want to display this hash or use it in further processing
    }).catch(error => {
        console.error('Error uploading metadata to IPFS:', error);
    });
}





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

