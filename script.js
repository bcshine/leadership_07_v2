document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded, initializing scripts...');
    
    // 요소 참조
    const elements = {
        menuToggle: document.querySelector('.menu-toggle'),
        navMenu: document.querySelector('.nav-menu')
    };
    
    // UI 이벤트 초기화
    initUIEvents();
    
    // 페이지 효과 초기화
    initPageEffects();
    
    // 리더십 테스트 초기화
    initLeadershipTest();
    
    // 직원 스타일 초기화
    initEmployeeStyles();
});

// UI 이벤트 초기화
function initUIEvents() {
    // 모바일 메뉴 토글
    if (elements.menuToggle && elements.navMenu) {
        elements.menuToggle.addEventListener('click', function() {
            elements.navMenu.classList.toggle('active');
        });
        
        // 네비게이션 메뉴 항목 클릭 시 모바일 메뉴 닫기
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    elements.navMenu.classList.remove('active');
                }
            });
        });
    }
    
    // 스크롤 이벤트 - 네비게이션 메뉴 활성화
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navItems = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
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

// 페이지 효과 초기화
function initPageEffects() {
    // 페이드인 애니메이션
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

function initLeadershipTest() {
    const testButton = document.getElementById('leadership-test-btn');
    const testContainer = document.getElementById('leadership-test');
    const resultContainer = document.getElementById('leadership-result');
    
    // 리더십 유형 테스트 질문
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
    
    let currentQuestion = 0;
    let answers = [];
    
    // 리더십 테스트 시작
    if (testButton) {
        testButton.addEventListener('click', function() {
            testContainer.classList.remove('hidden');
            testButton.classList.add('hidden');
            showQuestion(currentQuestion);
        });
    }
    
    // 문항 표시 함수
    function showQuestion(index) {
        testContainer.innerHTML = '';
        
        if (index >= questions.length) {
            // 테스트 완료 - 결과 계산
            calculateResult();
            testContainer.classList.add('hidden');
            resultContainer.classList.remove('hidden');
            
            // 결과 표시 후 페이드인 애니메이션 다시 적용
            setTimeout(() => {
                const resultElements = document.querySelectorAll('#leadership-result .fade-in');
                resultElements.forEach(element => {
                    element.classList.add('appear');
                });
            }, 100);
            
            return;
        }
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const questionText = document.createElement('p');
        questionText.textContent = questions[index].question;
        questionDiv.appendChild(questionText);
        
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
        testContainer.appendChild(questionDiv);
        
        // 컨트롤 버튼
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'test-controls';
        
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
        
        const nextBtn = document.createElement('button');
        nextBtn.textContent = index === questions.length - 1 ? '결과 보기' : '다음';
        nextBtn.className = 'btn next-btn';
        nextBtn.disabled = true; // 선택하기 전에는 비활성화
        
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
        testContainer.appendChild(controlsDiv);
    }
    
    // 리더십 결과 계산 함수
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
        
        // 가장 높은 점수를 가진 유형 찾기
        let mainType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        
        // 두 번째로 높은 점수를 가진 유형 찾기
        let tempScores = {...scores};
        tempScores[mainType] = -1;
        let secondaryType = Object.keys(tempScores).reduce((a, b) => tempScores[a] > tempScores[b] ? a : b);
        
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
        
        // 리더십 유형 상세 정보
        const typeDescriptions = [
            {
                title: "엄마형 리더십",
                description: `엄마형 리더는 조직의 따뜻한 보호자입니다. 팀원의 감정과 필요를 민감하게 인식하고, 서로 돕는 가족과 같은 환경을 조성합니다.`,
                strengths: "• 뛰어난 공감 능력으로 팀원 신뢰 구축\n• 포용적이고 심리적으로 안전한 환경 조성",
                weaknesses: "• 어려운 결정이나 책임 추궁을 피하는 경향\n• 너무 관대한 태도로 기준이 약화될 수 있음"
            },
            {
                title: "장인형 리더십",
                description: `장인형 리더는 전문성과 완벽주의를 추구하는 정밀함의 대가입니다. 이들은 철저한 분석, 세부 사항에 대한 꼼꼼한 주의력, 그리고 품질에 대한 높은 기준을 가지고 있습니다.`,
                strengths: "• 철저한 분석과 데이터 기반 의사결정\n• 높은 품질 기준과 일관된 결과물 도출",
                weaknesses: "• 지나친 완벽주의로 의사결정 지연\n• 세부사항에 집중하여 큰 그림을 놓칠 수 있음"
            },
            {
                title: "코치형 리더십",
                description: `코치형 리더는 팀원의 성장과 잠재력 개발에 초점을 맞추는 영감을 주는 멘토입니다. 이들은 개개인의 강점을 파악하고 발전시키며, 자율성과 주인의식 부여를 통한 내적 동기를 유발합니다.`,
                strengths: "• 팀원의 잠재력과 강점 발견 및 개발 능력\n• 자율성과 주인의식 부여를 통한 내적 동기 유발",
                weaknesses: "• 모든 상황에 코칭 접근법이 적합하지 않을 수 있음\n• 단기적 성과가 필요한 상황에서 시간 소요"
            },
            {
                title: "지휘관형 리더십",
                description: `지휘관형 리더는 목표 달성과 결과 지향적인 접근으로 조직을 이끄는 결단력 있는 지휘자입니다. 이들은 명확한 방향과 기대치를 설정하고, 효율적인 실행을 통해 신속하게 성과를 창출합니다.`,
                strengths: "• 명확한 목표 설정과 결과 지향적 실행력\n• 빠른 판단력과 위기 대응 능력",
                weaknesses: "• 지나친 통제로 팀원의 창의성과 자율성 제한\n• 인간적 측면보다 성과에 집중하여 관계 소홀"
            }
        ];
        
        // 결과 표시 로직
        document.querySelectorAll('.type').forEach((type, index) => {
            // 모든 유형 기본 스타일 초기화
            type.style.borderColor = '#ddd';
            type.style.borderWidth = '1px';
            type.style.transform = 'none';
            type.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            type.innerHTML = ''; // 내용 초기화
            
            // 모든 유형에 상세 정보 추가
            const typeInfo = typeDescriptions[index];
            
            // 유형별 순서와 스타일 결정
            let orderLabel = '';
            let className = '';
            
            if (index === typeIndices[mainType]) {
                orderLabel = '<span class="type-label" style="background-color: #2180de; box-shadow: 0 2px 6px rgba(33, 128, 222, 0.25);">주 유형</span>';
                className = 'main-type-card';
                type.style.borderColor = '#2180de';
                type.style.borderWidth = '3px';
                type.style.transform = 'scale(1.05)';
                type.style.boxShadow = '0 5px 15px rgba(33, 128, 222, 0.2)';
            } else if (index === typeIndices[secondaryType]) {
                orderLabel = '<span class="type-label">보조 유형</span>';
                className = 'secondary-type-card';
                type.style.borderColor = '#2ecc71';
                type.style.borderWidth = '2px';
                type.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.15)';
            }
            
            // 상세 내용 구성
            type.innerHTML = `
                <h3>${typeInfo.title} <span>${['🤗', '🔍', '🏆', '🎯'][index]}</span> ${orderLabel}</h3>
                <div class="type-description ${className}">
                    <p>${typeInfo.description}</p>
                    <div class="type-points">
                        <div class="strengths">
                            <h4>강점</h4>
                            <pre>${typeInfo.strengths}</pre>
                        </div>
                        <div class="weaknesses">
                            <h4>개발 영역</h4>
                            <pre>${typeInfo.weaknesses}</pre>
                        </div>
                    </div>
                </div>
            `;
        });
        
        // 결과 메시지 추가
        const resultIntro = document.createElement('div');
        resultIntro.className = 'result-intro';
        resultIntro.innerHTML = `
            <p>당신의 리더십 유형 분석 결과</p>
            <p><span class="result-type-label main-type" style="background-color: #2180de; box-shadow: 0 3px 8px rgba(33, 128, 222, 0.3);">주 유형</span> <strong>${typeNames[mainType]}</strong> 리더십</p>
            <p><span class="result-type-label secondary-type">보조 유형</span> <strong>${typeNames[secondaryType]}</strong> 리더십</p>
        `;
        
        resultContainer.insertBefore(resultIntro, document.querySelector('.leadership-types'));
    }
}

