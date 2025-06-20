// تهيئة القائمة الجانبية
function initSidebar() {
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const closeSidebar = document.querySelector(".close-sidebar");

  if (menuToggle && sidebar && closeSidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.add("active");
      menuToggle.classList.add("active");
    });

    closeSidebar.addEventListener("click", () => {
      sidebar.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  }
}

// تهيئة القوائم المنسدلة
function initDropdowns() {
  const dropdownBtns = document.querySelectorAll(".sidebar-dropdown-btn");

  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const dropdownContent = this.nextElementSibling;
      const icon = this.querySelector(".dropdown-icon");

      this.classList.toggle("active");
      if (icon) {
        icon.style.transform = this.classList.contains("active")
          ? "rotate(180deg)"
          : "rotate(0)";
      }

      if (dropdownContent) {
        dropdownContent.style.maxHeight = this.classList.contains("active")
          ? dropdownContent.scrollHeight + "px"
          : "0";
      }
    });
  });
}

// تهيئة التمرير السلس
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

// كشف التمرير وتغيير الهيدر
function initHeaderScroll() {
  const header = document.querySelector(".header-container");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("scroll-up");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !header.classList.contains("scroll-down")
    ) {
      header.classList.remove("scroll-up");
      header.classList.add("scroll-down");
    } else if (
      currentScroll < lastScroll &&
      header.classList.contains("scroll-down")
    ) {
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
  });
}

// تهيئة جميع المكونات
document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initDropdowns();
  initSmoothScroll();
  initHeaderScroll();
});
