// // Fetch the updated file list
// fetch('/files')
//   .then(response => response.json())
//   .then(files => {
//     console.log('files can be viewed', files);
//     const fileList = document.getElementById('file-list');
//     fileList.innerHTML = ''; // Clear the existing file list

//     files.forEach(file => {
//       const listItem = document.createElement('li');
//       listItem.textContent = file;
//       fileList.appendChild(listItem);
//     });
//   })
//   .catch(error => {
//     console.error('Error retrieving file list:', error);
//   });