// 직원 스타일 초기화
function initEmployeeStyles() {
    const employeeStyleBtn = document.getElementById('employee-style-btn');
    const employeeStyles = document.getElementById('employee-styles');
    
    if (employeeStyleBtn && employeeStyles) {
        console.log('Setting up employee style button listener');
        employeeStyleBtn.addEventListener('click', function() {
            console.log('Employee style button clicked');
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
                
                this.textContent = '직원 스타일 닫기';
                
                // 직원 스타일 카드가 비어 있으면 데이터 로드
                if (employeeStyles.querySelector('.employee-style-container').children.length === 0) {
                    loadEmployeeStyleData();
                }
            } else {
                // 카드 숨기기 전에 모든 카드의 애니메이션 클래스 제거
                const styleElements = document.querySelectorAll('#employee-styles .fade-in');
                styleElements.forEach(element => {
                    element.classList.remove('appear');
                });
                
                this.textContent = '직원 스타일 알아보기';
            }
        });
    } else {
        console.error('Employee style button or container not found');
    }
}

// 직원 스타일 데이터 로드 및 UI 생성
function loadEmployeeStyleData() {
    const employeeStyles = document.getElementById('employee-styles');
    const container = employeeStyles.querySelector('.employee-style-container');
    const template = document.getElementById('employee-style-template');
    
    console.log('Loading employee style data', { 
        container: container ? 'found' : 'not found', 
        template: template ? 'found' : 'not found'
    });
    
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
    if (template && container) {
        employeeStylesData.forEach(style => {
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
                const detailedInfo = cardElement.querySelector('.detailed-info');
                if (detailedInfo) {
                    detailedInfo.classList.remove('hidden');
                    
                    // 상세 정보가 비어 있으면 동적으로 내용 추가
                    if (detailedInfo.querySelector('p') === null) {
                        // 상세 분석 내용 추가
                        const analysis = document.createElement('p');
                        analysis.innerHTML = `<strong>특성:</strong> ${style.traits.join('<br>')}`;
                        detailedInfo.insertBefore(analysis, detailedInfo.querySelector('.close-details-btn'));
                        
                        const solutions = document.createElement('p');
                        solutions.innerHTML = `<strong>대처법:</strong> ${style.solutions.join('<br>')}`;
                        detailedInfo.insertBefore(solutions, detailedInfo.querySelector('.close-details-btn'));
                    }
                }
            });
            
            // 카드 추가
            container.appendChild(card);
        });
        
        // 모든 "자세히 보기" 버튼에 이벤트 리스너 추가
        const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
        viewDetailsBtns.forEach(btn => {
            btn.removeEventListener('click', showDetails);
            btn.addEventListener('click', showDetails);
        });
        
        // 모든 "접기" 버튼에 이벤트 리스너 추가
        const closeDetailsBtns = document.querySelectorAll('.close-details-btn');
        closeDetailsBtns.forEach(btn => {
            btn.removeEventListener('click', hideDetails);
            btn.addEventListener('click', hideDetails);
        });
    } else {
        console.error('Template or container not found:', { 
            template: template ? 'found' : 'not found',
            container: container ? 'found' : 'not found'
        });
    }
}

