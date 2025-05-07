/**
 * 직원 스타일 기능을 처리하는 모듈
 */

import { employeeStyles } from './employee-styles-data.js';

export function initEmployeeStyles() {
  const btn = document.getElementById('employee-style-btn');
  const btnsArea = document.getElementById('employee-style-buttons');
  const detailArea = document.getElementById('employee-style-detail');

  // 1. 처음엔 버튼만 보임
  btn.classList.remove('hidden');
  btnsArea.classList.add('hidden');
  detailArea.classList.add('hidden');

  // 2. "직원 스타일 알아보기" 클릭 시 10개 버튼 표시
  btn.onclick = () => {
    btn.classList.add('hidden');
    btnsArea.innerHTML = '';
    employeeStyles.forEach((style, idx) => {
      const sBtn = document.createElement('button');
      sBtn.className = 'btn btn-style-choice';
      sBtn.textContent = style.name;
      sBtn.onclick = () => showDetail(idx);
      btnsArea.appendChild(sBtn);
    });
    btnsArea.classList.remove('hidden');
    detailArea.classList.add('hidden');
  };

  // 3. 상세보기 렌더 함수
  function showDetail(idx) {
    const style = employeeStyles[idx];
    btnsArea.classList.add('hidden');
    detailArea.innerHTML = `
      <div class="employee-style-detail-box">
        <h3>${style.name}</h3>
        <h4>특징</h4>
        <ul>${style.traits.map(t => `<li>${t}</li>`).join('')}</ul>
        <h4>강점</h4>
        <p>${style.strengths}</p>
        <h4>단점</h4>
        <p>${style.weaknesses}</p>
        <h4>개선점</h4>
        <p>${style.improvement}</p>
        <h4>무슨 말을 해야 하나</h4>
        <p>${style.whatToSay}</p>
        <h4>대처법</h4>
        <ul>${style.solutions.map(s => `<li>${s}</li>`).join('')}</ul>
        <button class="btn btn-back">이전으로 돌아가기</button>
      </div>
    `;
    detailArea.classList.remove('hidden');
    detailArea.querySelector('.btn-back').onclick = () => {
      detailArea.classList.add('hidden');
      btnsArea.classList.remove('hidden');
    };
  }
} 