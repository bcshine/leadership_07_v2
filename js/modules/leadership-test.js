/**
 * 리더십 테스트 기능을 처리하는 모듈
 */

const LeadershipTest = {
    // 테스트 상태 변수
    currentQuestion: 0,
    answers: [],
    
    // 리더십 유형 매핑
    typeNames: {
        'mom': '엄마형',
        'craftsman': '장인형',
        'coach': '코치형',
        'commander': '지휘관형'
    },
    
    // 유형별 인덱스 매핑
    typeIndices: {
        'mom': 0,
        'craftsman': 1,
        'coach': 2,
        'commander': 3
    },
    
    /**
     * 리더십 테스트 초기화
     */
    init() {
        this.elements = {
            testButton: document.getElementById('leadership-test-btn'),
            testContainer: document.getElementById('leadership-test'),
            resultContainer: document.getElementById('leadership-result')
        };
        
        this.setupTestButton();
    },
    
    /**
     * 테스트 시작 버튼 설정
     */
    setupTestButton() {
        const { testButton } = this.elements;
        
        if (testButton) {
            testButton.addEventListener('click', () => {
                this.startTest();
            });
        }
    },
    
    /**
     * 테스트 시작
     */
    startTest() {
        const { testButton, testContainer } = this.elements;
        
        // 변수 초기화
        this.currentQuestion = 0;
        this.answers = [];
        
        // UI 업데이트
        testContainer.classList.remove('hidden');
        testButton.classList.add('hidden');
        
        // 첫 질문 표시
        this.showQuestion(this.currentQuestion);
    },
    
    /**
     * 질문 표시
     * @param {number} index - 질문 인덱스
     */
    showQuestion(index) {
        const { testContainer } = this.elements;
        testContainer.innerHTML = '';
        
        // 모든 질문이 완료되었으면 결과 계산
        if (index >= this.questions.length) {
            this.calculateResult();
            return;
        }
        
        // 질문 UI 생성
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        
        const questionText = document.createElement('p');
        questionText.textContent = this.questions[index].question;
        questionDiv.appendChild(questionText);
        
        // 옵션 UI 생성
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        
        this.questions[index].options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.textContent = option.text;
            optionDiv.dataset.value = optionIndex;
            optionDiv.dataset.type = option.type;
            
            optionDiv.addEventListener('click', () => {
                // 선택 효과 표시
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                optionDiv.classList.add('selected');
                
                // 다음 버튼 활성화
                document.querySelector('.next-btn').disabled = false;
            });
            
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(optionsDiv);
        testContainer.appendChild(questionDiv);
        
        // 컨트롤 버튼 추가
        this.addControlButtons(index);
    },
    
    /**
     * 컨트롤 버튼 추가
     * @param {number} index - 현재 질문 인덱스
     */
    addControlButtons(index) {
        const { testContainer } = this.elements;
        
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'test-controls';
        
        // 이전 버튼 (두 번째 질문부터)
        if (index > 0) {
            const prevBtn = document.createElement('button');
            prevBtn.textContent = '이전';
            prevBtn.className = 'btn prev-btn';
            prevBtn.addEventListener('click', () => {
                this.currentQuestion--;
                this.showQuestion(this.currentQuestion);
            });
            controlsDiv.appendChild(prevBtn);
        }
        
        // 다음/결과 보기 버튼
        const nextBtn = document.createElement('button');
        nextBtn.textContent = index === this.questions.length - 1 ? '결과 보기' : '다음';
        nextBtn.className = 'btn next-btn';
        nextBtn.disabled = true; // 선택 전 비활성화
        
        nextBtn.addEventListener('click', () => {
            const selectedOption = document.querySelector('.option.selected');
            if (selectedOption) {
                // 선택한 답변 저장
                this.answers[index] = {
                    value: parseInt(selectedOption.dataset.value),
                    type: selectedOption.dataset.type
                };
                
                // 다음 질문으로 이동
                this.currentQuestion++;
                this.showQuestion(this.currentQuestion);
            }
        });
        
        controlsDiv.appendChild(nextBtn);
        testContainer.appendChild(controlsDiv);
    },
    
    /**
     * 테스트 결과 계산
     */
    calculateResult() {
        const { testContainer, resultContainer } = this.elements;
        
        // 유형별 점수 계산
        let scores = {
            'mom': 0,
            'craftsman': 0,
            'coach': 0,
            'commander': 0
        };
        
        this.answers.forEach(answer => {
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
        
        // UI 업데이트
        testContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        
        // 결과 UI 업데이트
        this.updateResultUI(mainType, secondaryType);
    },
    
    /**
     * 결과 UI 업데이트
     * @param {string} mainType - 주 유형
     * @param {string} secondaryType - 보조 유형
     */
    updateResultUI(mainType, secondaryType) {
        const { resultContainer } = this.elements;
        
        // 각 유형 카드 스타일 설정
        document.querySelectorAll('.type').forEach((type, index) => {
            // 기본 스타일 초기화
            type.style.borderColor = '#ddd';
            type.style.borderWidth = '1px';
            type.style.transform = 'none';
            type.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            type.innerHTML = ''; // 내용 초기화
            
            // 유형 정보 가져오기
            const typeInfo = this.typeDescriptions[index];
            
            // 유형별 스타일 설정
            let orderLabel = '';
            let className = '';
            
            if (index === this.typeIndices[mainType]) {
                orderLabel = '<span class="type-label" style="background-color: #2180de; box-shadow: 0 2px 6px rgba(33, 128, 222, 0.25);">주 유형</span>';
                className = 'main-type-card';
                type.style.borderColor = '#2180de';
                type.style.borderWidth = '3px';
                type.style.transform = 'scale(1.05)';
                type.style.boxShadow = '0 5px 15px rgba(33, 128, 222, 0.2)';
            } else if (index === this.typeIndices[secondaryType]) {
                orderLabel = '<span class="type-label">보조 유형</span>';
                className = 'secondary-type-card';
                type.style.borderColor = '#2ecc71';
                type.style.borderWidth = '2px';
                type.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.15)';
            }
            
            // 유형 카드 내용 업데이트
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
        
        // 결과 요약 추가
        const prevIntro = resultContainer.querySelector('.result-intro');
        if (prevIntro) {
            prevIntro.remove();
        }
        
        const resultIntro = document.createElement('div');
        resultIntro.className = 'result-intro';
        resultIntro.innerHTML = `
            <p>당신의 리더십 유형 분석 결과</p>
            <p><span class="result-type-label main-type" style="background-color: #2180de; box-shadow: 0 3px 8px rgba(33, 128, 222, 0.3);">주 유형</span> <strong>${this.typeNames[mainType]}</strong> 리더십</p>
            <p><span class="result-type-label secondary-type">보조 유형</span> <strong>${this.typeNames[secondaryType]}</strong> 리더십</p>
        `;
        
        resultContainer.insertBefore(resultIntro, document.querySelector('.leadership-types'));
        
        // 페이드인 애니메이션 적용
        setTimeout(() => {
            const resultElements = document.querySelectorAll('#leadership-result .fade-in');
            resultElements.forEach(element => {
                element.classList.add('appear');
            });
        }, 100);
    },
    
    // 리더십 유형 테스트 질문
    questions: [
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
    ],
    
    // 리더십 유형 상세 정보
    typeDescriptions: [
        {
            title: "엄마형 리더십",
            description: "엄마형 리더는 조직의 따뜻한 보호자입니다. 팀원의 감정과 필요를 민감하게 인식하고, 서로 돕는 가족과 같은 환경을 조성합니다.",
            strengths: "• 뛰어난 공감 능력으로 팀원 신뢰 구축\n• 포용적이고 심리적으로 안전한 환경 조성",
            weaknesses: "• 어려운 결정이나 책임 추궁을 피하는 경향\n• 너무 관대한 태도로 기준이 약화될 수 있음"
        },
        {
            title: "장인형 리더십",
            description: "장인형 리더는 전문성과 완벽주의를 추구하는 정밀함의 대가입니다. 이들은 철저한 분석, 세부 사항에 대한 꼼꼼한 주의력, 그리고 품질에 대한 높은 기준을 가지고 있습니다.",
            strengths: "• 철저한 분석과 데이터 기반 의사결정\n• 높은 품질 기준과 일관된 결과물 도출",
            weaknesses: "• 지나친 완벽주의로 의사결정 지연\n• 세부사항에 집중하여 큰 그림을 놓칠 수 있음"
        },
        {
            title: "코치형 리더십",
            description: "코치형 리더는 팀원의 성장과 잠재력 개발에 초점을 맞추는 영감을 주는 멘토입니다. 이들은 개개인의 강점을 파악하고 발전시키며, 자율성과 주인의식 부여를 통한 내적 동기를 유발합니다.",
            strengths: "• 팀원의 잠재력과 강점 발견 및 개발 능력\n• 자율성과 주인의식 부여를 통한 내적 동기 유발",
            weaknesses: "• 모든 상황에 코칭 접근법이 적합하지 않을 수 있음\n• 단기적 성과가 필요한 상황에서 시간 소요"
        },
        {
            title: "지휘관형 리더십",
            description: "지휘관형 리더는 목표 달성과 결과 지향적인 접근으로 조직을 이끄는 결단력 있는 지휘자입니다. 이들은 명확한 방향과 기대치를 설정하고, 효율적인 실행을 통해 신속하게 성과를 창출합니다.",
            strengths: "• 명확한 목표 설정과 결과 지향적 실행력\n• 빠른 판단력과 위기 대응 능력",
            weaknesses: "• 지나친 통제로 팀원의 창의성과 자율성 제한\n• 인간적 측면보다 성과에 집중하여 관계 소홀"
        }
    ]
};

export default LeadershipTest; 