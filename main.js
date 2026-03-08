"use strict";

function $(id){
  return document.getElementById(id);
}

function showMessage(el, type, text){
  if(!el) return;
  el.className = "message " + type;
  el.textContent = text;
}

function playSound(id){
  const sound = $(id);
  if(!sound) return;

  sound.currentTime = 0;
  sound.play().catch(() => {});
}

/* Active page link */
(function setActiveNav(){
  const file = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("a.nav-link, .navbar a").forEach(a => {
    const href = a.getAttribute("href");
    if(href === file){
      a.classList.add("active");
    }
  });
})();

/* Click sound on page links */
document.querySelectorAll(".navbar a, a.nav-link").forEach(link => {
  link.addEventListener("click", () => {
    playSound("clickSound");
  });
});

/* Burger menu for pages */
const menuToggle = $("menuToggle");
const mainNav = $("mainNav");

if(menuToggle && mainNav){
  menuToggle.addEventListener("click", () => {
    playSound("clickSound");

    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    if(mainNav && mainNav.classList.contains("open")){
      mainNav.classList.remove("open");
      if(menuToggle){
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });
});

/* Home tools dropdown */
const toolsToggle = $("toolsToggle");
const toolsList = $("toolsList");

if(toolsToggle && toolsList){
  toolsToggle.addEventListener("click", () => {
    playSound("clickSound");

    const isOpen = toolsList.classList.toggle("open");
    toolsToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (e) => {
    if(!toolsToggle.contains(e.target) && !toolsList.contains(e.target)){
      toolsList.classList.remove("open");
      toolsToggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* Background toggle */
const bgBtn = $("bgBtn");
if(bgBtn){
  bgBtn.addEventListener("click", () => {
    playSound("clickSound");
    document.body.classList.toggle("alt-bg");
    document.body.classList.toggle("darkmode");
  });
}

/* Read intro */
const ttsBtn = $("ttsBtn");
if(ttsBtn){
  ttsBtn.addEventListener("click", () => {
    playSound("clickSound");

    const text = $("ttsText")?.innerText?.trim();
    if(!text) return;

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  });
}

/* Read all page */
const readAllBtn = $("readAllBtn");
if(readAllBtn){
  readAllBtn.addEventListener("click", () => {
    playSound("clickSound");

    const main = document.querySelector("main");
    if(!main) return;

    const text = main.innerText.trim();
    if(!text) return;

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  });
}

/* Stop reading */
const stopReadBtn = $("stopReadBtn");
if(stopReadBtn){
  stopReadBtn.addEventListener("click", () => {
    playSound("clickSound");
    window.speechSynthesis.cancel();
  });
}

/* Booking form */
const bookingForm = $("bookingForm");
if(bookingForm){
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("name").value.trim();
    const email = $("email").value.trim();
    const date = $("date").value;
    const service = $("service").value;
    const notes = $("notes").value.trim();
    const msg = $("bookingMessage");

    if(name.length < 3){
      showMessage(msg, "error", "Name must be at least 3 characters.");
      $("name").focus();
      return;
    }

    if(!email.includes("@") || !email.includes(".")){
      showMessage(msg, "error", "Please enter a valid email address.");
      $("email").focus();
      return;
    }

    if(!date){
      showMessage(msg, "error", "Please choose a booking date.");
      $("date").focus();
      return;
    }

    if(service === ""){
      showMessage(msg, "error", "Please choose a service.");
      $("service").focus();
      return;
    }

    const bookingData = {
      name,
      email,
      date,
      service,
      notes,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("lastBooking", JSON.stringify(bookingData));
    showMessage(msg, "success", "Your booking request has been sent successfully ✅");
    playSound("successSound");
    bookingForm.reset();
  });
}

const loadBtn = $("loadBookingBtn");
if(loadBtn){
  loadBtn.addEventListener("click", () => {
    playSound("clickSound");

    const msg = $("bookingMessage");
    const raw = localStorage.getItem("lastBooking");

    if(!raw){
      showMessage(msg, "error", "No saved booking found yet.");
      return;
    }

    const data = JSON.parse(raw);
    showMessage(msg, "success", `Last booking: ${data.name} | ${data.service} | ${data.date}`);
  });
}

/* Contact form */
const contactForm = $("contactForm");
if(contactForm){
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("cname").value.trim();
    const email = $("cemail").value.trim();
    const message = $("cmsg").value.trim();
    const msg = $("contactMessage");

    if(name.length < 3){
      showMessage(msg, "error", "Name must be at least 3 characters.");
      $("cname").focus();
      return;
    }

    if(!email.includes("@") || !email.includes(".")){
      showMessage(msg, "error", "Please enter a valid email address.");
      $("cemail").focus();
      return;
    }

    if(message.length < 10){
      showMessage(msg, "error", "Message must be at least 10 characters.");
      $("cmsg").focus();
      return;
    }

    showMessage(msg, "success", "Your message has been sent successfully ✅");
    playSound("successSound");
    contactForm.reset();
  });
}