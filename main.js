const projects = [
  { title: '云雾山居', category: '建筑空间', cover: './assets/fall-line.jpg', summary: '围绕悬崖、瀑布与住宅空间展开的建筑展示。从外部立面进入水边空间与木质内核。', url: 'https://brilliant-dasik-c230c8.netlify.app/' },
  { title: '918 Spyder', category: '产品展示', cover: './assets/918-spyder.jpg', summary: '以 918 Spyder 为主题的汽车展示，沿着灯光、制动、驾驶舱与动力等章节逐步展开。', url: 'https://dynamic-ganache-3e60a1.netlify.app/' },
  { title: 'Silver Air', category: '产品展示', cover: './assets/silver-air.jpg', summary: '以耳机与充电盒为主体，通过 FORM、OPEN、CORE、ESSENCE 四个章节探索产品。', url: 'https://animated-kheer-eece7d.netlify.app/' },
  { title: 'Mountain Run', category: '游戏体验', cover: './assets/mountain-run.jpg', summary: 'H5 登山驾驶游戏 Demo，包含车辆、轮胎与路线选择。打开网站，体验山路驾驶。', url: 'https://mountain-run-demo.netlify.app/' }
];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const dialog = document.querySelector('dialog');
const gallery = document.querySelector('.gallery');
const articles = [...document.querySelectorAll('.project')];
let current = 0;
let opener;
function populate(index) {
  current = index;
  const project = projects[index];
  document.getElementById('dialog-title').textContent = project.title;
  document.getElementById('dialog-cover').src = project.cover;
  document.getElementById('dialog-cover').alt = `${project.title} 网站主页截图`;
  document.getElementById('dialog-index').textContent = `${String(index + 1).padStart(2, '0')} / SELECTED WORK`;
  document.getElementById('dialog-category').textContent = project.category;
  document.getElementById('dialog-summary').textContent = project.summary;
  document.getElementById('dialog-link').href = project.url;
  document.getElementById('next-title').textContent = projects[(index + 1) % projects.length].title;
}
function enter(index, trigger) {
  opener = trigger;
  populate(index);
  dialog.showModal();
  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
  document.querySelector('.close').focus({preventScroll:true});
  if (!reduced.matches) dialog.animate([{opacity:0,transform:'translateY(35px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,easing:'cubic-bezier(.22,1,.36,1)'});
}
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => enter(Number(button.dataset.open),button)));
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); opener?.focus({preventScroll:true}); });
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
});
document.querySelector('.next-project').addEventListener('click', () => { populate((current+1)%projects.length); dialog.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'}); document.querySelector('.close').focus({preventScroll:true}); });
document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.category;
  document.querySelectorAll('[data-category]').forEach(filter => filter.setAttribute('aria-pressed',String(filter===button)));
  gallery.classList.toggle('filtered',category!=='全部');
  articles.forEach(article => { article.hidden = category!=='全部' && article.dataset.type!==category; });
  document.getElementById('count').textContent = String(articles.filter(article=>!article.hidden).length).padStart(2,'0');
  if (!reduced.matches) gallery.animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'cubic-bezier(.22,1,.36,1)'});
}));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if (!entry.isIntersecting) return;
    if (!reduced.matches) entry.target.animate([{opacity:.35,transform:'translateY(26px)'},{opacity:1,transform:'translateY(0)'}],{duration:900,easing:'cubic-bezier(.22,1,.36,1)'});
    observer.unobserve(entry.target);
  }),{threshold:.12});
  articles.forEach(article=>observer.observe(article));
}
