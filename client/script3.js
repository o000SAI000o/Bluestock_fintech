document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Fetch data from IPO dashboard API
    const response = await fetch("http://localhost:5000/api/ipo-dashboard");
    const data = await response.json();

    console.log("API Response:", data); // Debugging line

    // Extract relevant data safely
    const upcoming = (data?.upcomingIPOs?.length) || 0;
    const newListed = (data?.pastIPOs?.length) || 0;
    const ongoing = (data?.activeIPOs?.length) || 0;

    console.log("Chart Data:", { upcoming, newListed, ongoing }); // Debugging

    // Ensure chart canvas exists
    const chartCanvas = document.getElementById("ipoChart");
    if (!chartCanvas) {
      console.error("Chart canvas element not found!");
      return;
    }

    var ctx = chartCanvas.getContext("2d");

    // Destroy previous chart instance if exists
    if (window.ipoChart instanceof Chart) {
      window.ipoChart.destroy();
    }

    // Create doughnut chart with API data
    window.ipoChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Upcoming", "New Listed", "Ongoing"],
        datasets: [
          {
            data: [upcoming, newListed, ongoing],  // Using API values
            backgroundColor: ["#5A6ACF", "#8593ED", "#C7CEFF"],
          }
        ]
      }
    });

  } catch (error) {
    console.error("Error fetching IPO data:", error);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:5000/api/dashboard");
    const data = await response.json();

    document.querySelector(".circle.large.orange .circle-text").innerHTML = `${data.totalIPO} <br> <small>Total IPO</small>`;
    document.querySelector(".circle.medium.purple .circle-text").innerHTML = `${data.ipoInLoss} <br> <small>IPO in Loss</small>`;
    document.querySelector(".circle.medium.blue .circle-text").innerHTML = `${data.ipoInGain} <br> <small>IPO in Gain</small>`;
  } catch (error) {
    console.error("Error fetching IPO data:", error);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const notificationBell = document.getElementById("notificationBell");
  const notificationBadge = document.getElementById("notificationBadge");
  const notificationDropdown = document.getElementById("notificationDropdown");

  // Fetch notifications from API
  async function fetchNotifications() {
    try {
        const response = await fetch("http://localhost:5000/api/notifications");
        const data = await response.json(); 
        
        console.log("API Response:", data); // Debugging

        // Ensure correct extraction
        const notifications = data.notifications || []; // Fallback if undefined
        
        if (notifications.length > 0) {
            notificationBadge.textContent = notifications.length;
            notificationBadge.classList.remove("d-none");

            // Clear dropdown and add notifications
            notificationDropdown.innerHTML = notifications.map(notif => 
                `<div class="dropdown-item text-wrap">${notif.message}</div><hr>`
            ).join("");

            console.log("Dropdown updated:", notificationDropdown.innerHTML); // Debugging
        } else {
            notificationBadge.classList.add("d-none");
            notificationDropdown.innerHTML = `<p class="text-center text-muted">No new notifications</p>`;
        }
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
}

  // Toggle dropdown on bell click
  notificationBell.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent event bubbling
      notificationDropdown.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
      if (!notificationBell.contains(event.target) && !notificationDropdown.contains(event.target)) {
          notificationDropdown.classList.remove("show");
      }
  });

  // Fetch notifications on page load
  fetchNotifications();

  // Refresh notifications every 30 seconds
  setInterval(fetchNotifications, 30000);
});
document.addEventListener("DOMContentLoaded", function () {
  const subscriptionLink = document.getElementById("subs");

  if (subscriptionLink) {
    subscriptionLink.addEventListener("click", function () {
      // Add a click effect
      subscriptionLink.style.transition = "transform 0.2s ease";
      subscriptionLink.style.transform = "scale(0.95)";

      // Redirect after a short delay to allow the effect to be visible
      setTimeout(() => {
        window.location.href = "IPOSubscription.html";
      }, 200);
    });

    // Reset the effect after the click
    subscriptionLink.addEventListener("transitionend", function () {
      subscriptionLink.style.transform = "scale(1)";
    });
  } else {
    console.error("Element with id 'subs' not found!");
  }
});