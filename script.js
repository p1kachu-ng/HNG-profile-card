// Update time in ms every second
const timeElement = document.querySelector('[data-testid="test-user-time"]');
if (timeElement) {
  function updateTime() {
    const now = Date.now();
    timeElement.textContent = now;
  }
  updateTime();
  setInterval(updateTime, 1000);
}

// Navigation toggle for mobile
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  const socialLinks = document.querySelectorAll(".social-link");

  // Keyboard nav accessibility for social links
  socialLinks.forEach((link) => {
    link.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Animation on page load
  const profileCard = document.querySelector(".profile-card");
  if (profileCard) {
    profileCard.style.opacity = "0";
    profileCard.style.transform = "translateY(1.5rem)";

    setTimeout(() => {
      profileCard.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      profileCard.style.opacity = "1";
      profileCard.style.transform = "translateY(0)";
    }, 100);
  }

  // About page animations
  const aboutSections = document.querySelectorAll(".about-section");
  if (aboutSections.length > 0) {
    aboutSections.forEach((section, index) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(1rem)";

      setTimeout(() => {
        section.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
      }, 100 + index * 100);
    });
  }

  // Contact page animations
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.style.opacity = "0";

    setTimeout(() => {
      contactForm.style.transition = "opacity 0.5s ease";
      contactForm.style.opacity = "1";
    }, 100);
  }
});

// profile photo upload
document.addEventListener("DOMContentLoaded", function () {
  const uploadBtn = document.querySelector(".upload-btn");
  const fileInput = document.querySelector(".file-input");
  const avatarImg = document.querySelector(".avatar-img");
  const AVATAR_KEY = "userProfileAvatar";

  if (uploadBtn && fileInput && avatarImg) {
    const savedAvatar = localStorage.getItem(AVATAR_KEY);
    if (savedAvatar) {
      avatarImg.src = savedAvatar;
    }

    uploadBtn.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        avatarImg.src = base64Image;

        localStorage.setItem(AVATAR_KEY, base64Image);
      };
      reader.readAsDataURL(file);
    });
  }
});
