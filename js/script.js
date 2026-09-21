// =====================================================
// MOBILE NAVIGATION
// =====================================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}


// =====================================================
// NAVBAR SCROLL
// =====================================================

const navbar = document.querySelector(".navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

// =====================================================
// ACTIVE NAVIGATION ON SCROLL
// =====================================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


// =====================================================
// CURRENT YEAR
// =====================================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}



// =====================================================
// EXPERIENCE MORE / SHOW LESS
// =====================================================

const experienceMore = document.getElementById("experienceMore");
const experienceItems = document.querySelectorAll(".timeline-item");

const maxVisibleExperience = 2;
let experienceExpanded = false;

function updateExperience() {
    experienceItems.forEach((item, index) => {
        if (experienceExpanded || index < maxVisibleExperience) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    });

    if (experienceItems.length > maxVisibleExperience) {
        experienceMore.style.display = "block";
        experienceMore.textContent = experienceExpanded
            ? "Show Less"
            : "More";
    } else {
        experienceMore.style.display = "none";
    }
}

if (experienceMore) {
    experienceMore.addEventListener("click", () => {

        // ==============================
        // SHOW MORE
        // ==============================
        if (!experienceExpanded) {
            experienceExpanded = true;
            updateExperience();
            return;
        }

        // ==============================
        // SHOW LESS
        // ==============================

        // Simpan posisi layar sekarang
        const scrollBefore = window.scrollY;

        // Collapse
        experienceExpanded = false;
        updateExperience();

        // Tunggu browser menghitung perubahan layout
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {

                const scrollAfter = window.scrollY;

                // Kembalikan posisi ke posisi sebelum collapse
                if (scrollAfter !== scrollBefore) {
                    window.scrollTo({
                        top: scrollBefore,
                        behavior: "auto"
                    });
                }
            });
        });
    });
}

updateExperience();


// =====================================================
// PROJECT FILTER + MORE PROJECT
// =====================================================


const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const projectMore = document.getElementById("projectMore");

const maxVisibleProjects = 4;

let currentFilter = "all";
let isExpanded = false;

function updateProjects() {

    const filteredProjects = Array.from(projectCards).filter((card) => {
        const category = card.dataset.category;

        return currentFilter === "all" || category === currentFilter;
    });

    const visibleProjects = isExpanded
        ? filteredProjects
        : filteredProjects.slice(0, maxVisibleProjects);

    // Tampilkan / sembunyikan project
    projectCards.forEach((card) => {

        if (visibleProjects.includes(card)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });

    // More Project / Show Less
    if (filteredProjects.length > maxVisibleProjects) {

        projectMore.style.display = "block";

        projectMore.textContent = isExpanded
            ? "Show Less"
            : "More Project";

    } else {

        projectMore.style.display = "none";

    }
}


// Filter button
filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        // Reset ke 4 project ketika ganti filter
        isExpanded = false;

        updateProjects();

    });

});


// More Project / Show Less
if (projectMore) {

    projectMore.addEventListener("click", () => {

        isExpanded = !isExpanded;

        updateProjects();

    });

}


// Jalankan pertama kali
updateProjects();

