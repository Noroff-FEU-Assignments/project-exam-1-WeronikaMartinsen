const validation = document.querySelector(".validation");

validation.innerHTML = `
<div class="contactInfo">
<div class="contactBox"><ion-icon class="contactIcon" name="mail-outline"></ion-icon><span class="infoText">Email: wb3167@gmail.com</span></div>
<div class="contactBox"><ion-icon class="contactIcon" name="logo-facebook"></ion-icon><span class="infoText">Facebook</span></div>
<div class="contactBox"><ion-icon class="contactIcon" name="call-outline"></ion-icon><span class="infoText">Mobile: 925 011 77</span></div>
<div class="contactBox"><ion-icon class="contactIcon" name="logo-instagram"></ion-icon><span class="infoText">Instagram</span></div>
</div>

<div class="validationContainer">
<span class="contactSpan">Feel free to reach out to me if you have any questions, inquiries, or feedback. I would love to hear from you!</span>
<h1>Contact Me Directly</h1>
<form class="contact-form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input class="contactInput nameInput" type="text" id="name" name="name" pattern=".{6,}" required>
      <div id="messageName" class="invalid valid"></div>
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input class="contactInput emailInput" type="email" id="email" name="email" required>
      <div id="messageEmail" class="invalid valid"></div>
      </div>
    <div class="form-group">
      <label for="subject">Subject:</label>
      <input class="contactInput subjectInput" id="subject" name="subject" required></input>
      <div id="messageSubject" class="invalid valid"></div>
      </div>
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea class="contactInput messageInput" id="message" name="message" rows="5" required></textarea>
      <div id="messageMessage" class="invalid valid"></div>
      </div>
  </form>
  <div>
  <button type="submit" class="button-main">Send Message</button></div>
</div>`;

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.querySelector(".nameInput");
  const emailInput = document.querySelector(".emailInput");
  const subjectInput = document.querySelector(".subjectInput");
  const messageInput = document.querySelector(".messageInput");
  const messageName = document.getElementById("messageName");
  const messageEmail = document.getElementById("messageEmail");
  const messageSubject = document.getElementById("messageSubject");
  const messageMessage = document.getElementById("messageMessage");

  nameInput.addEventListener("input", () => {
    if (nameInput.validity.valueMissing || nameInput.validity.tooShort) {
      messageName.textContent = nameInput.validity.valueMissing
        ? "*Name is required."
        : "Name must be more than 5 characters long.";
      nameInput.classList.add("invalid");
      nameInput.classList.remove("valid");
    } else {
      messageName.textContent = "";
      nameInput.classList.remove("invalid");
      nameInput.classList.add("valid");
    }
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.validity.valueMissing || !emailInput.validity.valid) {
      messageEmail.textContent = emailInput.validity.valueMissing
        ? "*Email is required."
        : "Email must be a valid address.";
      emailInput.classList.add("invalid");
      emailInput.classList.remove("valid");
    } else {
      messageEmail.textContent = "";
      emailInput.classList.remove("invalid");
      emailInput.classList.add("valid");
    }
  });

  subjectInput.addEventListener("input", () => {
    if (
      subjectInput.validity.valueMissing ||
      subjectInput.validity.tooShort.valid
    ) {
      messageSubject.textContent = subjectInput.validity.valueMissing
        ? "*Subject is required."
        : "Should be more than 15 characters long.";
      subjectInput.classList.add("invalid");
      subjectInput.classList.remove("valid");
    } else {
      messageSubject.textContent = "";
      subjectInput.classList.remove("invalid");
      subjectInput.classList.add("valid");
    }
  });

  messageInput.addEventListener("input", () => {
    if (
      messageInput.validity.valueMissing ||
      messageInput.validity.tooShort.valid
    ) {
      messageMessage.textContent = messageInput.validity.valueMissing
        ? "*Message is required."
        : "Should be more than 25 characters long.";
      messageInput.classList.add("invalid");
      messageInput.classList.remove("valid");
    } else {
      messageMessage.textContent = "";
      messageInput.classList.remove("invalid");
      messageInput.classList.add("valid");
    }
  });
});
