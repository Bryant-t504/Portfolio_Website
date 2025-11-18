'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}






// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


//contact form submission handling

  const submitBtn = document.querySelector('[data-form-btn]');

  // Create feedback text element (green/red)
  const formMsg = document.createElement("p");
  formMsg.style.marginTop = "10px";
  formMsg.style.fontSize = "14px";
  formMsg.style.display = "none";
  form.after(formMsg);

  // Loading spinner style inside button
  const originalBtnHTML = submitBtn.innerHTML;
  const loadingHTML = `
    <ion-icon name="sync-outline" class="spin"></ion-icon>
    <span>Sending...</span>
  `;

  // Add spin animation CSS
  const style = document.createElement("style");
  style.innerHTML = `
    .spin {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from {transform: rotate(0);}
      to {transform: rotate(360deg);}
    }
  `;
  document.head.appendChild(style);


  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = form.fullname.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!fullname || !email || !message) {
      showMessage("Please fill in all fields 😅", "red");
      return;
    }

    // disable button + add spinner
    submitBtn.disabled = true;
    submitBtn.innerHTML = loadingHTML;

    // EmailJS Send
    emailjs.send("service_bczo5kd", "template_88pc5mf", {
      fullname: fullname,
      email: email,
      message: message
    })
    .then(() => {
      showMessage("Message delivered successfully 👌🔥", "green");
      form.reset();
      resetButton();
    })
    .catch(() => {
      showMessage("Something broke 😭 Try again.", "red");
      resetButton();
    });
  });


  function resetButton() {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;
  }

  function showMessage(text, color) {
    formMsg.style.display = "block";
    formMsg.style.color = color;
    formMsg.textContent = text;

    setTimeout(() => formMsg.style.display = "none", 4000);
  }




