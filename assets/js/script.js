'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

// function sendMail() {
//   var params = {
//     senderName: document.getElementById("senderName").value,
//     senderPhone: document.getElementById("senderPhone").value,
//     personCount: document.getElementById("personCount").value,
//     date: document.getElementById("date").value,
//     time: document.getElementById("time").value,
//     message: document.getElementById("message").value,
//   };

//   var serviceID = "service_0o51spe";
//   var templateID = "template_iar28lh";

//   emailjs.send(serviceID, templateID, params).then(
//     function (res) {
//       console.log("Email sent successfully:", res);
//       alert("Reservation Requested Successfully");
//     },
//     function (error) {
//       console.log("Email send failed:", error);
//       alert("Error sending reservation request");
//     }
//   );
// }

// function sendMail() {
//   var params = {
//     senderName: document.getElementById("senderName").value,
//     senderPhone: document.getElementById("senderPhone").value,
//     personCount: document.getElementById("personCount").value,
//     date: document.getElementById("date").value,
//     time: document.getElementById("time").value,
//     message: document.getElementById("message").value,
//   };

//   var serviceID = "service_0o51spe";
//   var templateID = "template_iar28lh";

//   emailjs.send(serviceID, templateID, params).then(
//     function (res) {
//       // Use SweetAlert2 for a beautiful success alert
//       Swal.fire({
//         icon: "success",
//         title: "Reservation Requested Successfully",
//         showConfirmButton: false,
//         timer: 3000, // Automatically close after 2 seconds
//       });
//     },
//     function (error) {
//       // Use SweetAlert2 for a beautiful error alert
//       Swal.fire({
//         icon: "error",
//         title: "Error sending reservation request",
//         showConfirmButton: false,
//         timer: 3000, // Automatically close after 2 seconds
//       });
//     }
//   );
// }


// function subscribeSubmission() {
//   // Get the email input value
//   var emailInput = document.getElementById("emailInput").value;

//   // Validate the email format
//   if (validateEmail(emailInput)) {
//     // If the email is valid, show the success message
//     Swal.fire({
//       icon: "success",
//       title: "Thank You For Subscribing! Welcome To The Family 😉",
//       showConfirmButton: false,
//       timer: 3000,
//     });
//   } else {
//     // If the email is not valid, show the error message
//     Swal.fire({
//       icon: "error",
//       title: "Invalid Email Address. Please enter a valid email.",
//       showConfirmButton: true,
//     });
//   }
// }

// // Function to validate email format
// function validateEmail(email) {
//   var emailRegex = /\S+@\S+\.\S+/;
//   return emailRegex.test(email);
// }


function sendMail() {
  var params = {
    senderName: document.getElementById("senderName").value,
    senderPhone: document.getElementById("senderPhone").value,
    personCount: document.getElementById("personCount").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    message: document.getElementById("message").value,
  };

  var serviceID = "service_0o51spe";
  var templateID = "template_iar28lh";

  emailjs.send(serviceID, templateID, params).then(
    function (res) {
      // Use SweetAlert2 for a beautiful success alert
      Swal.fire({
        icon: "success",
        title: "Reservation Requested Successfully",
        showConfirmButton: false,
        timer: 3000, // Automatically close after 2 seconds
        customClass: {
          popup: 'custom-swal-popup', // Add a custom class for styling
        },
      });
    },
    function (error) {
      // Use SweetAlert2 for a beautiful error alert
      Swal.fire({
        icon: "error",
        title: "Error sending reservation request",
        showConfirmButton: false,
        timer: 3000, // Automatically close after 2 seconds
        customClass: {
          popup: 'custom-swal-popup', // Add a custom class for styling
        },
      });
    }
  );
}

function subscribeSubmission() {
  // Get the email input value
  var emailInput = document.getElementById("emailInput").value;

  // Validate the email format
  if (validateEmail(emailInput)) {
    // If the email is valid, show the success message
    Swal.fire({
      icon: "success",
      title: "Thank You For Subscribing! Welcome To The Family 😉",
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: 'custom-swal-popup', // Add a custom class for styling
      },
    });
  } else {
    // If the email is not valid, show the error message
    Swal.fire({
      icon: "error",
      title: "Invalid Email Address. Please enter a valid email.",
      showConfirmButton: false,
      timer: 2000,
      customClass: {
        popup: 'custom-swal-popup', // Add a custom class for styling
      },
    });
  }
}

// Function to validate email format
function validateEmail(email) {
  var emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}
