'use strict';

// 스크롤 하면 navbar 메뉴 상단바 나타나게 하기
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// navbar 메뉴 클릭 하면 해당 스크롤 뷰로 이동 하기
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;

  if (link === null) {
    return;
  }
  scrollIntoView(link);
});

// 스크롤 했을때 home 컨데이너 투명도 조절 하기
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight; //
});

// 스크롤이 할 때 arrow 버튼 보이게 하기
const arrowBtn = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowBtn.classList.add('visible');
  } else {
    arrowBtn.classList.remove('visible');
  }
});

// arrow 버튼 누르면 home 섹션으로 이동
arrowBtn.addEventListener('click', () => {
  scrollIntoView('#home');
});

// works 카테고리 버튼 누르면 해당 프로젝트만 나올 수 있게 만들기
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  //이전 클릭 된 효과에서 다음 클릭 된 효과로 넘겨주기(카테고리 버튼 선택자 변경)
  const active = document.querySelector('.category__btn.active');
  active.classList.remove('active');
  const target =
    event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
  target.classList.add('active');

  projectContainer.classList.add('animation-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === '*' || filter === project.dataset.filter) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('animation-out');
  }, 300);
});

// *
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
