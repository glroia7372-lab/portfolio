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

const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".nav-menu");

// 1. 햄버거 메뉴 토글
menu.addEventListener("click", function () {
  menuLinks.classList.toggle("active");
  menu.classList.toggle("is-active");
});

// 2. 메뉴 링크 클릭 시 메뉴 닫기 (사용자 경험 개선)
document.querySelectorAll(".nav-menu a").forEach((n) =>
  n.addEventListener("click", () => {
    menuLinks.classList.remove("active");
    menu.classList.remove("is-active");
  })
);

// 1. 프로젝트별 상세 데이터
const projectDetails = {
  project1: {
    title: "대규모 SPA 리뉴얼",
    image: "dust.jpg",
    desc: "이 프로젝트는 기존의 노후화된 시스템을 현대적인 React 아키텍처로 전환한 사례입니다. Redux를 활용한 상태 관리 최적화로 로딩 속도를 40% 개선했습니다.",
    stack: "#React #TypeScript #Redux",
  },
  project2: {
    title: "AI 기반 코드 어시스턴트",
    image: "D-ON.jpg",
    desc: "ChatGPT API와 Cursor를 활용하여 팀 내 개발 생산성을 높이는 도구를 구축했습니다. 반복적인 코드 작성을 자동화하여 업무 효율을 극대화했습니다.",
    stack: "#AI #Node.js #GPT-API",
  },
  project3: {
    title: "PHP 레거시 연동 인터페이스",
    image: "roundLab.jpg",
    desc: "기존 PHP 기반의 백엔드 환경에서 최신 UI를 구현하기 위해 Ajax 통신을 최적화하고 사용자 경험을 개선한 프로젝트입니다.",
    stack: "#PHP #jQuery #Ajax",
  },
};

// 2. 모달 열기 함수
function openModal(projectId) {
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modal-body");
  const data = projectDetails[projectId];

  modalBody.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.image}" alt="${data.title}">
        <p><strong>기술 스택:</strong> ${data.stack}</p>
        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
        <p>${data.desc}</p>
    `;

  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // 스크롤 방지
}

// 3. 모달 닫기 함수
function closeModal() {
  const modal = document.getElementById("projectModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // 스크롤 재개
}

// 4. 모달 바깥 영역 클릭 시 닫기
window.onclick = function (event) {
  const modal = document.getElementById("projectModal");
  if (event.target == modal) {
    closeModal();
  }
};
