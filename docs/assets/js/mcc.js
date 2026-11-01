/* ============================================================
   mcc_desk 랜딩 공통 스크립트
   - 모바일 햄버거 내비 토글
   - "오픈 예정" 알림 모달 (상담/이메일 등 준비중 CTA)
   - 인터랙티브 데모(비전→모션) : 해당 요소가 있을 때만 작동
   ============================================================ */
(function(){
  "use strict";

  /* ---- 햄버거 내비 ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      links.classList.toggle('open');
    });
    // 링크 클릭 시 메뉴 닫기(모바일)
    links.addEventListener('click', function(e){
      if(e.target.tagName === 'A') links.classList.remove('open');
    });
  }

  /* ---- 오픈 예정 모달 ---- */
  // 모달 DOM이 없으면 생성
  var ov = document.getElementById('comingModal');
  if(!ov){
    ov = document.createElement('div');
    ov.id = 'comingModal';
    ov.className = 'modal-ov';
    ov.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="cm-title">' +
        '<div class="mi">✉️</div>' +
        '<h3 id="cm-title">곧 오픈합니다</h3>' +
        '<p>상담 및 연락 이메일 채널은 현재 준비 중입니다.<br>오픈 시 이곳에서 안내해 드리겠습니다.</p>' +
        '<button class="mbtn" type="button" data-close>확인</button>' +
      '</div>';
    document.body.appendChild(ov);
  }
  function openModal(){ ov.classList.add('open'); }
  function closeModal(){ ov.classList.remove('open'); }

  // 오버레이/확인 버튼 클릭 시 닫기
  ov.addEventListener('click', function(e){
    if(e.target === ov || e.target.hasAttribute('data-close')) closeModal();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeModal();
  });

  // data-coming 속성 또는 상담/문의/이메일/download CTA를 가로채 모달 표시
  function isComing(el){
    if(el.hasAttribute('data-coming')) return true;
    var t = (el.textContent || '').trim();
    return /상담|문의|이메일|연락|다운로드|등록|신청|시작하기/.test(t);
  }
  document.addEventListener('click', function(e){
    var a = e.target.closest('a.btn, a.cta-mini, button.btn');
    if(!a) return;
    // 내부 앵커(#..)나 다른 페이지(.html)로의 실제 이동은 허용, 단 '#' 빈 링크·data-coming은 모달
    var href = a.getAttribute('href') || '';
    var internalNav = href.endsWith('.html') || (href.startsWith('#') && href.length > 1);
    if(a.hasAttribute('data-coming') || (!internalNav && isComing(a))){
      e.preventDefault();
      openModal();
    }
  });

  /* ---- 비전→모션 드래그 데모 (존재할 때만) ---- */
  var vp = document.getElementById('vp');
  var tg = document.getElementById('tg');
  if(vp && tg){
    var px=document.getElementById('px'), py=document.getElementById('py');
    var score=document.getElementById('score'), status=document.getElementById('status'), cmd=document.getElementById('cmd');
    var rx=document.getElementById('rx'), ry=document.getElementById('ry'), rt=document.getElementById('rt'), cr=document.getElementById('cr'), ms=document.getElementById('ms');
    var dragging=false;
    function place(cx,cy){
      var r=vp.getBoundingClientRect(), tw=tg.offsetWidth, th=tg.offsetHeight;
      var x=Math.max(0,Math.min(r.width-tw, cx-r.left-tw/2));
      var y=Math.max(0,Math.min(r.height-th, cy-r.top-th/2));
      tg.style.left=x+'px'; tg.style.top=y+'px';
      var nx=(x+tw/2)/r.width, ny=(y+th/2)/r.height;
      var ang=(nx*40-20);
      tg.style.transform='rotate('+ang.toFixed(1)+'deg)';
      var mmX=(nx*200-100), mmY=(100-ny*200);
      if(px) px.textContent=mmX.toFixed(2);
      if(py) py.textContent=mmY.toFixed(2);
      if(rx) rx.textContent=(nx*120).toFixed(2)+' mm';
      if(ry) ry.textContent=(ny*75).toFixed(2)+' mm';
      if(rt) rt.textContent=ang.toFixed(1)+'°';
      var dist=Math.hypot(nx-0.5,ny-0.5), s=Math.max(0.90,0.995-dist*0.12);
      if(score) score.textContent=s.toFixed(3);
      if(cr) cr.textContent=(s*100).toFixed(1)+'%';
      if(ms) ms.textContent=(10+Math.random()*6).toFixed(1)+' ms';
      if(status){ if(s>=0.95){status.textContent='● MATCH LOCKED';status.style.color='#17a05a';if(cmd)cmd.textContent='MOVE_ABS';}
        else{status.textContent='○ REFINING…';status.style.color='#d9741c';if(cmd)cmd.textContent='ALIGN';} }
    }
    function pt(e){ return e.touches?e.touches[0]:e; }
    vp.addEventListener('mousedown',function(e){dragging=true;var p=pt(e);place(p.clientX,p.clientY);});
    window.addEventListener('mousemove',function(e){if(!dragging)return;var p=pt(e);place(p.clientX,p.clientY);});
    window.addEventListener('mouseup',function(){dragging=false;});
    vp.addEventListener('mousemove',function(e){if(!dragging){var p=pt(e);place(p.clientX,p.clientY);}});
    vp.addEventListener('touchstart',function(e){dragging=true;var p=pt(e);place(p.clientX,p.clientY);e.preventDefault();},{passive:false});
    window.addEventListener('touchmove',function(e){if(!dragging)return;var p=pt(e);place(p.clientX,p.clientY);e.preventDefault();},{passive:false});
    window.addEventListener('touchend',function(){dragging=false;});
  }
})();
