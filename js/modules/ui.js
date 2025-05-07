/**
 * UI 관련 기능을 처리하는 모듈
 */

const UI = {
    /**
     * UI 이벤트 초기화
     */
    init() {
        this.elements = {
            menuToggle: document.querySelector('.menu-toggle'),
            navMenu: document.querySelector('.nav-menu')
        };
        
        this.setupMobileMenu();
        this.setupScrollSpy();
    },
    
    /**
     * 모바일 메뉴 기능 설정
     */
    setupMobileMenu() {
        const { menuToggle, navMenu } = this.elements;
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
            
            // 네비게이션 메뉴 항목 클릭 시 모바일 메뉴 닫기
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 992) {
                        navMenu.classList.remove('active');
                    }
                });
            });
        }
    },
    
    /**
     * 스크롤 스파이 기능 설정
     */
    setupScrollSpy() {
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section');
            const navItems = document.querySelectorAll('.nav-menu a');
            
            let currentSection = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').substring(1) === currentSection) {
                    item.classList.add('active');
                }
            });
        });
    }
};

export default UI; 