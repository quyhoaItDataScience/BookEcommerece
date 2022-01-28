import { initializeApp } from "firebase/app";
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { async } from "@firebase/util";
import { validate } from "schema-utils";

const firebaseConfig = {
  apiKey: "AIzaSyA_XLTHoI8Pe5JfObcCX0_oFZ579c5GUCc",
  authDomain: "book-website-1d707.firebaseapp.com",
  databaseURL: "https://formData.firebaseio.com",
  projectId: "book-website-1d707",
  storageBucket: "book-website-1d707.appspot.com",
  messagingSenderId: "1051732160298",
  appId: "1:1051732160298:web:ab316ac0f815b8cfc9b853",
  measurementId: "G-SBNW3XMWJ7",
};
// Firebase variables
const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
const db = getFirestore();
const formDataRef = collection(db, "formData");

const btnSubmit = getElement(".btn-sign");

//Reference message collection

const formSign = getElement("#form-login");
const email = getElement("#email");
const password = getElement("#password");
const confirmPass = getElement("#confirm-password");
const message = getElement("#message");

btnSubmit.addEventListener("click", submitForm);

// Async function
async function submitForm(e) {
  e.preventDefault();
  validateForm();
  const emailInput = email.value;
  const passwordInput = password.value;
  const messageInput = message.value;
  console.log(email.value);
  console.log(password.value);
  console.log(message.value);
  await setDoc(doc(formDataRef, emailInput), {
    email: emailInput,
    password: passwordInput,
    message: messageInput,
  });

  formSign.reset();
}
function validateForm() {
  checkRequired([email, password, confirmPass, message]);
  validateEmail(email);
  checkLength(password, 6, 20);
  checkPasswordMatch(password, confirmPass);
  checkMessage(message);
}
const checkRequired = (arrSelector) => {
  arrSelector.forEach((selector) => {
    if (selector.value.trim() === "") {
      showError(selector, `Please type something! 🥺`);
    }
  });
};
const showError = (selector, message) => {
  const messageEle = selector.nextElementSibling;

  messageEle.classList.add("error");
  messageEle.classList.add("visibility");
  messageEle.innerText = message;
  setTimeout(() => {
    messageEle.classList.remove("error");
    messageEle.classList.remove("visibility");
  }, 2500);
};

const showSuccess = (selector, message) => {
  const messageEle = selector.nextElementSibling;
  messageEle.classList.add("success");
  messageEle.classList.add("visibility");
  messageEle.innerText = message;
  setTimeout(() => {
    messageEle.classList.remove("success");
    messageEle.classList.remove("visibility");
  }, 2500);
};
const checkLength = (selector, min, max) => {
  const input = selector.value;
  if (input.trim().length < min) {
    showError(
      selector,
      `${getFieldName(selector)} must be at least ${min} characters 🤦‍♂️`
    );
  } else if (input.trim().length > max) {
    showError(
      selector,
      `${getFieldName(selector)} must be less than ${max} characters 🤦‍♂️`
    );
  } else {
    showSuccess(selector, "thank you!😘😘😘");
  }
};
const checkPasswordMatch = (selector1, selector2) => {
  const input1 = selector1.value;
  const input2 = selector2.value;
  if (input1 !== input2) {
    showError(selector1, "Password does not match 🚫");
    showError(selector2, "Password does not match 🚫");
  } else if (input1.length > 0 && input2.length > 0 && input1 === input2) {
    showSuccess(selector1, "Pasword match 😉");
    showSuccess(selector2, "Pasword match 😉");
  }
};
const validateEmail = (selector) => {
  const input = selector.value.trim();
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(input)) {
    showSuccess(selector, "Valid Email 🥉");
  } else {
    showError(selector, "Email is invalid! ❌");
  }
};
const checkMessage = (selector) => {
  if (selector.value.trim().length > 0) {
    showSuccess(selector, "Thank you for your dedication 😘");
  }
};
const getFieldName = (selector) => {
  return selector.id.charAt(0).toUpperCase() + selector.id.slice(1);
};
// Dom varables
const loginIcon = document.querySelector(".fa-user");
const loginDOM = document.querySelector(".login");
const closeLogin = document.querySelector(".btn-close--login");
const searchIcon = document.querySelector("#search-icon");
const searchForm = document.getElementById("search-form");

const btnClose = document.querySelector(".btn-close");
const badge = document.querySelector(".badge");
const cartBtn = getElement(".shopping-cart");
const checkoutItems = getElement(".checkout-items");
const featureWrapper = getElement(".feature-wrapper");

