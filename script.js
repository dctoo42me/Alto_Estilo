// script.js

let slideIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.slideshow img');
    slideIndex = (slideIndex + step + slides.length) % slides.length;
    const slideWidth = slides[0].clientWidth;
    document.querySelector('.slideshow').style.transform = `translateX(-${slideWidth * slideIndex}px)`;
}

document.querySelectorAll('.slideshow img').forEach(img => {
    img.addEventListener('click', function() {
    });
});


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

window.onload = loadReviews;
