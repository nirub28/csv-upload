var rowsPerPage = 100; // Number of rows to display per page
var currentPage = 1; // Current page

// Function to update the table based on the current page
function updateTable() {
  var startIndex = (currentPage - 1) * rowsPerPage;
  var endIndex = startIndex + rowsPerPage;

  var rows = document.querySelectorAll(".csv-table tbody tr");
  var totalRows = rows.length;

  // Show or hide rows based on the current page
  rows.forEach(function (row, index) {
    if (index >= startIndex && index < endIndex) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  // Create pagination based on the total number of rows
  createPagination(totalRows);
}

// Function to create the pagination buttons
function createPagination(totalRows) {
  var totalPages = Math.ceil(totalRows / rowsPerPage);
  var pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  var paginationContainer = document.createElement("div");
  paginationContainer.classList.add("pagination-container");

  var pagesText = document.createElement("span");
  pagesText.textContent = "Pages:";
  paginationContainer.appendChild(pagesText);

  // Create a button for each page
  for (var i = 1; i <= totalPages; i++) {
    var pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.classList.add("page-link");

    if (i === currentPage) {
      pageLink.classList.add("active");
    }

    // Update the current page and table when a page is clicked
    pageLink.addEventListener("click", function (e) {
      e.preventDefault();
      currentPage = parseInt(this.textContent);
      updateTable();
    });

    paginationContainer.appendChild(pageLink);
  }

  pagination.appendChild(paginationContainer);
}

// Event listener for the search input
document.getElementById("search-input").addEventListener("input", function () {
  var searchTerm = this.value.toLowerCase();
  filterTable(searchTerm);
});

// Function to filter the table based on the search term
function filterTable(searchTerm) {
  var rows = document.querySelectorAll(".csv-table tbody tr");
  var totalRows = rows.length;

  // Show or hide rows based on the search term
  rows.forEach(function (row) {
    var firstCell = row.querySelector("td:first-child");
    var cellText = firstCell.textContent.toLowerCase();
    var shouldShowRow = cellText.includes(searchTerm);

    row.style.display = shouldShowRow ? "" : "none";
  });

  // Update the pagination based on the filtered rows
  createPagination(totalRows);
}

// Event listeners for the sort buttons
const sortButtons = document.querySelectorAll(".sort-btn");

sortButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const column = this.dataset.column;
    const isAscending = this.classList.contains("asc");

    // Remove sorting classes and update the sort button text
    sortButtons.forEach((btn) => {
      btn.classList.remove("asc", "desc");
      btn.textContent = "▲";
    });

    if (isAscending) {
      this.classList.add("desc");
      this.textContent = "▼";
      sortTable(column, false);
    } else {
      this.classList.add("asc");
      this.textContent = "▲";
      sortTable(column, true);
    }

    // Update the table after sorting
    updateTable();
  });
});

// Function to sort the table based on a column
function sortTable(column, isAscending) {
  const table = document.querySelector(".csv-table");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  // Sort the rows based on the column value
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

  // Remove current rows from the table
  rows.forEach((row) => {
    tbody.removeChild(row);
  });

  // Add sorted rows back to the table
  rows.forEach((row) => {
    tbody.appendChild(row);
  });
}

// Initial table setup
updateTable();
