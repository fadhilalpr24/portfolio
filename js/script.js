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
// PROJECT FILTER + HORIZONTAL SCROLL
// =====================================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

const projectsGrid = document.querySelector(".projects-grid");
const scrollLeftBtn = document.getElementById("scrollLeft");
const scrollRightBtn = document.getElementById("scrollRight");

let currentFilter = "all";


// =====================================================
// UPDATE SCROLL BUTTONS
// =====================================================

function updateScrollButtons() {

    if (!projectsGrid || !scrollLeftBtn || !scrollRightBtn) {
        return;
    }

    // Ambil project yang sedang ditampilkan
    const visibleCards = Array.from(projectCards).filter(card => {
        return card.style.display !== "none";
    });

    // ---------------------------------------------
    // Kalau hanya 1-2 project
    // Tidak perlu panah
    // ---------------------------------------------

    if (visibleCards.length <= 2) {

        scrollLeftBtn.style.display = "none";
        scrollRightBtn.style.display = "none";

        projectsGrid.style.overflowX = "hidden";

        return;
    }


    // ---------------------------------------------
    // Kalau project lebih dari 2
    // Tampilkan panah
    // ---------------------------------------------

    scrollLeftBtn.style.display = "flex";
    scrollRightBtn.style.display = "flex";

    projectsGrid.style.overflowX = "auto";

    updateArrowState();
}


// =====================================================
// UPDATE STATUS PANAH
// =====================================================

function updateArrowState() {

    if (!projectsGrid || !scrollLeftBtn || !scrollRightBtn) {
        return;
    }

    const maxScroll =
        projectsGrid.scrollWidth - projectsGrid.clientWidth;


    // ---------------------------------------------
    // Panah kiri
    // ---------------------------------------------

    if (projectsGrid.scrollLeft <= 5) {

        scrollLeftBtn.style.opacity = "0.3";
        scrollLeftBtn.style.pointerEvents = "none";

    } else {

        scrollLeftBtn.style.opacity = "1";
        scrollLeftBtn.style.pointerEvents = "auto";

    }


    // ---------------------------------------------
    // Panah kanan
    // ---------------------------------------------

    if (projectsGrid.scrollLeft >= maxScroll - 5) {

        scrollRightBtn.style.opacity = "0.3";
        scrollRightBtn.style.pointerEvents = "none";

    } else {

        scrollRightBtn.style.opacity = "1";
        scrollRightBtn.style.pointerEvents = "auto";

    }
}


// =====================================================
// UPDATE PROJECTS
// =====================================================

function updateProjects() {

    projectCards.forEach(card => {

        const category = card.dataset.category;

        if (
            currentFilter === "all" ||
            category === currentFilter
        ) {

            card.style.display = "flex";

        } else {

            card.style.display = "none";

        }

    });


    // Reset posisi scroll setiap ganti kategori
    if (projectsGrid) {
        projectsGrid.scrollLeft = 0;
    }


    // Cek ulang apakah perlu panah
    updateScrollButtons();
}


// =====================================================
// FILTER BUTTON
// =====================================================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active dari semua button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        // Tambahkan active ke button yang diklik
        button.classList.add("active");


        // Ambil kategori
        currentFilter = button.dataset.filter;


        // Update project
        updateProjects();

    });

});


// =====================================================
// SCROLL LEFT
// =====================================================

if (scrollLeftBtn) {

    scrollLeftBtn.addEventListener("click", () => {

        projectsGrid.scrollBy({
            left: -400,
            behavior: "smooth"
        });

    });

}


// =====================================================
// SCROLL RIGHT
// =====================================================

if (scrollRightBtn) {

    scrollRightBtn.addEventListener("click", () => {

        projectsGrid.scrollBy({
            left: 400,
            behavior: "smooth"
        });

    });

}


// =====================================================
// UPDATE PANAH SAAT SCROLL MANUAL
// =====================================================

if (projectsGrid) {

    projectsGrid.addEventListener("scroll", updateArrowState);

}


// =====================================================
// JALANKAN PERTAMA KALI
// =====================================================

updateProjects();

