var rowsPerPage = 100; // Number of rows to display per page
var currentPage = 1; // Current page

function updateTable() {
  var startIndex = (currentPage - 1) * rowsPerPage;
  var endIndex = startIndex + rowsPerPage;

  var rows = document.querySelectorAll('.csv-table tbody tr');
  var totalRows = rows.length;

  rows.forEach(function(row, index) {
    if (index >= startIndex && index < endIndex) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });

  createPagination(totalRows);
}

function createPagination(totalRows) {
  var totalPages = Math.ceil(totalRows / rowsPerPage);
  var pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  var paginationContainer = document.createElement('div');
  paginationContainer.classList.add('pagination-container');

  var pagesText = document.createElement('span');
  pagesText.textContent = 'Pages:';
  paginationContainer.appendChild(pagesText);

  for (var i = 1; i <= totalPages; i++) {
    var pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.textContent = i;
    pageLink.classList.add('page-link');

    if (i === currentPage) {
      pageLink.classList.add('active');
    }

    pageLink.addEventListener('click', function(e) {
      e.preventDefault();
      currentPage = parseInt(this.textContent);
      updateTable();
    });

    paginationContainer.appendChild(pageLink);
  }

  pagination.appendChild(paginationContainer);
}


document.getElementById('search-input').addEventListener('input', function () {
  var searchTerm = this.value.toLowerCase();
  filterTable(searchTerm);
});

function filterTable(searchTerm) {
  var rows = document.querySelectorAll('.csv-table tbody tr');
  var totalRows = rows.length;

  rows.forEach(function(row) {
    var firstCell = row.querySelector('td:first-child');
    var cellText = firstCell.textContent.toLowerCase();
    var shouldShowRow = cellText.includes(searchTerm);

    row.style.display = shouldShowRow ? '' : 'none';
  });

  createPagination(totalRows);
}

const sortButtons = document.querySelectorAll('.sort-btn');

sortButtons.forEach(button => {
  button.addEventListener('click', function () {
    const column = this.dataset.column;
    const isAscending = this.classList.contains('asc');

    sortButtons.forEach(btn => {
      btn.classList.remove('asc', 'desc');
      btn.textContent = '▲';
    });

    if (isAscending) {
      this.classList.add('desc');
      this.textContent = '▼';
      sortTable(column, false);
    } else {
      this.classList.add('asc');
      this.textContent = '▲';
      sortTable(column, true);
    }

    updateTable();
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

// Initial table setup
updateTable();
