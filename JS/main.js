// Settings Box Toggle
let settingsBox = document.querySelector(".settings-box");
let toggleSettings = document.querySelector(".settings-box .toggle-settings");
let gear = document.querySelector(".settings-box .toggle-settings .gear");
toggleSettings.addEventListener("click", () => {
    settingsBox.classList.toggle("open");
    gear.classList.toggle("fa-spin");
});
document.addEventListener("click", (e) => {
    if (!settingsBox.contains(e.target)) {
    settingsBox.classList.remove("open");
    gear.classList.remove("fa-spin");
    }
});

// Get Color From Local Storage
let colorsLi = document.querySelectorAll(".colors-list li");
let colorLocalItem = window.localStorage.getItem("color-option");
// Check if there is a color in Local Storage
if (colorLocalItem !== null) {
    // Set Color on Root
    document.documentElement.style.setProperty("--main-color", colorLocalItem);
    // Remove Active Class from All Lis
    colorsLi.forEach((element) => {
        element.classList.remove("active");
        if (element.dataset.color === colorLocalItem) {
            // Add Active Class to Element with Data Color === Local Storage Item
            element.classList.add("active");
        }
    });
}
// Switch Colors On Click And Save it to Local Storage
colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        window.localStorage.setItem("color-option", e.target.dataset.color);
        // Handle Active Class from All Spans By a Function
        handleActive(e);
    });
});

// -------------------------------------------------------------------------------------------------------------------

// Get Array of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let randomBackgroundEl = document.querySelectorAll(".random-bg span");
let bgRunning = true;
let backgroundInterval = null;
let bgLocalItem = window.localStorage.getItem("bg-option");
let getBgFromLocal = localStorage.getItem("bg-img");
let landingPage = document.querySelector(".landing-page");
function randomizeImgs() {
    // Change Background Image Every 2 Seconds if bgRunning is true
    if (bgRunning === true) {
        if (backgroundInterval !== null) return;
        backgroundInterval = setInterval(() => {
            // Random Image
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
                landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
                window.localStorage.setItem(
                "bg-img",
                landingPage.style.backgroundImage
            );
        }, 1000);
    } else {
        clearInterval(backgroundInterval)
        backgroundInterval = null;
    }
}
randomizeImgs();
// Check if there is a Background Option in Local Storage
if (bgLocalItem !== null) {
    randomBackgroundEl.forEach((element) => {
        element.classList.remove("active");
    });
    if (bgLocalItem === 'yes') {
        if (getBgFromLocal) {
            landingPage.style.backgroundImage = getBgFromLocal;
        }
        bgRunning = true;
        randomizeImgs();
        document.querySelector(".random-bg .yes").classList.add("active");
    } else {
        if (getBgFromLocal) {
            landingPage.style.backgroundImage = getBgFromLocal;
        }
        bgRunning = false;
        clearInterval(backgroundInterval);
        backgroundInterval = null;
        document.querySelector(".random-bg .no").classList.add("active");
    }
}
// Switch Background Option On Click
randomBackgroundEl.forEach((span) => {
    span.addEventListener("click", (e) => {
        // Handle Active Class from All Spans By a Function
        handleActive(e);
        window.localStorage.setItem("bg-option", e.target.dataset.background)
        // Start or Stop Background Randomization
        if (e.target.dataset.background == 'yes') {
            if (bgRunning === true) return;
            bgRunning = true;
            randomizeImgs();
        } else {
            if (bgRunning === false)return;
            bgRunning = false;
            clearInterval(backgroundInterval);
            backgroundInterval = null;
        }
    });
});

// -------------------------------------------------------------------------------------------------------------------

