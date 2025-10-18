// Update time in ms every second
const timeElement = document.querySelector('[data-testid="test-user-time"]');
function updateTime() {
  const now = Date.now();
  timeElement.textContent = now;
}
updateTime();
setInterval(updateTime, 1000);

document.addEventListener("DOMContentLoaded", function () {
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
  profileCard.style.opacity = "0";
  profileCard.style.transform = "translateY(1.5rem)";

  setTimeout(() => {
    profileCard.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    profileCard.style.opacity = "1";
    profileCard.style.transform = "translateY(0)";
  }, 100);
});

// profile photo upload
document.addEventListener("DOMContentLoaded", function () {
  const uploadBtn = document.querySelector(".upload-btn");
  const fileInput = document.querySelector(".file-input");
  const avatarImg = document.querySelector(".avatar-img");
  const AVATAR_KEY = "userProfileAvatar";

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
});
