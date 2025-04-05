document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:5000/api/upcomingipos"); // Fetch data from backend
        const ipos = await response.json();

        const container = document.querySelector(".row"); // Use querySelector for Bootstrap grid container
        if (!container) {
            console.error("Error: '.row' container not found in the HTML.");
            return;
        }
        container.innerHTML = ""; // Clear previous content

        ipos.forEach((ipo) => {
            // Create Bootstrap grid column
            const card = document.createElement("div");
            card.classList.add("col-md-4", "mb-4"); // Ensures 3 cards per row (Bootstrap)

            // Create card container
            const cardInner = document.createElement("div");
            cardInner.classList.add("card", "shadow-sm", "p-3");
            cardInner.style.cursor = "pointer"; // Indicate clickable behavior

            // Redirect when clicking the card
            cardInner.addEventListener("click", function () {
                window.location.href = `ipo-details.html?id=${ipo.id}`;
            });

            // Create company logo image
            const img = document.createElement("img");
            img.src = ipo.company_logo_url; // Fetch from ImgDB
            img.alt = ipo.company_name;
            img.classList.add("company-logo", "card-img-top");

            // Create card body
            const content = document.createElement("div");
            content.classList.add("card-body");

            // Insert IPO details
            content.innerHTML = `
                <h5 class="card-title"><b>${ipo.company_name}</b></h5>
                <p class="card-text"><strong>Price Band:</strong> ${ipo.price_band}</p>
                <p class="card-text"><strong>Issue Size:</strong> ${ipo.issue_size}</p>
                <p class="card-text"><strong>Listing Date:</strong> ${new Date(ipo.listing_date).toLocaleDateString()}</p>
                <p class="card-text"><strong>Opening Date:</strong> ${new Date(ipo.opening_date).toLocaleDateString()}</p>
                <p class="card-text"><strong>Closing Date:</strong> ${new Date(ipo.closing_date).toLocaleDateString()}</p>
                <p class="card-text"><strong>Issue Type:</strong> ${ipo.issue_type}</p>
                <p class="card-text"><strong>Status:</strong> <span class="status ${ipo.status.toLowerCase()}">${ipo.status}</span></p>
            `;

            // Append elements
            cardInner.appendChild(img);
            cardInner.appendChild(content);
            card.appendChild(cardInner);
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching IPO data:", error);
    }
});
