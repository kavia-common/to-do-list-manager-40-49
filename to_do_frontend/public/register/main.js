(function () {
  'use strict';

  /**
   * PUBLIC_INTERFACE
   * Initialize the Register form interactions: client-side validation and basic UX.
   */
  function initRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    const registerBtn = document.getElementById('registerBtn');

    // Simple inline validation and UX helpers
    form.addEventListener('submit', (e) => {
      // Basic validations
      let valid = form.checkValidity();

      // Password match check
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        valid = false;
        confirmPassword.setCustomValidity('Passwords do not match');
      } else if (confirmPassword) {
        confirmPassword.setCustomValidity('');
      }

      // Terms must be accepted
      if (terms && !terms.checked) {
        valid = false;
        terms.setCustomValidity('You must agree to the terms');
      } else if (terms) {
        terms.setCustomValidity('');
      }

      if (!valid) {
        e.preventDefault();
        form.reportValidity();
        return;
      }

      // Prevent actual navigation for this static demo
      e.preventDefault();

      // Simulate success
      registerBtn.disabled = true;
      registerBtn.textContent = 'Registering...';

      setTimeout(() => {
        alert('Registration successful (demo)');
        registerBtn.disabled = false;
        registerBtn.textContent = 'Register';
        form.reset();
      }, 800);
    });

    // Live validation to clear messages once corrected
    ['input', 'change'].forEach(evt => {
      form.addEventListener(evt, () => {
        if (confirmPassword && password && confirmPassword.value === password.value) {
          confirmPassword.setCustomValidity('');
        }
        if (terms && terms.checked) {
          terms.setCustomValidity('');
        }
      });
    });
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRegisterForm);
  } else {
    initRegisterForm();
  }
})();
