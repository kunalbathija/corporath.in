const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const dotsContainer = document.querySelector(".carousel-dots");

let index = 0;
let startX = 0;
let isDragging = false;

/* Create Dots */
slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => moveToSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("span");

function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

function moveToSlide(i) {
    index = i;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
}

/* Auto slide */
setInterval(() => {
    index = (index + 1) % slides.length;
    moveToSlide(index);
}, 5000);

/* Touch Swipe */
track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    handleSwipe(endX);
});

/* Mouse Drag */
track.addEventListener("mousedown", e => {
    isDragging = true;
    startX = e.clientX;
});

track.addEventListener("mouseup", e => {
    if (!isDragging) return;
    isDragging = false;
    handleSwipe(e.clientX);
});

function handleSwipe(endX) {
    let diff = startX - endX;

    if (diff > 50) {
        index = (index + 1) % slides.length;
    } else if (diff < -50) {
        index = (index - 1 + slides.length) % slides.length;
    }

    moveToSlide(index);
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}

/* Close menu when any nav link is clicked (mobile) */
document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            document.getElementById("navLinks").classList.remove("active");
        }
    });
});


/* Show button when scrolling */
window.addEventListener("scroll", () => {
    const topBtn = document.getElementById("topBtn");

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

/* Scroll to top smooth */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function openModal(src) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    modalImg.src = src;
    modal.classList.add("show");
}

function closeModal() {
    document.getElementById("imageModal").classList.remove("show");
}


/* Close when clicking outside image */
window.addEventListener("click", function(event) {
    const modal = document.getElementById("imageModal");
    if (event.target === modal) {
        closeModal();
    }
});

function shareWebsite() {

    const shareData = {
        title: "CorpoRath - Premium Corporate Commute",
        text: "Travel stress-free from Ambernath to Airoli with CorpoRath 🚍✨ Comfortable corporate commute service.",
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log("Shared successfully"))
            .catch((error) => console.log("Sharing failed", error));
    } else {
        // Fallback for desktop
        alert("Sharing not supported on this device. Copy this link: " + window.location.href);
    }
}

document.querySelectorAll(".carousel-img").forEach(img => {
    img.addEventListener("click", () => {
        openModal(img.src);
    });
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeModal();
    }
});

