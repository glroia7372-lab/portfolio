document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header");
  const navLinks = document.querySelectorAll(".nav-menu a");

  // 1. 스크롤 시 헤더 그림자 변경 (입체감 부여)
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.05)";
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

// 1. 프로젝트별 상세 데이터 (link 추가)
const projectDetails = {
  project1: {
    title: "DUST",
    image: "dust.jpg",
    desc: "데이터 시각화 중심의 인터랙티브 미세먼지 알림 서비스 사이트를 구현하였습니다. 사용자에게 실질적인 도움을 줄 수 있는 환경 정보를 디자인적 관점에서 재해석한 프로젝트입니다. API를 활용하여 대기질 정보를 실시간 정보 제공 시스템으로 구현하였으며, 사용자가 접속 즉시 직관적으로 현재 상태를 인지할 수 있도록 설계했습니다. 모바일 우선 디자인 원칙을 바탕으로 기기의 해상도에 구애받지 않는 일관된 사용자 경험을 제공하며, 비주얼적인 심미성과 데이터의 신뢰성을 동시에 확보하는 데 주력했습니다.",
    stack: "#React #TypeScript #Redux",
    link: "https://chemidust.netlify.app/",
  },
  project2: {
    title: "D:ON",
    image: "D_ON.png",
    desc: "D:ON은 대구(Daegu)의 낮(Day)과 밤(Night)을 켠다(ON)는 의미를 담은 대구 관광 정보 플랫폼입니다. 다크모드와 라이트모드를 통해 시각적으로도 낮과 밤을 경험할 수 있으며, 각 테마에 맞는 콘텐츠를 자동으로 제공받을 수 있습니다.",
    stack: "#AI #Node.js #GPT-API",
    link: "https://glroia7372-lab.github.io/D-ON/",
  },
  project3: {
    title: "Round LAB",
    image: "roundLab.jpg",
    desc: "라운드랩(ROUND LAB) 브랜드 아이덴티티 강화를 위한 웹 사이트를 리뉴얼하였습니다. 라운드랩의 핵심 자산인 ‘독도 라인’의 고객 구매 여정을 최적화하기 위해 메인 페이지 큐레이션을 전면 개편했습니다. 깔끔한 디자인 톤앤매너를 유지하면서도 브랜드 이미지를 확실하게 각인시킬 수 있는 그리드 레이아웃을 적용하였으며, 사용자 경험을 고려한 반응형 인터페이스를 통해 제품 주목도를 극대화했습니다.",
    stack: "#PHP #jQuery #Ajax",
    link: "https://test20.dothome.co.kr/roundLab/",
  },
  project4: {
    title: "TONES",
    image: "팀프로젝트_메인화면.png",
    desc: "스마트 웹&콘텐츠 개발 실무에서 활용되는 실무 기술을 활용하여 서버와 연동된 반응형 웹앱 콘텐츠를 개발하고 MCP를 활용한 결제 모듈 구현 및 마케팅 기술을 습득하고 협업을 통한 팀프로젝트를 진행중입니다.",
    stack: "#PHP #jQuery #Ajax",
    link: "https://test20.dothome.co.kr/roundLab/",
  },
};

// 2. 모달 열기 함수
function openModal(projectId) {
  const project = projectDetails[projectId];
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modal-body");

  modalBody.innerHTML = `
    <h2>${project.title}</h2>
    <img src="${project.image}" alt="${project.title}">
    <p class="tech-stack" style="color: #666; font-weight: bold; margin: 15px 0;">${project.stack}</p>
    <p style="margin-bottom: 25px;">${project.desc}</p>
    <a href="${project.link}" target="_blank" class="modal-go-btn">프로젝트 보기 →</a>
  `;

  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // 배경 스크롤 방지
}

// 3. 모달 닫기 함수
function closeModal() {
  const modal = document.getElementById("projectModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // 스크롤 복원
}

// 4. 모달 외부 클릭 시 닫기
window.onclick = function (event) {
  const modal = document.getElementById("projectModal");
  if (event.target === modal) {
    closeModal();
  }
};

// 5. ESC 키로 모달 닫기
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
