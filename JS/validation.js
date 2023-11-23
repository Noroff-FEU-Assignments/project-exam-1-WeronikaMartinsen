const validation = document.querySelector(".validation");
const myForm = document.getElementById("myForm");

validation.innerHTML = `
<div class="validationContainer">
<h1>Contact Me Directly</h1>
<span class="contactSpan">Feel free to reach out to me if you have any questions, inquiries, or feedback. I would love to hear from you!</span>

<form class="contact-form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input class="contactInput nameInput" type="text" id="name" onkeyup="validateName()" name="name" pattern=".{6,}" required>
      <span id="name-error"></span>
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input class="contactInput emailInput" type="email" id="email" onkeyup="validateEmail()" name="email" required>
      <span id="email-error"></span>
      </div>
    <div class="form-group">
      <label for="subject">Subject:</label>
      <input class="contactInput subjectInput" id="subject" onkeyup="validateSubject()" name="subject" required></input>
      <span id="subject-error"></span>
      </div>
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea class="contactInput messageInput" id="message" onkeyup="validateMessage()" name="message" rows="5" required></textarea>
      <span id="message-error"></span></div>
    <div class="form-group btn">
      <button id="submitButton" onclick="return validateForm()" type="submit" class="buttonSubmit">Send Message</button>
      <span id="submit-error"></span></div>

  </form> 
</div>
<div class="contactInfo">
<div class="contactBox"><ion-icon class="contactIcon" name="mail-outline"></ion-icon><span class="infoText">wb3167@gmail.com</span></div>
<div class="contactBox"><ion-icon class="contactIcon" name="logo-facebook"></ion-icon><span class="infoText">Facebook</span></div>
<div class="contactBox"><ion-icon class="contactIcon" name="call-outline"></ion-icon><span class="infoText">925 011 77</span></div>
<div class="contactBox"><ion-icon class="contactIcon" name="logo-instagram"></ion-icon><span class="infoText">Instagram</span></div>
</div>`;

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const subjectError = document.getElementById("subject-error");
const messageError = document.getElementById("message-error");
const submitError = document.getElementById("submit-error");

function validateName() {
  const name = document.getElementById("name").value;
  const required = 5;
  const left = required - name.length;

  if (left > 0) {
    nameError.innerHTML = left + "More characters required.";
    return false;
  }
  if (name.length == 0) {
    nameError.innerHTML = "Name is required.";
    return false;
  }
  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = "Write full name.";
    return false;
  }
  nameError.innerHTML = `<ion-icon class="checkIcon" name="checkmark-circle-outline"></ion-icon>`;
  return true;
}

function validateEmail() {
  const email = document.getElementById("email").value;

  if (email.length == 0) {
    emailError.innerHTML = "Email is required.";
    return false;
  }
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    emailError.innerHTML = "Email invalid.";
    return false;
  }
  emailError.innerHTML = `<ion-icon class="checkIcon" name="checkmark-circle-outline"></ion-icon>`;
  return true;
}

function validateMessage() {
  const message = document.getElementById("message").value;
  const required = 25;
  const left = required - message.length;

  if (left > 0) {
    messageError.innerHTML = left + "More characters required.";
    return false;
  }
  messageError.innerHTML = `<ion-icon class="checkIcon" name="checkmark-circle-outline"></ion-icon>`;
  return true;
}

function validateSubject() {
  const subject = document.getElementById("subject").value;
  const required = 15;
  const left = required - subject.length;

  if (left > 0) {
    subjectError.innerHTML = left + "More characters required.";
    return false;
  }
  subjectError.innerHTML = `<ion-icon class="checkIcon" name="checkmark-circle-outline"></ion-icon>`;
  return true;
}

function validateForm() {
  if (
    !validateName() ||
    !validateEmail() ||
    !validateSubject() ||
    !validateMessage()
  ) {
    submitError.style.display = "block";
    submitError.innerHTML = "Please fix error to submit.";
    setTimeout(function () {
      submitError.style.display = "none";
    }, 3000);
    return false;
  } else {
    openOverlay();
    return false;
  }
}
function openOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlayMessage");
  overlay.innerHTML = `<ion-icon class="closeIcon" name="close-outline" onclick="closeOverlay()"></ion-icon><h3 class="contact-color">Thank you for contacting me!</h3>
    <span>I will answer you as fast as It will be possible.</span>
    <a href="/html/blog.html" class="button-main spanOverlay">Go to posts</a>`;

  // Append the overlay to the validation container
  const validationContainer = document.querySelector(".validationContainer");
  validationContainer.appendChild(overlay);
}

function closeOverlay() {
  const overlay = document.querySelector(".overlayMessage");
  overlay.style.display = "none";

  // Remove the overlay element from the DOM
  overlay.parentNode.removeChild(overlay);
}
function resetFormFields() {
  nameError.innerHTML = "";
  emailError.innerHTML = "";
  subjectError.innerHTML = "";
  messageError.innerHTML = "";
  submitError.innerHTML = "";

  // Clear the form fields
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("message").value = "";
}

// Function to reset the entire form
function resetForm() {
  resetFormFields();
  // Additional logic for resetting other elements if needed
}

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  resetForm();
});
