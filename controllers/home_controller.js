const fs = require('fs');
const path = require('path');

module.exports.home = function (req, res) {
  const filesDirectory = path.join(__dirname, '../assets/files');
  fs.readdir(filesDirectory, (err, files) => {
    if (err) {
      console.error('Error reading files:', err);
      return res.status(500).json({ error: 'Failed to retrieve files' });
    }
    res.render('home', { title: 'Home', files: files });
  });
};
