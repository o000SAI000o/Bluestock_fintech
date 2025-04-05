document.addEventListener("DOMContentLoaded", function() {
    // Navigation Links
    document.querySelector(".products").addEventListener("click", () => window.open("products.html", "_blank"));
    document.querySelector(".community").addEventListener("click", () => window.open("community.html", "_blank"));
    document.querySelector(".media").addEventListener("click", () => window.open("media.html", "_blank"));
    document.querySelector(".support").addEventListener("click", () => window.open("support.html", "_blank"));
    document.querySelector(".live-news").addEventListener("click", () => window.open("livenews.html", "_blank"));

    // Sign In & Sign Up Redirects
    document.querySelector(".sign-in").addEventListener("click", () => window.open("signin.html", "_blank"));
    document.querySelector(".sign-up-now").addEventListener("click", () => window.open("signup.html", "_blank"));

    // Early Access Mobile Number
    document.querySelector(".send").addEventListener("click", () => {
        let mobileNumber = document.querySelector("#mobile-number").value;
        if (mobileNumber) {
            fetch("/save-number", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ number: mobileNumber })
            })
            .then(response => response.json())
            .then(data => alert("Thank you! You will receive updates via text message."))
            .catch(error => console.error("Error:", error));
        } else {
            alert("Please enter a valid mobile number.");
        }
    });

    // Shark Investor Navigation
    document.querySelector(".shark-investor-circle").addEventListener("click", () => {
        window.open("shark-investors.html", "_blank");
    });

    // Analytics Navigation
    document.querySelector(".text-3c").addEventListener("click", () => window.open("analytics.html", "_blank"));
    document.querySelector(".pic-11").addEventListener("click", () => window.open("analytics.html", "_blank"));

    // Blog Navigation
    document.querySelector(".text-3d").addEventListener("click", () => window.open("blog.html", "_blank"));
    document.querySelector(".pic-12").addEventListener("click", () => window.open("blog.html", "_blank"));

    // Videos Navigation
    document.querySelector(".text-3e").addEventListener("click", () => window.open("videos.html", "_blank"));
    document.querySelector(".img-c").addEventListener("click", () => window.open("videos.html", "_blank"));

    // Google Play Store Link
    document.querySelector(".google-play-download-bar").addEventListener("click", () => {
        window.open("https://play.google.com/store/apps/details?id=in.bluestock.app", "_blank");
    });

    // App Store Link
    document.querySelector(".app-store-download-bar").addEventListener("click", () => {
        window.open("https://apps.apple.com/in/app/bluestock-infotech/id6448481340", "_blank");
    });

    // Wait until the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // Attach click event listener to the rating stars container
    const ratingStars = document.getElementById("ratingStars");
  
    ratingStars.addEventListener("click", function() {
      // Use fetch to get the latest ratings from your server
      fetch("fetch_ratings.php")  // Replace with your API endpoint URL
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          // Update the rating text using data from the server
          document.getElementById("ratingText").innerText =
            `(${data.rating}/5 by ${data.users} users)`;
  
          // Optionally, you can update other elements or show additional details
          // document.getElementById("userRating").innerText = data.someOtherDetail;
        })
        .catch(error => {
          console.error("Error fetching ratings:", error);
        });
    });
  });
  
