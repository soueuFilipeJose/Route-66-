const pages = window.ROUTE66_PAGES;
const hotspots = window.ROUTE66_HOTSPOTS;
const descriptions = {
  home: 'Página inicial com logo Route 66 Burgers, produtos em destaque, promoção e rodapé institucional.',
  cardapio: 'Cardápio completo com novidades, famosos, bebidas e sobremesas, além do painel de detalhes do produto.',
  pedido: 'Tela de finalização do pedido com adicionais, forma de entrega, pagamento e botão de finalizar.',
  lanchonete: 'Página institucional com apresentação da lanchonete, endereço, horário e informações de contato.',
  login: 'Tela de entrada na conta com campos de email, senha e opções de criação de conta.',
  perfil: 'Tela de perfil do usuário com pedidos recentes, endereço padrão, nível de cliente e acessibilidade.',
  guiche: 'Tela de guichê físico da lanchonete, com cardápio em modo claro e navegação lateral por categorias.',
  servicos: 'Tela de serviços, fonte popular e recursos de acessibilidade visual.'
};
let current = 'home';
const img = document.getElementById('screenImage');
const layer = document.getElementById('hotspotLayer');
const title = document.getElementById('screenTitle');
const desc = document.getElementById('screenDescription');
const toast = document.getElementById('toast');
function showToast(text){toast.textContent=text;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}
function go(page){
  if(!pages[page]) return;
  current = page;
  const info = pages[page];
  img.src = `assets/screens/${info.img}`;
  img.alt = info.title + ' - Route 66 Burgers';
  title.textContent = info.title;
  desc.textContent = descriptions[page] || '';
  layer.innerHTML = '';
  (hotspots[page] || []).forEach((h,idx)=>{
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'hotspot';
    b.setAttribute('aria-label', h.label || 'Área clicável');
    b.style.left = h.x + '%'; b.style.top = h.y + '%'; b.style.width = h.w + '%'; b.style.height = h.h + '%';
    b.addEventListener('click',()=>{
      if(h.target) go(h.target);
      if(h.action === 'finish') showToast('Pedido finalizado! Sua comanda foi gerada.');
      if(h.action === 'location') showToast('Localização da Route 66 Burgers em Franca/SP.');
    });
    layer.appendChild(b);
  });
  history.replaceState(null,'','#'+page);
  window.scrollTo({top:0,behavior:'smooth'});
}
document.addEventListener('click',e=>{
  const btn = e.target.closest('[data-go]');
  if(btn) go(btn.dataset.go);
});
document.getElementById('toggleTools').addEventListener('click',()=>{
  document.querySelector('.top-tools').classList.toggle('is-hidden');
});
window.addEventListener('hashchange',()=>go(location.hash.slice(1)||'home'));
go(location.hash.slice(1)||'home');
