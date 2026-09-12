document.querySelectorAll('a[href^="#"]').forEach((link)=>{link.addEventListener('click',(event)=>{const target=document.querySelector(link.getAttribute('href'));if(target){event.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}})});

// Editor simples para personalização da página sem alterar o código.
const editableTextSelectors='h1,h2,h3,p,summary,.floating-card span,.benefit-list strong,.benefit-list span';
document.querySelectorAll(editableTextSelectors).forEach((el)=>{
  if(!el.closest('a') && !el.classList.contains('eyebrow')){
    el.contentEditable='true';
    el.title='Clique para editar este texto';
    el.classList.add('editable-field');
  }
});

// Cria áreas de imagem substituíveis nos espaços visuais da página.
const imageSlots=document.querySelectorAll('.hero-card,.use-visual');
imageSlots.forEach((slot,index)=>{
  if(slot.querySelector('.personal-image-editor')) return;
  const input=document.createElement('input');
  input.type='file';
  input.accept='image/*';
  input.className='personal-image-editor';
  input.title='Escolher imagem';
  const button=document.createElement('button');
  button.type='button';
  button.className='image-edit-button';
  button.textContent=index===0?'📷 Adicionar foto do iTeraCare':'📷 Adicionar foto';
  button.addEventListener('click',()=>input.click());
  input.addEventListener('change',()=>{
    const file=input.files?.[0];
    if(!file) return;
    const url=URL.createObjectURL(file);
    slot.dataset.customImage=url;
    slot.classList.add('has-custom-image');
    slot.style.backgroundImage=`url("${url}")`;
    slot.style.backgroundSize='cover';
    slot.style.backgroundPosition='center';
    const placeholder=slot.querySelector('.device-placeholder,.use-number,.use-visual span');
    if(placeholder) placeholder.style.opacity='0';
    const floating=slot.querySelector('.floating-card');
    if(floating) floating.style.zIndex='3';
  });
  slot.appendChild(input);
  slot.appendChild(button);
});

// Destaca visualmente os textos que podem ser editados.
document.querySelectorAll('.editable-field').forEach((el)=>{
  el.addEventListener('focus',()=>el.classList.add('editing'));
  el.addEventListener('blur',()=>el.classList.remove('editing'));
});
