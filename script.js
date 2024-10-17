let contactForm = document.getElementById('formContact');

contactForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    let fields = document.querySelectorAll('input[required], textarea[required]');
    let valid = true;

    fields.forEach((field) =>{
       if(!validateField(field)){
        valid = false;
       }
    })

    if (valid) {
      e.target.submit();    
    }
})

function validateField(field) {
    if (field.checkValidity()) {
        return true;
    } else {
        field.classList.add('invalid');
        let errorSpan = document.createElement('span');
        errorSpan.classList.add('error-message');
        errorSpan.textContent = 'This field is required';
        // Insérer le message d'erreur sous l'input
        field.parentNode.appendChild(errorSpan);
        return false;
    }
}