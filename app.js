
(function(){
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>Array.from(c.querySelectorAll(s));
  const drawer=$('[data-drawer]'); const burger=$('[data-burger]'); const closeBtn=$('[data-drawer-close]');
  burger?.addEventListener('click',()=>{drawer?.classList.add('is-open');document.body.style.overflow='hidden';});
  closeBtn?.addEventListener('click',()=>{drawer?.classList.remove('is-open');document.body.style.overflow='';});
  drawer?.addEventListener('click',(e)=>{if(e.target===drawer){drawer.classList.remove('is-open');document.body.style.overflow='';}});
  $$('.accordion[data-acc]').forEach(acc=>{$$('[data-acc-btn]',acc).forEach(btn=>{btn.addEventListener('click',()=>{const item=btn.closest('.acc-item');const panel=item.querySelector('[data-acc-panel]');const open=item.classList.contains('is-open');$$('.acc-item',acc).forEach(o=>{if(o!==item){o.classList.remove('is-open');const p=o.querySelector('[data-acc-panel]');if(p)p.style.maxHeight='0px';}});if(open){item.classList.remove('is-open');panel.style.maxHeight='0px';}else{item.classList.add('is-open');panel.style.maxHeight=panel.scrollHeight+'px';}});});});
  const io=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-in');io.unobserve(entry.target);}});},{threshold:.14});
  $$('.reveal').forEach(el=>io.observe(el));
  const topBtn=$('[data-top]'); const checkTop=()=>{if(topBtn) topBtn.hidden=window.scrollY<500;}; window.addEventListener('scroll',checkTop,{passive:true}); checkTop();
})();

document.querySelectorAll('[data-slider]').forEach((slider)=>{
  const viewport = slider.querySelector('[data-slider-viewport]');
  const prev = slider.querySelector('[data-slider-prev]');
  const next = slider.querySelector('[data-slider-next]');
  const step = () => Math.min(viewport.clientWidth * 0.9, 420);
  prev?.addEventListener('click', ()=> viewport.scrollBy({left:-step(), behavior:'smooth'}));
  next?.addEventListener('click', ()=> viewport.scrollBy({left: step(), behavior:'smooth'}));
});


// Fix slider buttons even when they live outside the data-slider block
document.querySelectorAll('.section-block').forEach((section)=>{
  const viewport = section.querySelector('[data-slider-viewport]');
  const prev = section.querySelector('[data-slider-prev]');
  const next = section.querySelector('[data-slider-next]');
  if(!viewport || !prev || !next) return;
  const step = () => Math.min(viewport.clientWidth * 0.92, 420);
  prev.addEventListener('click', ()=> viewport.scrollBy({left:-step(), behavior:'smooth'}));
  next.addEventListener('click', ()=> viewport.scrollBy({left: step(), behavior:'smooth'}));
});

// Auto gallery slider
document.querySelectorAll('[data-gallery-slider]').forEach((slider)=>{
  const track = slider.querySelector('.gallery-slider__track');
  const slides = Array.from(slider.querySelectorAll('.gallery-slide'));
  const dots = Array.from(slider.querySelectorAll('.gallery-slider__dot'));
  if(!track || slides.length === 0) return;
  let current = 0;

  const render = ()=>{
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i)=> dot.classList.toggle('is-active', i === current));
  };

  dots.forEach((dot, i)=>{
    dot.addEventListener('click', ()=>{
      current = i;
      render();
    });
  });

  render();
  setInterval(()=>{
    current = (current + 1) % slides.length;
    render();
  }, 3200);
});
