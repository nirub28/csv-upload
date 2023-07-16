document.getElementById('search-input').addEventListener('input', function () {
    var searchTerm = this.value.toLowerCase();
    filterTable(searchTerm);
  });
  
  function filterTable(searchTerm) {
    var rows = document.querySelectorAll('.csv-table tbody tr');
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var cells = row.querySelectorAll('td');
      var shouldShowRow = false;
  
      for (var j = 0; j < cells.length; j++) {
        var cell = cells[j];
        var cellText = cell.textContent.toLowerCase();
        if (cellText.includes(searchTerm)) {
          shouldShowRow = true;
          break;
        }
      }
  
      row.style.display = shouldShowRow ? '' : 'none';
    }
  }
  