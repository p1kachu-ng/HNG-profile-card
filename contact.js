document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.querySelector(
    '[data-testid="test-contact-success"]'
  );

  // Form variables
  const nameInput = document.querySelector('[data-testid="test-contact-name"]');
  const emailInput = document.querySelector(
    '[data-testid="test-contact-email"]'
  );
  const subjectInput = document.querySelector(
    '[data-testid="test-contact-subject"]'
  );
  const messageInput = document.querySelector(
    '[data-testid="test-contact-message"]'
  );

  const nameError = document.querySelector(
    '[data-testid="test-contact-error-name"]'
  );
  const emailError = document.querySelector(
    '[data-testid="test-contact-error-email"]'
  );
  const subjectError = document.querySelector(
    '[data-testid="test-contact-error-subject"]'
  );
  const messageError = document.querySelector(
    '[data-testid="test-contact-error-message"]'
  );

  // Validation functions
  function validateName() {
    const name = nameInput.value.trim();
    if (name === "") {
      showError(nameInput, nameError, "Enter your name");
      return false;
    }
    hideError(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      showError(emailInput, emailError, "Enter your email address");
      return false;
    }
    if (!emailRegex.test(email)) {
      showError(emailInput, emailError, "Invalid Email address");
      return false;
    }
    hideError(emailInput, emailError);
    return true;
  }

  function validateSubject() {
    const subject = subjectInput.value.trim();
    if (subject === "") {
      showError(subjectInput, subjectError, "Subject is required");
      return false;
    }
    if (subject.length < 3) {
      showError(
        subjectInput,
        subjectError,
        "Subject must be at least 3 characters"
      );
      return false;
    }
    hideError(subjectInput, subjectError);
    return true;
  }

  function validateMessage() {
    const message = messageInput.value.trim();
    if (message === "") {
      showError(messageInput, messageError, "Message is required");
      return false;
    }
    if (message.length < 10) {
      showError(
        messageInput,
        messageError,
        "Message must be at least 10 characters"
      );
      return false;
    }
    hideError(messageInput, messageError);
    return true;
  }

  function showError(input, errorElement, message) {
    input.classList.add("invalid");
    errorElement.textContent = message;
    input.setAttribute("aria-invalid", "true");
  }

  function hideError(input, errorElement) {
    input.classList.remove("invalid");
    errorElement.textContent = "";
    input.setAttribute("aria-invalid", "false");
  }

  function showSuccess() {
    successMessage.textContent =
      "Thank you! Your message has been sent successfully.";
    successMessage.classList.add("show");

    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 5000);
  }

  //  validation in real-time
  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  subjectInput.addEventListener("blur", validateSubject);
  messageInput.addEventListener("blur", validateMessage);

  // Clear input errors
  nameInput.addEventListener("input", () => hideError(nameInput, nameError));
  emailInput.addEventListener("input", () => hideError(emailInput, emailError));
  subjectInput.addEventListener("input", () =>
    hideError(subjectInput, subjectError)
  );
  messageInput.addEventListener("input", () =>
    hideError(messageInput, messageError)
  );

  // Form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      showSuccess();
      contactForm.reset();

      console.log("Form submitted successfully!");
    } else {
      if (!isNameValid) nameInput.focus();
      else if (!isEmailValid) emailInput.focus();
      else if (!isSubjectValid) subjectInput.focus();
      else if (!isMessageValid) messageInput.focus();
    }
  });

  // Keyboard accessibility
  const formElements = contactForm.querySelectorAll("input, textarea, button");
  formElements.forEach((element) => {
    element.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.type !== "textarea") {
        e.preventDefault();
        if (e.target.type === "submit") {
          contactForm.dispatchEvent(new Event("submit"));
        } else {
          const nextElement =
            e.target.form.elements[e.target.name].nextElementSibling;
          if (nextElement) nextElement.focus();
        }
      }
    });
  });
});
