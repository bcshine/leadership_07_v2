/**
 * 페이지 애니메이션 효과를 처리하는 모듈
 */

const Effects = {
    /**
     * 애니메이션 효과 초기화
     */
    init() {
        this.setupFadeInAnimation();
    },
    
    /**
     * 페이드인 애니메이션 설정
     */
    setupFadeInAnimation() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
};

export default Effects; 