document.addEventListener("DOMContentLoaded", function() {
  // 1. FETCH FEEDBACK FROM DATABASE (example with a "get_feedback.php" endpoint)
  fetch("get_feedback.php")
    .then(response => response.json())
    .then(data => {
      // data = array of feedback objects, e.g.:
      // [
      //   { username: "Sarthak", feedback: "Bluestock app provides..." },
      //   { username: "Sakshi",  feedback: "BlueStock for chart learning..." },
      //   { username: "Venkatesh", feedback: "Excellent app with a fantastic UI!..." }
      // ]
      data.forEach(item => {
        // Convert username to lowercase to match the existing IDs (sarthak, sakshi, venkatesh)
        const userId = item.username.toLowerCase();
        const userDiv = document.getElementById(userId);
        if (userDiv) {
          // Find the text spans inside that div
          const spans = userDiv.querySelectorAll("span");
          spans.forEach(span => {
            // If it's the name span, show username; otherwise, show feedback
            if (
              span.classList.contains("sarthak-4d") ||
              span.classList.contains("sakshi-51") ||
              span.classList.contains("venkatesh-53")
            ) {
              span.textContent = item.username;
            } else {
              span.textContent = item.feedback;
            }
          });
        }
      });
    })
    .catch(error => console.error("Error fetching feedback:", error));

  // 2. MAKE ARROWS MOVE (Simple horizontal slide)
  let currentIndex = 0; // current "slide"
  const totalSlides = 3; // we have 3 feedback divs
  const container = document.getElementById("feedbackContainer");
  const leftArrow = document.getElementById("leftArrow");
  const rightArrow = document.getElementById("rightArrow");

  leftArrow.addEventListener("click", function() {
    if (currentIndex > 0) {
      currentIndex--;
      container.style.transform = `translateX(-${currentIndex * 300}px)`;
      container.style.transition = "transform 0.4s ease";
    }
  });

  rightArrow.addEventListener("click", function() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      container.style.transform = `translateX(-${currentIndex * 300}px)`;
      container.style.transition = "transform 0.4s ease";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const container = document.getElementById("feedbackContainer");
    const reviews = container.children;
    const totalSlides = reviews.length;
    const leftArrow = document.getElementById("leftArrow");
    const rightArrow = document.getElementById("rightArrow");
  
    // Assumes each review has the same fixed width; adjust 300 if needed.
    const slideWidth = 300;
  
    leftArrow.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex--;
        container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        container.style.transition = "transform 0.4s ease";
      }
    });
  
    rightArrow.addEventListener("click", function () {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
        container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        container.style.transition = "transform 0.4s ease";
      }
    });
  });
  

  document.addEventListener("DOMContentLoaded", function () {
    // Select the view-all elements and the container holding the rows
    const viewAllWeekHigh = document.querySelector('.view-all-week-high');
    const viewAllGainers = document.querySelector('.view-all-gainers');
    const dataContainer = document.querySelector('.texts-af'); // container holding the data rows
  
    // Handler for 52 Week High
    viewAllWeekHigh.addEventListener('click', function () {
      fetch('getWeekHigh.php')
        .then(response => response.json())
        .then(data => {
          let html = "";
          // Build HTML with your same format (company, price, day high)
          data.forEach(item => {
            html += `<div class="text-row">
                      <span class="company">${item.company}</span>
                      <span class="price">${item.price}</span>
                      <span class="day-high">${item.dayHigh}</span>
                    </div>`;
          });
          dataContainer.innerHTML = html;
        })
        .catch(error => console.error('Error fetching Week High data:', error));
    });
  
    // Handler for Gainers (52 Week Low)
    viewAllGainers.addEventListener('click', function () {
      fetch('getGainers.php')
        .then(response => response.json())
        .then(data => {
          let html = "";
          // Build HTML with your same format (company, price, change)
          data.forEach(item => {
            html += `<div class="text-row">
                      <span class="company">${item.company}</span>
                      <span class="price">${item.price}</span>
                      <span class="change">${item.change}</span>
                    </div>`;
          });
          dataContainer.innerHTML = html;
        })
        .catch(error => console.error('Error fetching Gainers data:', error));
    });
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    var angelOne = document.querySelector('.angel-one');
    var zerodha = document.querySelector('.zerodha');
  
    angelOne.addEventListener("click", function() {
      window.location.href = "angel-one-policies.html"; // Update URL as needed
    });
    
    zerodha.addEventListener("click", function() {
      window.location.href = "zerodha-policies.html"; // Update URL as needed
    });
  });

});


//CAREER
document.addEventListener('DOMContentLoaded', () => {
  // Select all relevant links that should open in a new tab
  const newTabLinks = document.querySelectorAll(
    '.nav-link, .sign-in-link, .sign-up-button, .breadcrumb-home, .breadcrumb-current, .cta-button'
  );

  newTabLinks.forEach(link => {
    // Ensure the default behavior doesn't override our custom new-tab functionality
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent the default navigation
      const url = link.getAttribute('href');
      if (url && url !== '#') {
        // Open the URL in a new tab
        window.open(url, '_blank');
      }
    });
  });

  // Optional: If you have any additional logic for handling dynamic links or other behaviors, add them here.
});