// Data books
const books = [
  {
    id: 1,
    name: "Harry Potter",
    img: "../dist/image/book-1.png",
    price: 15.99,
  },
  {
    id: 2,
    name: "Harry Potter",
    img: "../dist/image/book-2.png",
    price: 15.99,
  },
  {
    id: 3,
    name: "Harry Potter",
    img: "../dist/image/book-3.png",
    price: 15.99,
  },
  {
    id: 4,
    name: "Harry Potter",
    img: "../dist/image/book-4.png",
    price: 15.99,
  },
  {
    id: 5,
    name: "Harry Potter",
    img: "../dist/image/book-8.png",
    price: 15.99,
  },
  {
    id: 6,
    name: "Harry Potter",
    img: "../dist/image/book-7.png",
    price: 15.99,
  },
  {
    id: 7,
    name: "Harry Potter",
    img: "../dist/image/book-2.png",
    price: 15.99,
    amount: 1,
  },
  {
    id: 8,
    name: "Harry Potter",
    img: "../dist/image/book-3.png",
    price: 15.99,
  },
  {
    id: 9,
    name: "Harry Potter",
    img: "../dist/image/book-5.png",
    price: 15.99,
  },
];

function getElement(element) {
  return document.querySelector(element);
}

window.addEventListener("scroll", () => {
  const pageYOffset = window.pageYOffset;
  const header1 = document.querySelector(".header-1");
  const header2 = document.querySelector(".header-2");
  if (pageYOffset > header1.clientHeight) {
    header2.classList.add("stick-top");
  } else {
    header2.classList.remove("stick-top");
  }
});

loginIcon.addEventListener("click", () => {
  loginDOM.classList.add("translate-x0");
});

closeLogin.addEventListener("click", () => {
  loginDOM.classList.remove("translate-x0");
});

searchIcon.addEventListener("click", () => {
  searchForm.style.width = "50rem";
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchForm.style.width = "0";
});

closeLogin.addEventListener("click", () => {
  loginDOM.classList.remove("translate-x0");
});

cartBtn.addEventListener("click", () => {
  const checkoutContainer = getElement(".checkout-container");
  checkoutContainer.classList.add("translate-x0");
  checkoutContainer.parentElement.classList.add("translate-x0");
});

btnClose.addEventListener("click", () => {
  const checkoutContainer = getElement(".checkout-container");
  checkoutContainer.classList.remove("translate-x0");
  checkoutContainer.parentElement.classList.remove("translate-x0");
});

// Swiper js
var swiper = new Swiper(".books-slider", {
  loop: true,
  centeredSlides: true,
  spaceBetween: 5,
  autoplay: {
    delay: 9500,
    disableOnInteraction: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 1,
    },
  },
});

