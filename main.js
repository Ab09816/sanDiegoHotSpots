let jsonData; // Global variable to store JSON data

$(document).ready(function () {
  // Access JSON through asynchronous function
  $.getJSON("data.json", function (data) {
    jsonData = data; // Store JSON data globally
    // Populate dropdown menu
    populateDropdown(data);
    hotSpots(data);
  })
  .fail(function (error) {
    console.error('Error reading JSON file:', error);
  });

  // Event listener for dropdown change
  $("#category").change(function() {
    hotSpots(jsonData); 
  });
}); 

// Function to populate dropdown menu
function populateDropdown(data) {
  // Clear dropdown before populating it with new options
  const dropdown = $("#category");
  dropdown.empty();
  dropdown.append($("<option>").attr("value", "all").text("All Categories"));

  // Loop through categories in data and populate dropdown
  for (let category in data) {
    dropdown.append($("<option>").attr("value", category).text(category));
  }
}

// Iterate through the top spots and create a table row for each spot.
function hotSpots(data) {
  // Get the selected category from the dropdown menu
  const selectedCategory = $("#category").val();

  // Clear the table before populating it with new data
  const tableBody = $("#tableBody");
  tableBody.empty();

  // Loop through the table data and filter based on the selected category
  for (let category in data) {
    if (selectedCategory === "all" || category === selectedCategory) {
      data[category].forEach(function(item) {
        const row = $("<tr>");
        row.append($("<td>").text(item.name));
        row.append($("<td>").text(item.description));
        const mapUrl = `https://www.google.com/maps?q=${item.location[0]},${item.location[1]}`;
        const link = $("<a>").attr("href", mapUrl).attr("target", "_blank").text("Map Link");
        row.append($("<td>").append(link));
        tableBody.append(row);
      });
    }
  }
};

//Hover Map 