// Select Skills Selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
    // Skills Offset Top => Distance from Top to Skills Section
    let skillsOffsetTop = ourSkills.offsetTop;
    console.log("offsettop: " + skillsOffsetTop);
    // Skills Outer Height => Skills Section Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    console.log("offsetheight: " + skillsOuterHeight);
    // Window Height => Viewport Height of the Window
    let windowHeight = this.innerHeight;
    console.log("innerHeight: " + windowHeight);
    // Window ScrollTop => Distance Scrolled from Top of the Page
    let windowScrollTop = this.pageYOffset;
    console.log('pageYOffset: ' + windowScrollTop);
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    } else {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach((skill) => {
            skill.style.width = '0';
        });
    }
};
// End Select Skills Selector

// -------------------------------------------------------------------------------------------------------------------

// Start Gallery Section
let ourGallery = document.querySelectorAll(".gallery .images-box img");
ourGallery.forEach((img) => {
    img.addEventListener("click", (e) =>{
        // Create Overlay Element
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        // Create The Popup Box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        overlay.appendChild(popupBox);

        // Create The Image Heading
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupImage.alt = img.alt;
        popupBox.appendChild(popupImage);

        // Create the alt text heading
        if (img.alt !== null && img.alt !== "") {
            let imgHeading = document.createElement("h3");
            imgHeading.className = "img-heading";
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.prepend(imgHeading);
        } else {
            let imgHeading = document.createElement("h3");
            imgHeading.className = "img-heading";
            let imgText = document.createTextNode("Image");
            imgHeading.appendChild(imgText);
            popupBox.prepend(imgHeading);
        }
        // Create The Close Button
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton);

        // Close Popup
        closeButton.addEventListener("click", () => {
            popupBox.remove();
            overlay.remove();
        });

    })
})
// End Gallery Section

// -------------------------------------------------------------------------------------------------------------------


// Function To scroll to sections
function scrollToSection(elements) {
    elements.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
                behavior: "smooth"
            })
        });
    });
}

// Start Navigation Bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToSection(allBullets);
// End Navigation Bullets

// Start Links
let allLinks = document.querySelectorAll(".links a");
scrollToSection(allLinks);
// End Links

// -------------------------------------------------------------------------------------------------------------------

// Handle Active State
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
};

// -------------------------------------------------------------------------------------------------------------------

// Add Bullets Option To Local Storage
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = window.localStorage.getItem("bullets-option");
if (bulletLocalItem !== null) {
    bulletsSpan.forEach((span) => {
        span.classList.remove("active");
        if (bulletLocalItem === 'block') {
            bulletContainer.style.display = "block";
            document.querySelector(".bullets-option .yes").classList.add("active");
        } else {
            bulletContainer.style.display = "none";
            document.querySelector(".bullets-option .no").classList.add("active");
        }
    });
};
// Switch Bullets Option On Click
bulletsSpan.forEach((span) => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            bulletContainer.style.display = "block";
            window.localStorage.setItem("bullets-option", "block");
        } else {
            bulletContainer.style.display = "none";
            window.localStorage.setItem("bullets-option", "none");
        }
        handleActive(e);
    });
});

// -------------------------------------------------------------------------------------------------------------------

// Reset Button
let resetButton = document.querySelector(".reset-option");
resetButton.addEventListener("click", () => {
    // Clear Local Storage
    window.localStorage.clear();
    // Reload Page
    window.location.reload();
});


// -------------------------------------------------------------------------------------------------------------------

// Toggle Menu
let toggleMenu = document.querySelector(".toggle-menu");
let MainMenuLinks = document.querySelector(".header-area .links");
let arrowMenu = document.querySelector(".header-area .toggle-menu");

toggleMenu.addEventListener("click", (e) => {
    e.stopPropagation();
    MainMenuLinks.classList.toggle("open");
    arrowMenu.classList.toggle("active");
    // Click Anywhere Outside Menu And Toggle Button
    document.addEventListener("click", (e) => {
        if (!MainMenuLinks.contains(e.target) && !toggleMenu.contains(e.target)) {
            // Check if Menu is Open
            if (!MainMenuLinks.classList.contains("open")) return;
            MainMenuLinks.classList.toggle("open");
            arrowMenu.classList.toggle("active");
        }
    });
});

// ---------------------------------------------------------------------------------------------------