var swiper = new Swiper(".featured-slide", {
  slidesPerView: 4,
  spaceBetween: 12,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },

    1024: {
      slidesPerView: 3,
    },
  },
});
var swiper = new Swiper(".arrival-swiper", {
  slidesPerView: 3,
  spaceBetween: 10,

  autoplay: {
    delay: 1500,
    disableOnInteraction: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
var swiper = new Swiper(".client-swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: false,
  slidesPerView: "auto",
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
});
var swiper = new Swiper(".blog-swiper", {
  loop: false,
  slidesPerView: 3,
  spaceBetween: 20,
  grabCursor: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
let cart = [];
class Storage {
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    } else {
      cart = [];
      return cart;
    }
  }
  static getBook(id) {
    let book = books.find((book) => book.id === id);
    return book;
  }
}

class UI {
  displayBooks() {
    books.forEach((book) => {
      const { id, img, price } = book;
      const div = document.createElement("div");
      div.className = "swiper-slide feature-box";
      div.innerHTML = `
      <div class="feature-icons">
        <a href="#" class="fas fa-search"></a>
        <a href="#" class="fas fa-heart"></a>
        <a href="#" class="fas fa-eye"></a>
      </div>
      <div class="feature-img">
        <img src=${img} alt="" />
      </div>
      <div class="feature-content">
        <h3 class="feature-title">featured book</h3>
        <p>${price}VND<span>20VND</span></p>
        <button class="btn d-iblock btn-cart" data-id=${id}
        >add to cart</button>
      </div>
      `;
      featureWrapper.appendChild(div);
    });
  }
  formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }

  updateDOM() {
    cart = Storage.getCart("cart");
    cart.forEach((item) => {
      const { id, img, price, name } = item;
      const btnCart = [...document.querySelectorAll(".btn-cart")];
      btnCart.forEach((btn) => {
        if (parseInt(btn.dataset.id) === id) {
          btn.innerText = "Already added";
          btn.disabled = true;
        }
      });
      const div = document.createElement("div");
      div.className = "checkout-item";
      div.innerHTML = `
      <img src="${img}" class="book-img" alt="" />
      <div class="product-info">
      <h3 class="book-name">${name}</h3>
      <p class="price">$${price}</p>
      </div>
      <div class="product-icons">
      <i class="fas fa-arrow-up i-increase" data-id=${id}></i>
      <span class="amount">1</span>
      <i class="fas fa-arrow-down i-decrease" data-id=${id}></i>
      </div>
      `;
      checkoutItems.insertBefore(div, checkoutItems.firstElementChild);
    });
    this.updatePriceTotal(cart);
    this.updateCartValue(cart);
    this.addCartFunctionality();
  }
  updatePriceTotal(cart) {
    let total = 0;
    total = cart.reduce((acc, val) => (acc += val.price), 0);
    const totalPrice = document.querySelector(".total-price");
    totalPrice.innerText = `${this.formatMoney(total)}`;
  }
  addCartItem(id) {
    let bookToAdd = books.find((item) => item.id === parseInt(id));
    bookToAdd = { ...bookToAdd, amount: 1 };

    cart.push(bookToAdd);
    Storage.saveCart(cart);

    this.addToCart(cart, id);
    this.addToCartDOM(cart, id);
    this.updateCartValue(cart);
  }

  addToCart(cart, id) {
    badge.innerText = `${cart.length}`;
    const btnCart = [...document.querySelectorAll(".btn-cart")];
    // Change text and disabled btn when added in cart
    btnCart.forEach((btn) => {
      if (btn.dataset.id === id) {
        btn.innerText = "Already added";
        btn.disabled = true;
      }
    });
  }
  addToCartDOM(cart, id) {
    let bookToAdd = cart.find((item) => parseInt(item.id) === parseInt(id));
    console.log(bookToAdd);

    const { price, name, img, amount } = bookToAdd;

    const div = document.createElement("div");
    div.className = "checkout-item";
    div.innerHTML = `
      <img src="${img}" class="book-img" alt="" />
      <div class="product-info">
        <h3 class="book-name">${name}</h3>
        <p class="price">$${price}</p>
      </div>
      <div class="product-icons">
        <i class="fas fa-arrow-up i-increase" data-id=${id}></i>
        <span class="amount">${amount}</span>
        <i class="fas fa-arrow-down i-decrease" data-id=${id}></i>
      </div>
      `;
    checkoutItems.insertBefore(div, checkoutItems.firstElementChild);
  }
  updateCartValue(cart) {
    let totalAmount = 0;
    let totalPrice = 0;
    totalAmount = cart.reduce((acc, val) => (acc += val.amount), 0);
    totalPrice = cart.reduce((acc, val) => (acc += val.price * val.amount), 0);

    const totalPriceDOM = document.querySelector(".total-price");
    totalPriceDOM.innerText = `${this.formatMoney(totalPrice)}`;
    const totalAmountDOM = getElement("#cartCount");
    totalAmountDOM.innerText = `${totalAmount}`;
    console.log("Total amount:", totalAmount);
  }
  addCartFunctionality() {
    checkoutItems.addEventListener("click", (e) => {
      const element = e.target;
      if (element.classList.contains("btn-clear")) {
        console.log("clear");
        cart = [];

        Storage.saveCart(cart);
        this.updateCartValue(cart);
        while (checkoutItems.children) {
          if (checkoutItems.children.length === 1) {
            break;
          }
          checkoutItems.removeChild(checkoutItems.children[0]);
        }
        const btnCart = [...document.querySelectorAll(".btn-cart")];
        btnCart.forEach((btn) => {
          btn.innerText = "Add to cart";
          btn.disabled = false;
        });
      } else if (element.classList.contains("i-increase")) {
        const id = parseInt(element.dataset.id);

        cart.forEach((item) => {
          if (parseInt(item.id) === id) {
            item.amount++;
            console.log(item.amount);
            element.nextElementSibling.innerText = `${item.amount}`;
            Storage.saveCart(cart);
            this.updateCartValue(cart);
          }
        });
      } else if (element.classList.contains("i-decrease")) {
        const id = parseInt(element.dataset.id);
        cart.forEach((item) => {
          if (parseInt(item.id) === id) {
            if (item.amount === 1) {
              element.parentElement.parentElement.remove();
              cart = cart.filter((item) => parseInt(item.id) !== id);
              Storage.saveCart(cart);
              this.updateCartValue(cart);
              const btnCart = [...document.querySelectorAll(".btn-cart")];
              btnCart.forEach((btn) => {
                if (parseInt(btn.dataset.id) === id) {
                  btn.innerText = "Add to cart";
                  btn.disabled = false;
                }
              });
            } else {
              item.amount--;
              element.previousElementSibling.innerText = `${item.amount}`;
              console.log(cart);
              Storage.saveCart(cart);
              this.updateCartValue(cart);
            }
          }
        });
      }
    });
  }
}

const ui = new UI();

window.addEventListener("DOMContentLoaded", () => {
  ui.displayBooks();
  ui.updateDOM();
  const btnCart = [...document.querySelectorAll(".btn-cart")];

  btnCart.forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentId = btn.dataset.id;
      ui.addCartItem(currentId);
    });
  });
});
