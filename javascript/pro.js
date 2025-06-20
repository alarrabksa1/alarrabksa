      function changeImage(thumb) {
        // تغيير الصورة الرئيسية
        const mainImage = document.querySelector(".main-image");
        mainImage.style.opacity = 0;
        setTimeout(() => {
          mainImage.src = thumb.src;
          mainImage.style.opacity = 1;
        }, 300);

        // إدارة الحالة النشطة للصور المصغرة
        document.querySelectorAll(".product-thumbnails img").forEach((img) => {
          img.classList.remove("active");
        });
        thumb.classList.add("active");
      }

      // تفعيل تأثير التحميل الأولي للصورة
      window.addEventListener("load", () => {
        document.querySelector(".main-image").style.opacity = 1;
      });



      

      