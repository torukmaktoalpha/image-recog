async function handleImageUpload(event) {
    const file = event.target.files[0];
  
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('image', file);
  
    // Send the image to Imagga for tagging
    const response = await fetch('https://api.imagga.com/v2/tags', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa('acc_8cad41ebc864398:99593582915e8eb93fbf22e2eadbd5fd')
      },
      body: formData
    });
  
    if (response.ok) {
      const data = await response.json();
      const highestConfidenceTag = getHighestConfidenceTag(data.result.tags);
      displayTag(highestConfidenceTag);
    } else {
      console.error('Error:', response.status);
    }
  }
  
  function getHighestConfidenceTag(tags) {
    let highestConfidenceTag = null;
    let highestConfidence = 0;
  
    for (const tag of tags) {
      if (tag.confidence > highestConfidence) {
        highestConfidence = tag.confidence;
        highestConfidenceTag = tag;
      }
    }
  
    return highestConfidenceTag;
  }
  
  function displayTag(tag) {
    const tagsContainer = document.getElementById('tags');
    tagsContainer.innerHTML = '';
  
    if (tag) {
      const tagElement = document.createElement('span');
      tagElement.textContent = tag.tag.en;
      tagElement.classList.add('tag');
      tagsContainer.appendChild(tagElement);
    }
  }
  