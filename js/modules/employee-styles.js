/**
 * 직원 스타일 기능을 처리하는 모듈
 */

const EmployeeStyles = {
    /**
     * 직원 스타일 기능 초기화
     */
    init() {
        this.elements = {
            employeeStyleBtn: document.getElementById('employee-style-btn'),
            employeeStyles: document.getElementById('employee-styles')
        };
        
        this.setupEmployeeStyleButton();
    },
    
    /**
     * 직원 스타일 버튼 설정
     */
    setupEmployeeStyleButton() {
        const { employeeStyleBtn, employeeStyles } = this.elements;
        
        if (employeeStyleBtn && employeeStyles) {
            employeeStyleBtn.addEventListener('click', () => {
                employeeStyles.classList.toggle('hidden');
                
                // 표시될 때 애니메이션 적용
                if (!employeeStyles.classList.contains('hidden')) {
                    setTimeout(() => {
                        const styleElements = document.querySelectorAll('#employee-styles .fade-in');
                        
                        // 순차적 애니메이션 적용 (100ms 간격)
                        styleElements.forEach((element, index) => {
                            setTimeout(() => {
                                element.classList.add('appear');
                            }, 100 * index);
                        });
                    }, 100);
                    
                    employeeStyleBtn.textContent = '직원 스타일 닫기';
                    
                    // 직원 스타일 카드가 비어 있으면 데이터 로드
                    if (employeeStyles.querySelector('.employee-style-container').children.length === 0) {
                        this.loadEmployeeStyleData();
                    }
                } else {
                    // 카드 숨기기 전에 모든 카드의 애니메이션 클래스 제거
                    const styleElements = document.querySelectorAll('#employee-styles .fade-in');
                    styleElements.forEach(element => {
                        element.classList.remove('appear');
                    });
                    
                    employeeStyleBtn.textContent = '직원 스타일 알아보기';
                }
            });
        }
    },
    
    /**
     * 직원 스타일 데이터 로드 및 UI 생성
     */
    loadEmployeeStyleData() {
        const { employeeStyles } = this.elements;
        const container = employeeStyles.querySelector('.employee-style-container');
        const template = document.getElementById('employee-style-template');
        
        // 직원 스타일 데이터
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
            },
            {
                type: "자율과잉형",
                title: "자율과잉형 직원",
                traits: [
                    "팀의 방향성과 다르게 독자적으로 행동함",
                    "정해진 프로세스나 규칙을 무시함",
                    "협업보다 개인 업무 방식을 고수함"
                ],
                solutions: [
                    "전체 목표와 개인 업무의 연결성 강조",
                    "규칙의 필요성과 이유 설명",
                    "자율성을 존중하되 경계 설정"
                ]
            },
            {
                type: "지시대기형",
                title: "지시대기형 직원",
                traits: [
                    "명확한 지시 없이는 행동하지 않음",
                    "책임지는 것을 두려워함",
                    "항상 상급자의 결정에 의존함"
                ],
                solutions: [
                    "점진적으로 결정권 위임",
                    "실수해도 괜찮은 안전한 환경 조성",
                    "자기주도적 업무 처리 훈련"
                ]
            },
            {
                type: "무책임형",
                title: "무책임형 직원",
                traits: [
                    "자신의 실수나 책임을 인정하지 않음",
                    "항상 다른 사람이나 환경 탓을 함",
                    "약속을 자주 어기고 기한을 지키지 않음"
                ],
                solutions: [
                    "명확한 책임과 기대치 설정",
                    "결과에 대한 책임 의식 강조",
                    "작은 책임부터 성공적으로 완수하도록 지원"
                ]
            },
            {
                type: "관심요구형",
                title: "관심요구형 직원",
                traits: [
                    "지나치게 인정과 관심을 요구함",
                    "자신의 업적을 과시하려는 경향이 강함",
                    "팀보다 개인적 인정에 집중함"
                ],
                solutions: [
                    "정기적인 피드백과 인정 제공",
                    "팀 성과에 대한 가치 교육",
                    "건강한 인정 욕구로 전환 유도"
                ]
            },
            {
                type: "감정기복형",
                title: "감정기복형 직원",
                traits: [
                    "감정 조절이 어렵고 기분에 따라 업무 수행이 달라짐",
                    "스트레스 상황에서 과잉 반응함",
                    "팀 분위기에 큰 영향을 미침"
                ],
                solutions: [
                    "감정 인식과 조절 기술 교육",
                    "스트레스 관리 방법 제안",
                    "명확한 기대치와 일관된 환경 제공"
                ]
            },
            {
                type: "이기적형",
                title: "이기적형 직원",
                traits: [
                    "자신의 이익만 추구하고 팀을 고려하지 않음",
                    "공로는 독차지하고 책임은 회피함",
                    "다른 팀원들과 경쟁적인 관계를 형성함"
                ],
                solutions: [
                    "팀워크의 가치와 중요성 교육",
                    "협업 성과에 대한 보상 강화",
                    "팀 목표와 개인 목표의 연계성 강조"
                ]
            },
            {
                type: "은근한반항형",
                title: "은근한반항형 직원",
                traits: [
                    "직접적으로 반대하지는 않지만 지시를 따르지 않음",
                    "수동적 공격성을 보이며 우회적으로 저항함",
                    "표면적으로는 동의하지만 실행하지 않음"
                ],
                solutions: [
                    "솔직한 의견 교환을 장려하는 환경 조성",
                    "저항의 원인 파악 및 해소",
                    "명확한 기대치와 결과 추적 시스템 수립"
                ]
            }
        ];
        
        // 카드 생성
        employeeStylesData.forEach(style => {
            if (template) {
                const card = document.importNode(template.content, true);
                const cardElement = card.querySelector('.employee-style-card');
                
                // 데이터 속성 설정
                cardElement.setAttribute('data-style', style.type);
                
                // 제목 설정
                const titleElement = card.querySelector('h3');
                titleElement.textContent = style.title;
                
                // 특징 설정
                const traitsList = card.querySelector('.style-traits ul');
                style.traits.forEach(trait => {
                    const li = document.createElement('li');
                    li.textContent = trait;
                    traitsList.appendChild(li);
                });
                
                // 대처법 설정
                const solutionsList = card.querySelector('.style-solutions ul');
                style.solutions.forEach(solution => {
                    const li = document.createElement('li');
                    li.textContent = solution;
                    solutionsList.appendChild(li);
                });
                
                // 자세히 보기 버튼 이벤트
                const viewDetailsBtn = card.querySelector('.view-details-btn');
                viewDetailsBtn.addEventListener('click', () => {
                    window.location.href = `employee-styles/${style.type}.html`;
                });
                
                // 카드 추가
                container.appendChild(card);
            }
        });
    }
};

export default EmployeeStyles; 