document.addEventListener('DOMContentLoaded', () => {
  // Select all relevant links that should open in a new tab
  const newTabLinks = document.querySelectorAll(
    '.nav-link, .sign-in-link, .sign-up-button, .breadcrumb-home, .breadcrumb-current, .cta-button'
  );

  newTabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent the default navigation behavior
      const url = link.getAttribute('href');
      if (url && url !== '#') {
        // Open the URL in a new tab
        window.open(url, '_blank');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const sendLinkButton = document.querySelector('.send-link-button');
  const emailInput = document.querySelector('.email-input');

  sendLinkButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (email) {
      // You would typically add validation and send the email via an API call.
      // For demonstration, we are using an alert.
      alert(`App download links for both Android and iOS will be sent to: ${email}`);
      // Clear the input field after sending
      emailInput.value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  });
});


//CONTACT US
document.addEventListener("DOMContentLoaded", () => {
  const openChatLink = document.getElementById("openChatLink");
  openChatLink.addEventListener("click", function (e) {
    e.preventDefault();
    // Replace 'YOUR_CHATBOT_URL' with your actual chatbot URL when ready.
    const chatbotUrl = "YOUR_CHATBOT_URL";
    if (chatbotUrl !== "YOUR_CHATBOT_URL") {
      window.open(chatbotUrl, "_blank");
    } else {
      console.log("Chatbot URL not set.");
    }
  });
});




//ABOUT US

document.addEventListener('DOMContentLoaded', () => {
  // Replace with your own API key from newsapi.org
  const apiKey = 'YOUR_API_KEY';

  // Function to fetch and update news for a given source and element selector
  function updateNews(source, selector) {
    const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.articles && data.articles.length > 0) {
          // Use the first article's title for simplicity
          const title = data.articles[0].title;
          const elem = document.querySelector(selector);
          if (elem) {
            elem.textContent = title;
          }
        }
      })
      .catch(error => {
        console.error(`Error fetching news from ${source}:`, error);
      });
  }

  // Update Business Standard news (adjust the source id as required)
  updateNews('business-standard', '#newsBS .aum-surge');
  
  // Update Businessworld news (adjust the source id as required)
  updateNews('businessworld', '#newsBW .nfo-surge');

  // Optionally, you could also update the Bluestock section with custom news
  // or leave it as is.
});



document.addEventListener('DOMContentLoaded', () => {
  const mediaBlock = document.querySelector('.flex-row-ff');
  if (mediaBlock) {
    mediaBlock.addEventListener('click', () => {
      // Array of news portal URLs
      const newsPortals = [
        "https://www.business-standard.com",  // Business Standard
        "https://www.moneycontrol.com",         // Moneycontrol
        "https://in.reuters.com",               // Reuters India
        "https://www.cnbctv18.com"              // CNBC TV18
      ];
      // Randomly select one portal
      const randomIndex = Math.floor(Math.random() * newsPortals.length);
      window.location.href = newsPortals[randomIndex];
    });
  }
});


//BLOGS
document.addEventListener("DOMContentLoaded", function() {
  // Fetch the news data for the blue box from your API.
  fetch("getNewsAPI.php") // Replace with your API endpoint URL
    .then(response => response.json())
    .then(data => {
      // Assume the API returns an object like:
      // { title: "Top Reasons for Life Insurance Claim Rejection",
      //   date: "04 January 2024",
      //   readTime: "4 min read",
      //   image: "path/to/image.png" }
      
      // Update the title text.
      const titleElement = document.querySelector(".top-reasons-life-insurance");
      if (titleElement && data.title) {
        titleElement.textContent = data.title;
      }
      
      // Update the date and read time.
      const infoElement = document.querySelector(".january-min-read");
      if (infoElement && data.date && data.readTime) {
        infoElement.textContent = data.date + " . " + data.readTime;
      }
      
      // Update the background image in the blue box.
      const imageDiv = document.querySelector(".rectangle-5");
      if (imageDiv && data.image) {
        imageDiv.style.backgroundImage = "url(" + data.image + ")";
      }
    })
    .catch(error => console.error("Error fetching news data:", error));
});



