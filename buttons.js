/**
 * 버튼 기능을 처리하는 단순화된 스크립트
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Buttons script loaded');
    
    // 모바일 메뉴 토글 설정
    setupMobileMenu();
    
    // 요소 참조
    const leadershipTestBtn = document.getElementById('leadership-test-btn');
    const leadershipTest = document.getElementById('leadership-test');
    const leadershipResult = document.getElementById('leadership-result');
    
    const employeeStyleBtn = document.getElementById('employee-style-btn');
    const employeeStyles = document.getElementById('employee-styles');
    
    console.log('Found buttons:', {
        leadershipTestBtn: leadershipTestBtn ? 'found' : 'not found',
        employeeStyleBtn: employeeStyleBtn ? 'found' : 'not found',
        employeeStyles: employeeStyles ? 'found' : 'not found'
    });
    
    // 리더십 테스트 버튼 이벤트
    if (leadershipTestBtn && leadershipTest && leadershipResult) {
        leadershipTestBtn.addEventListener('click', function() {
            console.log('Leadership test button clicked');
            startLeadershipTest();
        });
    }
    
    // 직원 스타일 버튼 이벤트
    if (employeeStyleBtn && employeeStyles) {
        employeeStyleBtn.addEventListener('click', function() {
            console.log('Employee style button clicked');
            employeeStyles.classList.toggle('hidden');
            
            if (!employeeStyles.classList.contains('hidden')) {
                this.textContent = '직원 스타일 닫기';
                
                // 직원 스타일 데이터 표시
                if (!employeeStyles.querySelector('.employee-style-container') || 
                    employeeStyles.querySelector('.employee-style-container').children.length === 0) {
                    loadEmployeeStyles();
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
                this.textContent = '직원 스타일 알아보기';
                
                // 애니메이션 제거
                const styleElements = document.querySelectorAll('#employee-styles .fade-in');
                styleElements.forEach(element => {
                    element.classList.remove('appear');
                });
            }
        });
    } else {
        console.error('Employee style button or container not found. Button:', employeeStyleBtn, 'Container:', employeeStyles);
    }
    
    // 직원 스타일 데이터 로드 및 표시
    function loadEmployeeStyles() {
        console.log('Loading employee styles...');
        
        // 컨테이너 확인 및 생성
        let container = employeeStyles.querySelector('.employee-style-container');
        if (!container) {
            console.log('Creating employee style container');
            container = document.createElement('div');
            container.className = 'employee-style-container';
            employeeStyles.appendChild(container);
        }
        
        const template = document.getElementById('employee-style-template');
        
        if (!template) {
            console.error('Template not found');
            return;
        }
        
        console.log('Template found, creating style cards');
        
        // 직원 스타일 데이터
        const styles = [
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
        
        // 직원 스타일 카드 생성
        styles.forEach(style => {
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
            viewDetailsBtn.addEventListener('click', function() {
                const url = `employee-styles/${style.type}.html`;
                console.log('Navigating to:', url);
                window.location.href = url;
            });
            
            // 카드 추가
            container.appendChild(card);
        });
        
        console.log('Employee style cards created:', container.children.length);
    }
    
    // 리더십 테스트 시작
    function startLeadershipTest() {
        // 리더십 테스트 표시
        leadershipTest.classList.remove('hidden');
        leadershipTestBtn.classList.add('hidden');
        
        // 첫 번째 질문 표시
        showQuestion(0);
    }
    
    // 리더십 테스트 질문 데이터
    const questions = [
        {
            question: "직원이 업무 중 실수를 했을 때, 나는 주로...",
            options: [
                { text: "먼저 공감과 위로를 표현한다", type: "mom" },
                { text: "정확한 수정 방법을 알려준다", type: "craftsman" },
                { text: "스스로 개선할 수 있도록 질문한다", type: "coach" },
                { text: "명확한 목표와 기준을 다시 제시한다", type: "commander" }
            ]
        },
        {
            question: "프로젝트를 시작할 때 나는 가장 중요하게 여기는 것은?",
            options: [
                { text: "팀원 각자의 상황과 마음을 살핀다", type: "mom" },
                { text: "완성도 높은 결과물을 계획한다", type: "craftsman" },
                { text: "팀원 개개인의 성장을 염두에 둔다", type: "coach" },
                { text: "목표 달성을 위한 명확한 역할과 일정을 설정한다", type: "commander" }
            ]
        },
        {
            question: "내가 주로 팀과 소통하는 방식은?",
            options: [
                { text: "따뜻하고 편안한 분위기에서 이야기를 이끌어낸다", type: "mom" },
                { text: "문제나 오류를 정확히 짚어내어 피드백한다", type: "craftsman" },
                { text: "질문과 대화를 통해 스스로 답을 찾게 유도한다", type: "coach" },
                { text: "필요한 정보와 지시를 명확히 전달한다", type: "commander" }
            ]
        },
        {
            question: "위기 상황에서 나는?",
            options: [
                { text: "팀원을 먼저 안심시키고 감정을 수습한다", type: "mom" },
                { text: "문제의 근본 원인을 찾아내고 수정하려 한다", type: "craftsman" },
                { text: "상황을 학습 기회로 삼아 함께 성장 방향을 모색한다", type: "coach" },
                { text: "신속하게 판단하고 지시를 내려 상황을 통제한다", type: "commander" }
            ]
        },
        {
            question: "팀원의 발전에 대해 나는 주로 어떻게 접근하는가?",
            options: [
                { text: "정서적 지지와 응원을 보내준다", type: "mom" },
                { text: "부족한 기술이나 전문성을 보완하게 돕는다", type: "craftsman" },
                { text: "스스로 목표를 설정하고 달성할 수 있도록 돕는다", type: "coach" },
                { text: "필요한 역량을 빠르게 습득하게끔 요구하고 관리한다", type: "commander" }
            ]
        },
        {
            question: "프로젝트가 잘 진행되지 않을 때 나는?",
            options: [
                { text: "팀원들의 스트레스와 감정을 먼저 살핀다", type: "mom" },
                { text: "과정을 다시 점검하고 품질을 높일 방법을 찾는다", type: "craftsman" },
                { text: "팀원들이 스스로 문제를 인식하고 해결책을 찾게 돕는다", type: "coach" },
                { text: "책임자를 지정하고 구체적 조치를 지시한다", type: "commander" }
            ]
        },
        {
            question: "내가 팀에 바라는 모습은?",
            options: [
                { text: "서로를 믿고 응원하는 따뜻한 팀", type: "mom" },
                { text: "완성도 높은 결과를 만들어내는 전문 팀", type: "craftsman" },
                { text: "스스로 성장하며 자율적으로 움직이는 팀", type: "coach" },
                { text: "목표에 집중해 빠르고 정확하게 움직이는 팀", type: "commander" }
            ]
        },
        {
            question: "성공적인 리더십이란 무엇이라 생각하는가?",
            options: [
                { text: "사람을 존중하고 돌보는 것", type: "mom" },
                { text: "뛰어난 결과를 만드는 것", type: "craftsman" },
                { text: "사람을 성장시키고 변화시키는 것", type: "coach" },
                { text: "목표를 달성하고 성과를 내는 것", type: "commander" }
            ]
        }
    ];
    
    // 테스트 상태
    let currentQuestion = 0;
    let answers = [];
    
    // 질문 표시 함수
    function showQuestion(index) {
        leadershipTest.innerHTML = '';
        
        if (index >= questions.length) {
            // 테스트 완료 - 결과 계산
            calculateResult();
            return;
        }
        
        // 질문 생성
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const questionText = document.createElement('p');
        questionText.textContent = questions[index].question;
        questionDiv.appendChild(questionText);
        
        // 옵션 생성
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        
        questions[index].options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.textContent = option.text;
            optionDiv.dataset.value = optionIndex;
            optionDiv.dataset.type = option.type;
            
            optionDiv.addEventListener('click', function() {
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                
                // 다음 버튼 활성화
                document.querySelector('.next-btn').disabled = false;
            });
            
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(optionsDiv);
        leadershipTest.appendChild(questionDiv);
        
        // 컨트롤 버튼 생성
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'test-controls';
        
        // 이전 버튼
        if (index > 0) {
            const prevBtn = document.createElement('button');
            prevBtn.textContent = '이전';
            prevBtn.className = 'btn prev-btn';
            prevBtn.addEventListener('click', function() {
                currentQuestion--;
                showQuestion(currentQuestion);
            });
            controlsDiv.appendChild(prevBtn);
        }
        
        // 다음 버튼
        const nextBtn = document.createElement('button');
        nextBtn.textContent = index === questions.length - 1 ? '결과 보기' : '다음';
        nextBtn.className = 'btn next-btn';
        nextBtn.disabled = true;
        
        nextBtn.addEventListener('click', function() {
            const selectedOption = document.querySelector('.option.selected');
            if (selectedOption) {
                answers[index] = {
                    value: parseInt(selectedOption.dataset.value),
                    type: selectedOption.dataset.type
                };
                currentQuestion++;
                showQuestion(currentQuestion);
            }
        });
        
        controlsDiv.appendChild(nextBtn);
        leadershipTest.appendChild(controlsDiv);
    }
    
    // 결과 계산 함수
    function calculateResult() {
        let scores = {
            'mom': 0,
            'craftsman': 0,
            'coach': 0,
            'commander': 0
        };
        
        answers.forEach(answer => {
            if (answer && answer.type) {
                scores[answer.type]++;
            }
        });
        
        // 주 유형과 보조 유형 찾기
        let mainType = 'mom';
        let highestScore = 0;
        
        for (const type in scores) {
            if (scores[type] > highestScore) {
                highestScore = scores[type];
                mainType = type;
            }
        }
        
        // 보조 유형 찾기
        let secondaryType = 'craftsman';
        let secondHighestScore = 0;
        
        for (const type in scores) {
            if (type !== mainType && scores[type] > secondHighestScore) {
                secondHighestScore = scores[type];
                secondaryType = type;
            }
        }
        
        // 결과 표시
        displayResults(mainType, secondaryType);
    }
    
    // 결과 표시 함수
    function displayResults(mainType, secondaryType) {
        leadershipTest.classList.add('hidden');
        leadershipResult.classList.remove('hidden');
        
        // 타입 이름 매핑
        const typeNames = {
            'mom': '엄마형',
            'craftsman': '장인형',
            'coach': '코치형',
            'commander': '지휘관형'
        };
        
        // 유형별 인덱스 매핑
        const typeIndices = {
            'mom': 0,
            'craftsman': 1,
            'coach': 2,
            'commander': 3
        };
        
        // 결과 카드 스타일 설정
        document.querySelectorAll('.type').forEach((type, index) => {
            // 기본 스타일 초기화
            type.style.borderColor = '#ddd';
            type.style.borderWidth = '1px';
            type.style.transform = 'none';
            type.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            
            // 주 유형 스타일
            if (index === typeIndices[mainType]) {
                type.style.borderColor = '#2180de';
                type.style.borderWidth = '3px';
                type.style.transform = 'scale(1.05)';
                type.style.boxShadow = '0 5px 15px rgba(33, 128, 222, 0.2)';
            } 
            // 보조 유형 스타일
            else if (index === typeIndices[secondaryType]) {
                type.style.borderColor = '#2ecc71';
                type.style.borderWidth = '2px';
                type.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.15)';
            }
        });
        
        // 결과 요약 추가
        const prevIntro = leadershipResult.querySelector('.result-intro');
        if (prevIntro) {
            prevIntro.remove();
        }
        
        const resultIntro = document.createElement('div');
        resultIntro.className = 'result-intro';
        resultIntro.innerHTML = `
            <p>당신의 리더십 유형 분석 결과</p>
            <div class="type-buttons">
                <div class="type-button main-type" data-type="${mainType}">
                    <span>주 유형</span>
                    <div><strong>${typeNames[mainType]}</strong> 리더십</div>
                </div>
                <div class="type-button secondary-type" data-type="${secondaryType}">
                    <span>보조 유형</span>
                    <div><strong>${typeNames[secondaryType]}</strong> 리더십</div>
                </div>
            </div>
        `;
        
        leadershipResult.insertBefore(resultIntro, document.querySelector('.leadership-types'));
        
        // 애니메이션 적용
        setTimeout(() => {
            const resultElements = document.querySelectorAll('#leadership-result .fade-in');
            resultElements.forEach(element => {
                element.classList.add('appear');
            });
        }, 100);
        
        // 버튼에 클릭 이벤트 추가
        setTimeout(() => {
            const mainTypeBtn = document.querySelector('.type-button.main-type');
            const secondaryTypeBtn = document.querySelector('.type-button.secondary-type');
            
            if (mainTypeBtn) {
                mainTypeBtn.style.cursor = 'pointer';
                mainTypeBtn.addEventListener('click', function() {
                    const typeIndex = typeIndices[this.getAttribute('data-type')];
                    const typeCards = document.querySelectorAll('.type');
                    if (typeCards && typeCards[typeIndex]) {
                        typeCards[typeIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // 강조 효과
                        typeCards[typeIndex].classList.add('highlight-card');
                        setTimeout(() => {
                            typeCards[typeIndex].classList.remove('highlight-card');
                        }, 1500);
                    }
                });
            }
            
            if (secondaryTypeBtn) {
                secondaryTypeBtn.style.cursor = 'pointer';
                secondaryTypeBtn.addEventListener('click', function() {
                    const typeIndex = typeIndices[this.getAttribute('data-type')];
                    const typeCards = document.querySelectorAll('.type');
                    if (typeCards && typeCards[typeIndex]) {
                        typeCards[typeIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
                        
                        // 강조 효과
                        typeCards[typeIndex].classList.add('highlight-card');
                        setTimeout(() => {
                            typeCards[typeIndex].classList.remove('highlight-card');
                        }, 1500);
                    }
                });
            }
        }, 300);
    }
    
    // 모바일 메뉴 설정
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
            });
            
            // 네비게이션 메뉴 항목 클릭 시 모바일 메뉴 닫기
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 992) {
                        navMenu.classList.remove('active');
                    }
                });
            });
        }
    }
}); 