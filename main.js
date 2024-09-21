const swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  effect: "slide",
  loop: true,
});

const burger = document.querySelector(".burger");
const nav = document.querySelector(".menu__list");
const navLinks = document.querySelectorAll(".menu__item");

burger.addEventListener("click", () => {
    // Toggle Nav
    nav.classList.toggle("nav-active");
    
    // Toggle burger active class
    burger.classList.toggle("burger-active");

    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = "";
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Burger Animation
    burger.classList.toggle("toggle");
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const loginInput = document.getElementById('login');
  const emailInput = document.getElementById('email');
  const textInput = document.getElementById('text');
  const checkboxInput = document.getElementById('formAgreement');
  const submitButton = document.querySelector('.form__button');

  const loginError = document.getElementById('loginError');
  const emailError = document.getElementById('emailError');
  const textError = document.getElementById('textError');
  const checkboxError = document.getElementById('checkboxError');

  submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (validateForm()) {
      submitForm();
    }
  });

  function validateForm() {
    let isValid = true;

    // Валідація імені
    if (loginInput.value.trim() === '') {
      loginError.textContent = "Name is required";
      isValid = false;
    } else {
      loginError.textContent = '';
    }

    // Валідація email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
      emailError.textContent = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
      emailError.textContent = 'Enter a valid email';
      isValid = false;
    } else {
      emailError.textContent = '';
    }

    // Перевірка чекбокса
    if (!checkboxInput.checked) {
      checkboxError.textContent = 'You must agree to the privacy policy';
      isValid = false;
    } else {
      checkboxError.textContent = '';
    }

    return isValid;
  }

  async function submitForm() {
    const formData = new FormData(form);

    try {
      const response = await fetch('http://localhost/sendmail.php', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        alert('The form has been sent successfully!');
        form.reset();
      } else {
        alert(data.error || 'An error occurred while submitting the form. Try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form. Try again.');
    }
  }
});


