let contactForm = document.getElementById("formContact");
let fields = document.querySelectorAll("input[required], textarea[required]");
let confirmationPopup = document.getElementById("confirmationPopup");

fields.forEach((field) => {
  if (field.type === "checkbox" || field.type === "radio") {
    field.addEventListener("change", () => resetField(field), false);
  } else {
    field.addEventListener('input', () => resetField(field), false);
  }
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fields.forEach((field) => {
    resetField(field);
  });
  let valid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      valid = false;
    }
  });

  if (valid) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    showConfirmationPopup();

  }
});

function validateField(field) {
  let errorMessage = "";

  switch (field.type) {
    case "radio":
      const radioGroup = document.getElementsByName(field.name);
      const isRadioChecked = Array.from(radioGroup).some(
        (radio) => radio.checked
      );
      if (!isRadioChecked) {
        errorMessage = "Please select a query type";
      }
      break;

    case "checkbox":
      if (!field.checked) {
        errorMessage = "To submit this form, please consent to being contacted";
      }
      break;

    case "email":
      if (!field.checkValidity()) {
        errorMessage = "Please enter a valid email address";
      }
      break;

    default:
      if (!field.checkValidity()) {
        errorMessage = "This field is required";
      }
      break;
  }
  if (errorMessage) {
    showError(field, errorMessage);
    return false;
  } else {
    resetField(field);
    return true;
  }
}

function showError(field, message) {
  if (field.type === "checkbox") {
    errorSpan = document.querySelector(".term-container .error-message");
  } else {
    errorSpan =
      field.parentNode.querySelector(".error-message") ||
      field.closest("fieldset")?.querySelector(".error-message");
  }

  if (errorSpan) {
    errorSpan.textContent = message;
  }
  field.classList.add("invalid");
}

function resetField(field) {
  confirmationPopup.style.display = "none";
  field.classList.remove("invalid");
  let errorSpan = field.type === "checkbox"?document.querySelector(".term-container .error-message"):field.parentNode.querySelector('.error-message') || field.closest('fieldset')?.querySelector('.error-message');
  if (errorSpan) {
    errorSpan.textContent = "";
  }
  if (field.type === "radio" && field.name === "query-type") {
    document.querySelectorAll('.query-type-container label').forEach((label) => {
        label.classList.remove('selected-radio');
    });

    if (field.checked) {
        field.closest('label').classList.add('selected-radio');
    }
}
}
function showConfirmationPopup() {
    confirmationPopup.style.display = "flex";
    contactForm.reset();
}
