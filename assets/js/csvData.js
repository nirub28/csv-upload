document.getElementById('search-input').addEventListener('input', function () {
  var searchTerm = this.value.toLowerCase();
  filterTable(searchTerm);
});

function filterTable(searchTerm) {
  var rows = document.querySelectorAll('.csv-table tbody tr');
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var firstCell = row.querySelector('td:first-child');
    var cellText = firstCell.textContent.toLowerCase();
    var shouldShowRow = cellText.includes(searchTerm);

    row.style.display = shouldShowRow ? '' : 'none';
  }
}

const sortButtons = document.querySelectorAll('.sort-btn');

sortButtons.forEach(button => {
  button.addEventListener('click', function () {
    const column = this.dataset.column;
    const isAscending = this.classList.contains('asc');

    // Remove sorting from all buttons
    sortButtons.forEach(btn => {
      btn.classList.remove('asc', 'desc');
      btn.textContent = '▲';
    });

    if (isAscending) {
      // Ascending button clicked, sort in descending order
      this.classList.add('desc');
      this.textContent = '▼';
      sortTable(column, false);
    } else {
      // Descending button clicked or no sorting applied, sort in ascending order
      this.classList.add('asc');
      this.textContent = '▲';
      sortTable(column, true);
    }
  });
});

function sortTable(column, isAscending) {
  const table = document.querySelector('.csv-table');
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  rows.sort((rowA, rowB) => {
    const cellA = rowA.querySelector(`td[data-column="${column}"]`);
    const cellB = rowB.querySelector(`td[data-column="${column}"]`);

    if (!cellA || !cellB) {
      return 0;
    }

    const valueA = cellA.textContent;
    const valueB = cellB.textContent;

    if (isAscending) {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  rows.forEach(row => {
    tbody.removeChild(row);
  });

  rows.forEach(row => {
    tbody.appendChild(row);
  });
}
