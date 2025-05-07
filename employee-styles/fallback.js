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
                            console.log('Creating cards container');
                            
                            // 컨테이너 생성
                            const container = document.createElement('div');
                            container.className = 'employee-style-container';
                            employeeStyles.appendChild(container);
                            
                            // 직원 스타일 데이터를 직접 처리
                            const employeeStylesData = [
                                {
                                    type: "불만형",
                                    title: "불만형 직원",
                                    traits: [
                                        "항상 불만을 표현하고 부정적인 면을 강조함",
                                        "문제 해결보다 문제 지적에 집중함",
                                        "다른 팀원들의 사기를 저하시킴"
                                    ],
                                    solutions: [
                                        "구체적인 해결책을 함께 고민하도록 유도",
                                        "긍정적인 측면을 균형 있게 볼 수 있도록 코칭",
                                        "건설적인 피드백 방식 훈련"
                                    ]
                                },
                                {
                                    type: "정보독점형",
                                    title: "정보독점형 직원",
                                    traits: [
                                        "중요한 정보를 혼자만 알고 공유하지 않음",
                                        "자신의 업무 과정을 불투명하게 유지함",
                                        "팀 협업을 방해하는 사일로 형성"
                                    ],
                                    solutions: [
                                        "정보 공유의 중요성과 이점 교육",
                                        "팀 미팅에서 지식 공유 시간 마련",
                                        "투명성에 대한 보상 체계 구축"
                                    ]
                                },
                                {
                                    type: "무기력형",
                                    title: "무기력형 직원",
                                    traits: [
                                        "스스로 결정을 내리지 못하고 주저함",
                                        "업무에 대한 열정과 에너지가 부족함",
                                        "항상 지시를 기다리고 수동적으로 행동함"
                                    ],
                                    solutions: [
                                        "작은 성공 경험을 통한 자신감 구축",
                                        "명확한 목표와 기대치 설정",
                                        "점진적으로 의사결정 권한 부여"
                                    ]
                                }
                            ];
                            
                            // 직원 스타일 카드 생성
                            employeeStylesData.forEach(style => {
                                const card = document.createElement('div');
                                card.className = 'employee-style-card fade-in';
                                card.setAttribute('data-style', style.type);
                                
                                // 카드 내용 생성
                                card.innerHTML = `
                                    <h3>${style.title}</h3>
                                    <div class="style-details">
                                        <div class="style-traits">
                                            <h4>특징</h4>
                                            <ul>
                                                ${style.traits.map(trait => `<li>${trait}</li>`).join('')}
                                            </ul>
                                        </div>
                                        <div class="style-solutions">
                                            <h4>대처법</h4>
                                            <ul>
                                                ${style.solutions.map(solution => `<li>${solution}</li>`).join('')}
                                            </ul>
                                        </div>
                                        <button class="view-details-btn">자세히 보기</button>
                                    </div>
                                    <div class="detailed-info hidden">
                                        <h4>상세 분석</h4>
                                        <p><strong>특성:</strong> ${style.traits.join('<br>')}</p>
                                        <p><strong>대처법:</strong> ${style.solutions.join('<br>')}</p>
                                        <button class="close-details-btn">접기</button>
                                    </div>
                                `;
                                
                                container.appendChild(card);
                            });
                            
                            // 버튼에 이벤트 리스너 추가
                            container.querySelectorAll('.view-details-btn').forEach(btn => {
                                btn.addEventListener('click', function() {
                                    const card = this.closest('.employee-style-card');
                                    const detailedInfo = card.querySelector('.detailed-info');
                                    detailedInfo.classList.remove('hidden');
                                });
                            });
                            
                            container.querySelectorAll('.close-details-btn').forEach(btn => {
                                btn.addEventListener('click', function() {
                                    const detailedInfo = this.closest('.detailed-info');
                                    detailedInfo.classList.add('hidden');
                                });
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