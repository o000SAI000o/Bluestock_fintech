document.addEventListener("DOMContentLoaded", async function () {
  const tableBody = document.getElementById("allotmentTable");

  try {
    const response = await fetch("http://localhost:5000/api/ipo-allotments");
    if (!response.ok) throw new Error("Failed to fetch IPO allotment data");

    const data = await response.json();
    tableBody.innerHTML = "";

    data.forEach((item) => {
      const statusClass = {
        Approved: "approved",
        Pending: "pending",
        Rejected: "rejected"
      }[item.status] || "pending";

      const row = `
        <tr>
          <td>${item.application_id}</td>
          <td>${item.investor_name}</td>
          <td>${item.company_name}</td>
          <td>${item.applied_shares}</td>
          <td>${item.allotted_shares}</td>
          <td><span class="status-pill ${statusClass}">${item.status}</span></td>
          <td>${new Date(item.allotted_on).toLocaleString()}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  } catch (error) {
    console.error("Error loading allotments:", error);
    tableBody.innerHTML = `<tr><td colspan="7">Failed to load data. Please try again later.</td></tr>`;
  }
});
