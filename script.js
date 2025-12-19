document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  const navLinks = document.querySelectorAll(".nav-menu a");

  // 1. 스크롤 시 헤더 그림자 변경 (입체감 부여)
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.5)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  // 2. 부드러운 스크롤링 기능
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.hash !== "") {
        e.preventDefault();
        const hash = this.hash;
        const targetElement = document.querySelector(hash);

        if (targetElement) {
          const headerHeight = header.offsetHeight;
          // 헤더 높이만큼 덜 스크롤되게 조정
          const targetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // 모바일 환경에서 네비게이션 닫기 기능 등을 추가할 수 있습니다.
        }
      }
    });
  });

  // 3. (옵션) Intersection Observer를 사용한 스크롤 등장 애니메이션 (AOS)
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2, // 요소가 20% 보일 때 작동
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 애니메이션 적용할 요소들 (CSS에 is-visible 정의 필요)
  document
    .querySelectorAll(".section-title, .skill-card, .project-card")
    .forEach((element) => {
      element.classList.add("animate-on-scroll");
      observer.observe(element);
    });

  // 추가 CSS 예시 (style.css에 추가):
  /*
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    .animate-on-scroll.is-visible {
        opacity: 1;
        transform: translateY(0);
    }
    */
});
