async function fetchIPOs() {
  try {
      const response = await fetch("http://localhost:5000/api/upcomingipos");
      const data = await response.json();
      populateTable(data);
  } catch (error) {
      console.error("Error fetching IPOs:", error);
  }
}

function populateTable(ipoData) {
  const table = document.getElementById("ipoTable");
  if (!table) {
      console.error("Table element with id 'ipoTable' not found.");
      return;
  }
  table.innerHTML = "";

  ipoData.forEach((ipo) => {
      let statusClass = ipo.status === "Ongoing" ? "ongoing" : ipo.status === "Upcoming" ? "coming" : "new-listed";
      let row = `
          <tr id="row-${ipo.id}">
          <td>${ipo.company_name}</td>
          <td>${ipo.price_band}</td>
          <td>${ipo.opening_date}</td>
          <td>${ipo.closing_date}</td>
          <td>${ipo.issue_size}</td>
          <td>${ipo.issue_type}</td>
          <td>${ipo.listing_date}</td>
          <td><span class="status ${statusClass}">${ipo.status}</span></td>
          <td>
          <button class="btn btn-primary btn-sm update-btn" data-id="${ipo.id}" data-name="${ipo.company_name}">Update</button>
          </td>
          <td>
          <button class="btn btn-danger btn-sm delete-btn" data-id="${ipo.id}">
              <i class="fas fa-trash-alt"></i>
          </button>
          <button class="btn btn-info btn-sm view-btn" data-id="${ipo.id}">
              <i class="fas fa-eye"></i>
          </button>
          </td>
          </tr>
      `;
      table.innerHTML += row;
  });

  // Add event listeners for dynamically created buttons
  document.querySelectorAll(".update-btn").forEach(button => {
      button.addEventListener("click", () => updateIPO(button.dataset.id, button.dataset.name));
  });

  document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", () => deleteIPO(button.dataset.id));
  });

  document.querySelectorAll(".view-btn").forEach(button => {
      button.addEventListener("click", () => viewIPO(button.dataset.id));
  });
}

async function deleteIPO(ipoId) {
  if (!confirm("Are you sure you want to delete this IPO?")) return;

  try {
      const response = await fetch(`http://localhost:5000/api/iposdlt/${ipoId}`, { method: "DELETE" });

      if (response.ok) {
          alert("IPO deleted successfully!");
          fetchIPOs(); // Fetch updated data to refresh the table
      } else {
          console.error("Failed to delete IPO:", await response.text());
      }
  } catch (error) {
      console.error("Deletion failed:", error);
  }
}

async function updateIPO(ipoId, companyName) {
  const newPrice = prompt(`Enter new price for ${companyName}:`);
  if (!newPrice) return;

  try {
      const response = await fetch(`http://localhost:5000/api/iposupdate/${ipoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price_band: newPrice })
      });

      if (response.ok) {
          alert("IPO updated successfully!");
          fetchIPOs();
      } else {
          console.error("Failed to update IPO:", await response.text());
      }
  } catch (error) {
      console.error("Update failed:", error);
  }
}

async function viewIPO(ipoId) {
  try {
      const response = await fetch(`http://localhost:5000/api/ipos/${ipoId}`);
      const ipo = await response.json();
      alert(`Company: ${ipo.company_name}\nPrice: ${ipo.price_band}\nListing Date: ${ipo.listing_date}`);
  } catch (error) {
      console.error("Error viewing IPO:", error);
  }
}

// Fetch IPOs on page load
document.addEventListener("DOMContentLoaded", fetchIPOs);
