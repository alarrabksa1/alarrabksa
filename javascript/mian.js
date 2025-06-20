// تهيئة جميع المكونات عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initSlider();
  initStats();
});

// تهيئة القائمة الجانبية والقوائم المنسدلة
function initNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const closeSidebar = document.querySelector(".close-sidebar");
  const dropdownBtns = document.querySelectorAll(".sidebar-dropdown-btn");
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  // فتح القائمة الجانبية
  menuToggle?.addEventListener("click", () => {
    menuToggle.classList.add("active");
    sidebar.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // إغلاق القائمة الجانبية
  closeSidebar?.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    sidebar.classList.remove("active");
    document.body.style.overflow = "";
  });

  // إغلاق القائمة عند النقر خارجها
  document.addEventListener("click", (e) => {
    if (!sidebar?.contains(e.target) && !menuToggle?.contains(e.target)) {
      menuToggle?.classList.remove("active");
      sidebar?.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // التحكم في القوائم المنسدلة
  dropdownBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = btn.parentElement;

      // إغلاق القوائم المنسدلة الأخرى
      dropdownBtns.forEach((otherBtn) => {
        const otherParent = otherBtn.parentElement;
        if (otherParent !== parent) {
          otherParent.classList.remove("active");
        }
      });

      // تبديل حالة القائمة الحالية
      parent.classList.toggle("active");

      // تمرير الصفحة للقائمة المنسدلة إذا كانت خارج نطاق الرؤية
      const dropdownMenu = parent.querySelector(".sidebar-dropdown-menu");
      if (dropdownMenu && parent.classList.contains("active")) {
        const dropdownRect = dropdownMenu.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();

        if (dropdownRect.bottom > sidebarRect.bottom) {
          sidebar.scrollTo({
            top:
              sidebar.scrollTop +
              (dropdownRect.bottom - sidebarRect.bottom + 20),
            behavior: "smooth",
          });
        }
      }
    });
  });

  // تحديث الروابط النشطة
  sidebarLinks.forEach((link) => {
    if (link.getAttribute("href") === window.location.pathname) {
      link.classList.add("active");
    }

    link.addEventListener("click", () => {
      sidebarLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // إغلاق القائمة عند تغيير حجم النافذة
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      menuToggle.classList.remove("active");
      sidebar.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// تهيئة السلايدر
function initSlider() {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(n) {
    slides.forEach((slide) => slide.classList.remove("active"));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  // تغيير الشريحة
  window.changeSlide = function (n) {
    showSlide(currentSlide + n);
    resetSlideInterval();
  };

  // بدء التغيير التلقائي
  function startSlideInterval() {
    slideInterval = setInterval(() => changeSlide(1), 5000);
  }

  // إعادة تعيين المؤقت
  function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
  }

  // تهيئة السلايدر إذا وجدت شرائح
  if (slides.length > 0) {
    showSlide(0);
    startSlideInterval();
  }
}

// تهيئة الإحصائيات
function initStats() {
  const stats = document.querySelectorAll(".stat-number");
  let hasAnimated = false;

  // مراقبة ظهور الإحصائيات في نطاق الرؤية
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateStats();
          hasAnimated = true;
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  // تحريك الأرقام
  function animateStats() {
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target"));
      let current = 0;
      const increment = target / 100;
      const duration = 2000; // مدة الحركة بالميللي ثانية
      const steps = duration / 20; // عدد خطوات الحركة
      const step = target / steps;

      const updateCounter = () => {
        if (current < target) {
          current += step;
          stat.textContent = Math.min(Math.round(current), target);
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    });
  }

  // بدء المراقبة إذا وجدت إحصائيات
  if (stats.length > 0) {
    observer.observe(stats[0].parentElement);
  }
}
