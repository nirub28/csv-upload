const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');


exports.getData = function (req, res) {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../assets/files', filename);
  
    const results = [];
    let headers = []; // Array to store the column headers
  
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('headers', (headerList) => {
        headers = headerList; // Store the column headers
      })
      .on('data', (data) => {      
        results.push(data);
      })
      .on('end', () => {
        res.render('csvData', { title: 'CSV Data', filename: filename, headers: headers, data: results });
      });
  };
  