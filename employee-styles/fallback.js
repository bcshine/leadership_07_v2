/**
 * 직원 스타일 버튼 기능의 백업 스크립트
 * 모듈 로딩이 실패할 경우를 대비한 안전장치입니다.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Fallback script loaded for employee styles');
    
    // 3초 후에 버튼이 여전히 작동하지 않으면 직접 이벤트 리스너 추가
    setTimeout(() => {
        const employeeStyleBtn = document.getElementById('employee-style-btn');
        const employeeStyles = document.getElementById('employee-styles');
        
        console.log('Fallback check - Button:', employeeStyleBtn ? 'found' : 'not found', 
                   'Container:', employeeStyles ? 'found' : 'not found', 
                   'Hidden:', employeeStyles ? employeeStyles.classList.contains('hidden') : 'N/A');
        
        // 이미 hidden 클래스가 제거되었는지 확인 (즉, 다른 스크립트가 이미 작동했는지)
        if (employeeStyleBtn && employeeStyles && employeeStyles.classList.contains('hidden')) {
            console.log('Applying fallback employee styles functionality');
            
            // 컨테이너에 이벤트 리스너가 등록되었는지 확인하는 테스트 클릭
            let btnWorks = false;
            
            const testHandler = () => { btnWorks = true; };
            employeeStyleBtn.addEventListener('click', testHandler);
            employeeStyleBtn.click();
            employeeStyleBtn.removeEventListener('click', testHandler);
            
            if (!btnWorks) {
                console.log('Button is not working, attaching event listener');
                
                employeeStyleBtn.addEventListener('click', function() {
                    console.log('Fallback: Employee style button clicked');
                    
                    // 컨테이너 표시/숨김 토글
                    employeeStyles.classList.toggle('hidden');
                    
                    // 표시될 때 애니메이션 적용
                    if (!employeeStyles.classList.contains('hidden')) {
                        this.textContent = '직원 스타일 닫기';
                        
                        // 컨테이너가 비어 있는지 확인
                        if (!employeeStyles.querySelector('.employee-style-container')) {
                            console.log('Creating container and redirecting');
                            
                            // 컨테이너 생성
                            const container = document.createElement('div');
                            container.className = 'employee-style-container';
                            employeeStyles.appendChild(container);
                            
                            // 직원 스타일 페이지로 직접 이동하는 버튼 추가
                            const styleTypes = ['불만형', '정보독점형', '무기력형', '자율과잉형', '지시대기형', 
                                              '무책임형', '관심요구형', '감정기복형', '이기적형', '은근한반항형'];
                            
                            styleTypes.forEach(type => {
                                const link = document.createElement('a');
                                link.href = `employee-styles/${type}.html`;
                                link.className = 'employee-style-link fade-in';
                                link.textContent = `${type} 직원 유형`;
                                container.appendChild(link);
                            });
                        }
                        
                        // 애니메이션 적용
                        setTimeout(() => {
                            const styleElements = document.querySelectorAll('#employee-styles .fade-in');
                            styleElements.forEach((element, index) => {
                                setTimeout(() => {
                                    element.classList.add('appear');
                                }, 100 * index);
                            });
                        }, 100);
                    } else {
                        // 카드 숨기기 전에 모든 카드의 애니메이션 클래스 제거
                        const styleElements = document.querySelectorAll('#employee-styles .fade-in');
                        styleElements.forEach(element => {
                            element.classList.remove('appear');
                        });
                        
                        this.textContent = '직원 스타일 알아보기';
                    }
                });
            }
        }
    }, 3000); // 3초 후 실행
}); 