//BLOG 1  2  3  4 SLIDING
document.addEventListener("DOMContentLoaded", function() {
  // Convert the static numbers into clickable elements.
  const numbersContainer = document.querySelector(".numbers");
  if (numbersContainer) {
    // Split the text "1 2 3 4 5" into separate numbers.
    const nums = numbersContainer.textContent.split(" ").filter(n => n.trim() !== "");
    numbersContainer.innerHTML = ""; // Clear existing text

    // Create a clickable span for each number.
    nums.forEach(num => {
      const span = document.createElement("span");
      span.classList.add("page-number"); // additional class for clarity (doesn't change styling if not defined in CSS)
      span.style.cursor = "pointer"; // indicate clickability
      span.textContent = num;
      // Append span and a space to preserve format
      numbersContainer.appendChild(span);
      numbersContainer.appendChild(document.createTextNode(" "));
      
      // Redirect to the corresponding news page when clicked.
      span.addEventListener("click", function() {
        window.location.href = "news-page-" + num + ".html"; // Update URL format as needed
      });
    });
  }

  // Set up click events for the left/right chevrons.
  const leftChevron = document.querySelector(".chevron-left");
  const rightChevron = document.querySelector(".chevron-right");

  // Assume the current page number is defined (default to 1 if not available)
  let currentPage = 1; 
  // (Optionally, parse currentPage from URL query params if needed)

  if (leftChevron) {
    leftChevron.style.cursor = "pointer";
    leftChevron.addEventListener("click", function() {
      if (currentPage > 1) {
        currentPage--;
        window.location.href = "news-page-" + currentPage + ".html";
      }
    });
  }
  if (rightChevron) {
    rightChevron.style.cursor = "pointer";
    rightChevron.addEventListener("click", function() {
      // Assume a maximum of 5 pages; adjust as needed.
      if (currentPage < 5) {
        currentPage++;
        window.location.href = "news-page-" + currentPage + ".html";
      }
    });
  }
});



//ANALYTICS HEADER

function redirectTo(page) {
  window.location.href = page;
}



//ANALYTICS FETCH DATA
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-page]').forEach(element => {
      element.addEventListener('click', () => {
          const page = element.getAttribute('data-page');
          window.location.href = page;
      });
  });

  // Fetch market data dynamically
  fetchMarketData();
});

function fetchMarketData() {
  // Placeholder API URL (replace with actual API endpoint)
  const apiUrl = 'https://example.com/market-data';
  
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          const marketStatus = document.getElementById('market-status');
          const marketTime = document.getElementById('market-time');
          const advances = document.getElementById('advances');
          const declines = document.getElementById('declines');
          const unchanged = document.getElementById('unchanged');

          // Update market status and color
          if (data.marketOpen) {
              marketStatus.textContent = 'Market is Open';
              marketStatus.style.color = 'green';
          } else {
              marketStatus.textContent = 'Market is Closed';
              marketStatus.style.color = 'red';
          }

          // Update market data
          advances.textContent = `Advances - ${data.advances}`;
          declines.textContent = `Declines - ${data.declines}`;
          unchanged.textContent = `Unchanged - ${data.unchanged}`;
          marketTime.textContent = `as on ${data.timestamp} IST`;
      })
      .catch(error => {
          console.error('Error fetching market data:', error);
      });
}


//STOCK SCHOOL 
document.querySelectorAll('.view-details').forEach(item => {
  item.addEventListener('click', event => {
      event.preventDefault();
      // Handle the click event without navigation
  });
});
//TOGGLE TEXT
function toggleText(element) {
  element.classList.toggle('expanded');
}



//BASICS OF TECHNICAL ANALYSIS
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".module-unit-arrow").forEach(arrow => {
      arrow.addEventListener("click", function () {
          const targetId = this.getAttribute("data-target");
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
          }
      });
  });
});

