document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-btn');
    const navItems = document.querySelectorAll('.nav-links li a');

    // Function to open the menu
    function openMenu() {
        navLinks.classList.add('active');
        overlay.classList.add('active');
    }

    // Function to close the menu
    function closeMenu() {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
    }

    // Open the menu when the hamburger is clicked
    hamburger.addEventListener('click', openMenu);

    // Close the menu when the close button or overlay is clicked
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Close the menu when any menu item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });
});

// slideshow

let slideIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.slideshow img');
    slideIndex = (slideIndex + step + slides.length) % slides.length;
    const slideWidth = slides[0].clientWidth;
    document.querySelector('.slideshow').style.transform = `translateX(-${slideWidth * slideIndex}px)`;
}

// Auto-populate reviews
function loadReviews() {
    fetch('reviews.html')
        .then(response => response.text())
        .then(data => {
            const reviewContainer = document.getElementById('review-container');
            reviewContainer.innerHTML = data;

            // Select all review elements
            const reviews = Array.from(reviewContainer.querySelectorAll('#reviews p'));

            // Shuffle the reviews array
            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }

            const shuffledReviews = shuffle(reviews);
            let currentIndex = 0;

            function showReview() {
                // Hide all reviews except the current one
                shuffledReviews.forEach((review, index) => {
                    review.style.display = index === currentIndex ? 'block' : 'none';
                });

                // Move to the next review, looping back to the start
                currentIndex = (currentIndex + 1) % shuffledReviews.length;
            }

            // Show the first review immediately
            showReview();

            // Switch reviews every 3 seconds
            setInterval(showReview, 8000);
        })
        .catch(error => console.error('Error loading reviews:', error));
}
// Call the function to start the review cycle
loadReviews();

// window.onload = loadReviews;