// 상세정보 표시 함수
function showDetails() {
    const card = this.closest('.employee-style-card');
    const styleType = card.getAttribute('data-style');
    
    // 서버 오류 방지: URL 이동 대신 카드 내부에 상세 정보 표시
    const detailedInfo = card.querySelector('.detailed-info');
    if (detailedInfo) {
        detailedInfo.classList.remove('hidden');
        
        // 상세 정보가 비어 있으면 동적으로 내용 추가
        if (detailedInfo.querySelector('p') === null) {
            // 스타일 타입에 맞는 자세한 정보를 동적으로 생성
            const stylesData = employeeStylesData.find(style => style.type === styleType);
            if (stylesData) {
                // 상세 분석 내용 추가
                const analysis = document.createElement('p');
                analysis.innerHTML = `<strong>특성:</strong> ${stylesData.traits.join('<br>')}`;
                detailedInfo.insertBefore(analysis, detailedInfo.querySelector('.close-details-btn'));
                
                const solutions = document.createElement('p');
                solutions.innerHTML = `<strong>대처법:</strong> ${stylesData.solutions.join('<br>')}`;
                detailedInfo.insertBefore(solutions, detailedInfo.querySelector('.close-details-btn'));
            }
        }
    }
}

// 상세정보 숨기기 함수
function hideDetails() {
    const detailedInfo = this.closest('.detailed-info');
    detailedInfo.classList.add('hidden');
}