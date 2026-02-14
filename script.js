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
    const nav = document.getElementById("navLinks");

    if (nav.style.display === "flex") {
        nav.style.display = "none";
    } else {
        nav.style.display = "flex";
    }
}

/* Close menu when any nav link is clicked (mobile) */
document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            document.getElementById("navLinks").style.display = "none";
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

