/* Intro logo reveal — plays once per page load, then reveals the site */
(()=>{
    const overlay=document.getElementById('introOverlay');
    if(!overlay)return;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        overlay.remove();
        return;
    }
    document.body.classList.add('intro-lock');
    setTimeout(()=>{
        overlay.classList.add('exit');
        document.body.classList.remove('intro-lock');
        setTimeout(()=>overlay.remove(),750);
    },1400);
})();

const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu?.addEventListener('click',()=>nav.classList.toggle('open'));

/* Services accordion — only one open at a time */
document.querySelectorAll('.service-row').forEach(row=>{
    row.addEventListener('toggle',()=>{
        if(row.open){
            document.querySelectorAll('.service-row').forEach(other=>{
                if(other!==row)other.open=false;
            });
        }
    });
});

/* Resume timeline — click the dot or the heading to jump to that position, and light its dot */
document.querySelectorAll('.resume-job').forEach(job=>{
    const dot=job.querySelector('.resume-dot');
    const jump=()=>{
        job.scrollIntoView({behavior:'smooth',block:'start'});
        const panel=job.closest('.resume-experience,.resume-education')||document;
        panel.querySelectorAll('.resume-dot.active').forEach(d=>d.classList.remove('active'));
        dot?.classList.add('active');
    };
    dot?.addEventListener('click',jump);
    const heading=job.querySelector('.resume-job-heading');
    if(heading){
        heading.style.cursor='pointer';
        heading.addEventListener('click',jump);
    }
});

/* Announcement bar close button */
(()=>{
    const bar=document.getElementById('announceBar');
    if(!bar)return;
    bar.querySelector('.announce-close')?.addEventListener('click',()=>{
        bar.classList.add('hidden');
        setTimeout(()=>bar.classList.remove('hidden'),3000);
    });
    bar.querySelector('.announce-cta')?.addEventListener('click',()=>{
        setTimeout(()=>{
            document.querySelector('#contact input[name="name"]')?.focus();
        },500);
    });
})();

/* Hero slider */
(()=>{
    const slider=document.getElementById('heroSlider');
    if(!slider)return;
    const slides=[...slider.querySelectorAll('.hero-slide')];
    const dotsWrap=slider.querySelector('.slider-dots');
    const prevBtn=slider.querySelector('.slider-arrow.prev');
    const nextBtn=slider.querySelector('.slider-arrow.next');
    const currentLabel=slider.querySelector('.slider-counter .current');
    const totalLabel=slider.querySelector('.slider-counter .total');
    if(!slides.length)return;

    let index=slides.findIndex(s=>s.classList.contains('active'));
    if(index<0)index=0;
    let timer=null;
    const AUTOPLAY_MS=3000;

    totalLabel&&(totalLabel.textContent=String(slides.length).padStart(2,'0'));

    slides.forEach((slide,i)=>{
        const dot=document.createElement('button');
        dot.type='button';
        dot.setAttribute('aria-label',`Go to slide ${i+1}`);
        dot.addEventListener('click',()=>goTo(i,true));
        dotsWrap?.append(dot);
    });
    const dots=dotsWrap?[...dotsWrap.children]:[];

    function render(direction){
        slides.forEach((slide,i)=>{
            slide.classList.remove('dir-next','dir-prev');
            const isActive=i===index;
            slide.classList.toggle('active',isActive);
            if(isActive)slide.classList.add(direction==='prev'?'dir-prev':'dir-next');
        });
        dots.forEach((dot,i)=>dot.classList.toggle('active',i===index));
        currentLabel&&(currentLabel.textContent=String(index+1).padStart(2,'0'));
    }

    function goTo(i,manual,direction){
        const target=(i+slides.length)%slides.length;
        if(!direction)direction=target>index||(index===slides.length-1&&target===0)?'next':'prev';
        index=target;
        render(direction);
        if(manual)restart();
    }

    function next(manual){goTo(index+1,manual,'next')}
    function prev(manual){goTo(index-1,manual,'prev')}

    function restart(){
        clearInterval(timer);
        timer=setInterval(()=>next(false),AUTOPLAY_MS);
    }

    prevBtn?.addEventListener('click',()=>prev(true));
    nextBtn?.addEventListener('click',()=>next(true));
    slider.addEventListener('mouseenter',()=>clearInterval(timer));
    slider.addEventListener('mouseleave',restart);

    render();
    restart();
})();

document.addEventListener('DOMContentLoaded',()=>{const resumeSection=document.querySelector('#resume');if(!resumeSection)return;const work=document.createElement('section');work.id='work';work.className='work-preview';work.innerHTML=`<p>— SELECTED WORK</p><div class="work-preview-top"><h2>A selection of<br><i>my projects</i></h2><a href="work.html">View all work →</a></div><div class="work-preview-grid"><a href="work.html?category=design#design-projects"><img src="assets/prudential-mockup-3.png" alt="Prudential business card design"><span>Prudential Business Cards<small>Design · Print identity</small></span></a><a href="work.html?category=design#design-projects"><img src="assets/ltc-ipoh-poster-1.jpg" alt="LTC Ipoh recruitment poster"><span>LTC Ipoh Recruitment Campaign<small>Design · Recruitment poster</small></span></a><a href="work.html?category=design#design-projects"><img src="assets/prudential-mockup-1.png" alt="Prudential business card mockup"><span>Prudential Print Mockup<small>Design · Marketing</small></span></a></div></section>`;resumeSection.before(work);document.querySelectorAll('nav a').forEach(link=>{if(link.textContent.trim()==='Work')link.href='#work'});const s=document.createElement('style');s.textContent=`.work-preview{padding:7rem 6vw;background:#0b0b0b;border-top:1px solid #292929;color:#eeeae5}.work-preview>p{color:#c5ff3f;font-size:.72rem;font-weight:800;letter-spacing:.14em}.work-preview-top{display:flex;justify-content:space-between;align-items:end;margin:1.5rem 0 3rem}.work-preview h2{font:600 clamp(3rem,5.5vw,5.8rem)/.86 'Bodoni Moda',Georgia,serif;letter-spacing:-.08em;margin:0}.work-preview h2 i{color:#c5ff3f;font-weight:400}.work-preview-top>a{border-bottom:1px solid #c5ff3f;color:#c5ff3f;padding-bottom:.4rem;text-transform:uppercase;font-size:.72rem;font-weight:800}.work-preview-grid{display:grid;grid-template-columns:1.15fr .85fr .85fr;gap:1rem}.work-preview-grid a{height:430px;position:relative;overflow:hidden;background:#171717}.work-preview-grid img{width:100%;height:100%;object-fit:cover;transition:transform .4s}.work-preview-grid a:hover img{transform:scale(1.05)}.work-preview-grid a:after{content:'';position:absolute;inset:0;background:linear-gradient(transparent 40%,rgba(0,0,0,.82))}.work-preview-grid span{position:absolute;z-index:1;bottom:0;padding:1.5rem;font:600 1.4rem 'Bodoni Moda',Georgia,serif}.work-preview-grid small{display:block;margin-top:.45rem;color:#c5ff3f;font:700 .65rem Manrope,Arial;text-transform:uppercase;letter-spacing:.08em}@media(max-width:760px){.work-preview{padding:5rem 7vw}.work-preview-top{display:block}.work-preview-top>a{display:inline-block;margin-top:1.5rem}.work-preview-grid{grid-template-columns:1fr}.work-preview-grid a{height:380px}}`;document.head.append(s);

    /* Scroll-spy nav highlighting — set up AFTER Work section exists so it's tracked correctly */
    const pageLinks=[...document.querySelectorAll('nav a[href^="#"]')].filter(link=>link.getAttribute('href')!=='#contact'||!link.classList.contains('hire'));
    const trackedSections=pageLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
    const setCurrent=id=>pageLinks.forEach(link=>link.classList.toggle('current',link.getAttribute('href')===`#${id}`));
    const scrollObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setCurrent(entry.target.id)}),{rootMargin:'-35% 0px -55% 0px',threshold:0});
    trackedSections.forEach(section=>scrollObserver.observe(section));
    window.addEventListener('scroll',()=>{
        const atBottom=window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-2;
        if(atBottom&&trackedSections.length)setCurrent(trackedSections[trackedSections.length-1].id);
    },{passive:true});
});

document.querySelectorAll('.hire').forEach(link=>link.href='mailto:ryan.kxuane@gmail.com?subject=Freelance%20enquiry');
const contact=document.querySelector('#contact');if(contact){contact.outerHTML=`<section id="contact" class="contact-new"><h2>Let's work<br><i>together.</i></h2><div class="contact-layout"><div class="contact-info"><p>I'm open to freelance projects, remote contracts, and long-term collaborations. Whether you need a designer, translator, data specialist, or IT support — let's talk.</p><div class="contact-actions"><a class="email-button lime" href="mailto:ryan.kxuane@gmail.com?subject=Freelance%20enquiry">Hire me</a><a class="email-button" href="mailto:ryan.kxuane@gmail.com">Email me</a><a class="email-button ig-button" href="https://www.instagram.com/nobledesign__/" target="_blank" rel="noopener"><svg class="ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</a><a class="email-button fb-button" href="https://www.facebook.com/people/NobleCo/61580154308859/" target="_blank" rel="noopener"><svg class="fb-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</a><a class="email-button wa-button" href="https://wa.me/60187710388?text=Hi%20Noble%20Design%2C%20I%27d%20like%20to%20enquire%20about%20a%20project." target="_blank" rel="noopener"><svg class="wa-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.464 3.484 1.345 4.997L2 22l5.117-1.343a9.96 9.96 0 0 0 4.887 1.253h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.182-2.929-7.071a9.935 9.935 0 0 0-7.072-2.929zm0 18.19h-.003a8.19 8.19 0 0 1-4.17-1.14l-.299-.177-3.104.814.828-3.027-.194-.31a8.19 8.19 0 0 1-1.259-4.36c0-4.523 3.681-8.203 8.203-8.203a8.15 8.15 0 0 1 5.798 2.4 8.15 8.15 0 0 1 2.4 5.803c0 4.522-3.68 8.2-8.2 8.2z"/><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>WhatsApp</a></div><dl><dt>✉ Email</dt><dd><a href="mailto:ryan.kxuane@gmail.com">ryan.kxuane@gmail.com</a></dd><dt>◎ Location</dt><dd>Remote — Available Worldwide</dd><dt>◇ Languages</dt><dd>English · Chinese · Cantonese · Malay</dd><dt>◷ Availability</dt><dd>Open for projects — 2026</dd><dt>◈ Instagram</dt><dd><a href="https://www.instagram.com/nobledesign__/" target="_blank" rel="noopener">@nobledesign__</a></dd><dt>◈ Facebook</dt><dd><a href="https://www.facebook.com/people/NobleCo/61580154308859/" target="_blank" rel="noopener">NobleCo</a></dd><dt>◈ WhatsApp</dt><dd><a href="https://wa.me/60187710388?text=Hi%20Noble%20Design%2C%20I%27d%20like%20to%20enquire%20about%20a%20project." target="_blank" rel="noopener">+60 18-771 0388</a></dd></dl></div><form class="contact-form" action="https://formspree.io/f/xgawbnwo" method="POST"><input type="hidden" name="_subject" value="New enquiry — Noble Design website"><label>Name<input required name="name" placeholder="Your Name"></label><label>Email<input required type="email" name="email" placeholder="you@email.com"></label><label>Service needed<select name="service"><option>Select a service...</option><option>Graphic Design</option><option>Data & AI</option><option>Translation</option><option>IT Support</option><option>Other</option></select></label><label>Message<textarea required name="message" placeholder="Tell me about your project or task..."></textarea></label><button class="send" type="submit">Send message →</button></form></div></section>`;document.querySelector('.contact-form').addEventListener('submit',async e=>{
    e.preventDefault();
    const form=e.currentTarget;
    const button=form.querySelector('.send');
    const originalLabel=button.textContent;
    button.textContent='Sending…';
    button.disabled=true;
    try{
        const res=await fetch(form.action,{
            method:'POST',
            body:new FormData(form),
            headers:{'Accept':'application/json'}
        });
        if(res.ok){
            form.innerHTML='<p class="form-success">Thanks — your message has been sent. I\'ll get back to you soon.</p>';
        }else{
            button.textContent='Something went wrong — try again';
            button.disabled=false;
        }
    }catch(err){
        button.textContent='Something went wrong — try again';
        button.disabled=false;
    }
});}
const footer=document.querySelector('footer');if(footer)footer.outerHTML=`<footer class="footer-new"><div><img src="assets/noble-design-logo-second.png" alt="Noble Design"><b>CREATIVE · DIGITAL · LANGUAGE · TECH</b></div><div><p>Services</p><a href="work.html?category=design#design-projects">Graphic Design</a><a href="work.html?category=documents#document-projects">Content &amp; Documents</a><a href="work.html?category=data-entry#data-entry-projects">Data Entry &amp; Research</a><a href="work.html?category=data-ai#ai-projects">Data &amp; AI</a><a href="work.html?category=translation#translation-projects">Translation</a><a href="work.html?category=interpretation#interpretation-projects">Interpretation</a><a href="work.html?category=it#it-projects">IT Support</a></div><div><p>Navigate</p><a href="#home">Home</a><a href="#about">About</a><a href="#services">Services</a><a href="#work">Work</a><a href="#resume">Resume</a><a href="#contact">Contact</a></div><div><p>Follow</p><div class="social-icons"><a class="social-icon ig-social" href="https://www.instagram.com/nobledesign__/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a><a class="social-icon fb-social" href="https://www.facebook.com/people/NobleCo/61580154308859/" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a><a class="social-icon wa-social" href="https://wa.me/60187710388?text=Hi%20Noble%20Design%2C%20I%27d%20like%20to%20enquire%20about%20a%20project." target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.464 3.484 1.345 4.997L2 22l5.117-1.343a9.96 9.96 0 0 0 4.887 1.253h.004c5.514 0 9.997-4.483 9.997-9.997 0-2.67-1.04-5.182-2.929-7.071a9.935 9.935 0 0 0-7.072-2.929zm0 18.19h-.003a8.19 8.19 0 0 1-4.17-1.14l-.299-.177-3.104.814.828-3.027-.194-.31a8.19 8.19 0 0 1-1.259-4.36c0-4.523 3.681-8.203 8.203-8.203a8.15 8.15 0 0 1 5.798 2.4 8.15 8.15 0 0 1 2.4 5.803c0 4.522-3.68 8.2-8.2 8.2z"/><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg></a></div></div><small>© 2026 NobleDesign. All rights reserved.<span>Digital Freelance Specialist</span></small></footer>`;
const contactStyle=document.createElement('style');contactStyle.textContent=`.contact-new{padding:7rem 8vw;background:#151515;border-top:1px solid #292929;color:#eeeae5;position:relative;z-index:0;overflow:hidden}.contact-new::before{content:'';position:absolute;z-index:-1;bottom:-160px;left:-120px;width:460px;height:460px;background:radial-gradient(circle,rgba(197,255,63,.10),transparent 70%);filter:blur(20px);pointer-events:none;animation:orb-drift 17s ease-in-out infinite reverse}@media(prefers-reduced-motion:reduce){.contact-new::before{animation:none}}.contact-new h2{font:600 clamp(4rem,8vw,8rem)/.8 'Bodoni Moda',Georgia,serif;letter-spacing:-.08em;margin:0}.contact-new h2 i{color:#c5ff3f;font-weight:400}.contact-layout{display:grid;grid-template-columns:.8fr 1.2fr;gap:7vw;margin-top:6rem}.contact-info>p{max-width:520px;color:#aaa4a0;line-height:1.8}.contact-actions{display:flex;gap:1rem;flex-wrap:wrap;margin:3rem 0}.ig-icon,.fb-icon,.wa-icon{width:16px;height:16px;flex-shrink:0}.email-button{display:inline-flex;align-items:center;gap:.5rem}.email-button.ig-button{background:linear-gradient(135deg,#feda75 0%,#fa7e1e 22%,#d62976 55%,#962fbf 78%,#4f5bd5 100%);color:#fff;border:0;transition:transform .2s ease,box-shadow .2s ease}.email-button.ig-button:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(214,41,118,.35)}.email-button.fb-button{background:#1877f2;color:#fff;border:0;transition:transform .2s ease,box-shadow .2s ease}.email-button.fb-button:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(24,119,242,.4)}.email-button.wa-button{background:#25d366;color:#0c0c0c;border:0;transition:transform .2s ease,box-shadow .2s ease}.email-button.wa-button:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(37,211,102,.4)}.email-button{border:1px solid #373737;padding:1rem 1.6rem;text-transform:uppercase;font:800 .7rem Manrope,Arial;letter-spacing:.05em}.contact-info dl{display:grid;gap:.8rem;margin-top:4rem}.contact-info dt{color:#c5ff3f;text-transform:uppercase;font-size:.68rem;letter-spacing:.1em}.contact-info dd{margin:0 0 1.2rem;font-weight:700;font-size:.85rem}.contact-info dd a{color:#fff;text-decoration:underline;text-decoration-color:rgba(255,255,255,.35);text-underline-offset:3px;transition:color .2s ease,text-decoration-color .2s ease}.contact-info dd a:hover{color:#c5ff3f;text-decoration-color:#c5ff3f}.contact-form{display:grid;grid-template-columns:1fr 1fr;gap:1.4rem}.contact-form label{font-size:.68rem;color:#b9ab98;text-transform:uppercase;letter-spacing:.1em}.contact-form label:nth-of-type(3),.contact-form label:nth-of-type(4),.send{grid-column:1/-1}.contact-form input,.contact-form select,.contact-form textarea{display:block;width:100%;margin-top:.65rem;padding:1rem;background:#151515;border:1px solid #373737;color:#eeeae5;font:inherit}.contact-form textarea{height:190px}.send{position:relative;overflow:hidden;padding:1.1rem;background:#c5ff3f;border:0;color:#111;text-transform:uppercase;font-weight:800;letter-spacing:.06em;transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s ease}.send:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(197,255,63,.35)}.send:active{transform:translateY(-1px) scale(.97)}.send::before{content:'';position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(115deg,transparent,rgba(255,255,255,.5),transparent);transform:skewX(-20deg);transition:left .6s ease}.send:hover::before{left:120%}.send:disabled{opacity:.65;cursor:default}.form-success{grid-column:1/-1;padding:1.4rem;border:1px solid #c5ff3f;color:#c5ff3f;font-size:.95rem;line-height:1.6}.footer-new{padding:4rem 8vw 2.5rem;display:grid;grid-template-columns:1fr 210px 140px 130px;gap:3rem;background:#0b0b0b;border-top:1px solid #292929;color:#aaa4a0}.footer-new img{width:auto;height:64px;object-fit:contain}.footer-new h3{margin:1rem 0;font:600 1.6rem 'Bodoni Moda',Georgia,serif;color:#eeeae5}.footer-new b,.footer-new p{font-size:.68rem;letter-spacing:.12em;text-transform:uppercase}.footer-new b{color:#c5ff3f;display:block;margin-top:1.2rem}.footer-new a{display:block;margin:.75rem 0;color:#aaa4a0}.footer-new .social-icons{display:flex;gap:.8rem;margin-top:.75rem}.footer-new .social-icon{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;margin:0;border-radius:50%;border:1px solid #373737;color:#eeeae5;transition:background .25s ease,border-color .25s ease,transform .25s ease,box-shadow .25s ease}.footer-new .social-icon svg{width:20px;height:20px}.footer-new .ig-social:hover{background:linear-gradient(135deg,#feda75 0%,#fa7e1e 22%,#d62976 55%,#962fbf 78%,#4f5bd5 100%);border-color:transparent;color:#fff;transform:translateY(-3px);box-shadow:0 8px 22px rgba(214,41,118,.35)}.footer-new .fb-social:hover{background:#1877f2;border-color:transparent;color:#fff;transform:translateY(-3px);box-shadow:0 8px 22px rgba(24,119,242,.4)}.footer-new .wa-social:hover{background:#25d366;border-color:transparent;color:#0c0c0c;transform:translateY(-3px);box-shadow:0 8px 22px rgba(37,211,102,.4)}.footer-new small{grid-column:1/-1;border-top:1px solid #292929;padding-top:1.8rem;letter-spacing:.08em}.footer-new small span{float:right}@media(max-width:760px){.contact-new{padding:5rem 7vw}.contact-layout,.footer-new{grid-template-columns:1fr;gap:2rem;margin-top:3rem}.contact-form{grid-template-columns:1fr}.contact-form label{grid-column:1/-1!important}.footer-new{padding:3rem 7vw}.footer-new small span{float:none;display:block;margin-top:1rem}}`;document.head.append(contactStyle);

/* Removed: this block used to overwrite the #resume section in index.html
   with hardcoded content on every page load, which is why edits made
   directly in index.html never appeared. The accordion resume markup in
   index.html (styled by rebuild.css) is now left alone and displays as-is. */

document.addEventListener('DOMContentLoaded',()=>{
    const tabs=document.querySelectorAll('.resume-tab');
    const experiencePanel=document.querySelector('.resume-experience');
    const educationPanel=document.querySelector('.resume-education');
    if(!tabs.length||!experiencePanel||!educationPanel)return;
    tabs.forEach(tab=>tab.addEventListener('click',()=>{
        tabs.forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        const showEducation=tab.dataset.tab==='education';
        experiencePanel.hidden=showEducation;
        educationPanel.hidden=!showEducation;
    }));
});

/* =========================================================
   SCROLL PROGRESS BAR
   ========================================================= */
(()=>{
    const bar=document.getElementById('scrollProgress');
    if(!bar)return;
    const update=()=>{
        const scrollTop=window.scrollY;
        const docHeight=document.documentElement.scrollHeight-window.innerHeight;
        bar.style.width=(docHeight>0?(scrollTop/docHeight)*100:0)+'%';
    };
    window.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update);
    update();
})();

/* =========================================================
   HERO CURSOR GLOW
   ========================================================= */
(()=>{
    const hero=document.querySelector('.hero');
    if(!hero||!window.matchMedia('(hover:hover)').matches)return;
    const glow=document.createElement('div');
    glow.className='hero-glow';
    hero.prepend(glow);
    hero.addEventListener('mousemove',e=>{
        const rect=hero.getBoundingClientRect();
        glow.style.setProperty('--mx',(e.clientX-rect.left)+'px');
        glow.style.setProperty('--my',(e.clientY-rect.top)+'px');
    });
})();

/* =========================================================
   SKILL BARS — FILL IN ON SCROLL
   ========================================================= */
(()=>{
    const bars=[...document.querySelectorAll('.skill-bar span')];
    if(!bars.length)return;
    bars.forEach(bar=>{
        bar.dataset.target=bar.style.width;
        bar.style.width='0%';
    });
    const skillObserver=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                requestAnimationFrame(()=>{entry.target.style.width=entry.target.dataset.target;});
                skillObserver.unobserve(entry.target);
            }
        });
    },{threshold:.4});
    bars.forEach(bar=>skillObserver.observe(bar));
})();

/* =========================================================
   BUTTON CLICK RIPPLE
   ========================================================= */
(()=>{
    const addRipple=el=>{
        el.addEventListener('click',e=>{
            const rect=el.getBoundingClientRect();
            const size=Math.max(rect.width,rect.height);
            const ripple=document.createElement('span');
            ripple.className='btn-ripple';
            ripple.style.width=ripple.style.height=size+'px';
            ripple.style.left=(e.clientX-rect.left-size/2)+'px';
            ripple.style.top=(e.clientY-rect.top-size/2)+'px';
            el.appendChild(ripple);
            ripple.addEventListener('animationend',()=>ripple.remove());
        });
    };
    document.querySelectorAll('.button,.hire,.send,.reviews-more,.announce-cta').forEach(addRipple);
})();

/* =========================================================
   BACK TO TOP BUTTON
   ========================================================= */
(()=>{
    const btn=document.createElement('button');
    btn.className='back-to-top';
    btn.type='button';
    btn.setAttribute('aria-label','Back to top');
    btn.innerHTML='↑';
    document.body.appendChild(btn);
    const toggle=()=>btn.classList.toggle('show',window.scrollY>window.innerHeight*.6);
    window.addEventListener('scroll',toggle,{passive:true});
    btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    toggle();
})();

/* =========================================================
   COUNT-UP STATS
   ========================================================= */
(()=>{
    const targets=[...document.querySelectorAll('.stats strong'),...document.querySelectorAll('.about-stats b')];
    if(!targets.length)return;
    const animate=el=>{
        const raw=el.textContent.trim();
        const match=raw.match(/^([\d.]+)(.*)$/);
        if(!match)return;
        const end=parseFloat(match[1]);
        const suffix=match[2];
        const decimals=match[1].includes('.')?match[1].split('.')[1].length:0;
        const duration=1200;
        const start=performance.now();
        const tick=now=>{
            const progress=Math.min((now-start)/duration,1);
            const eased=1-Math.pow(1-progress,3);
            el.textContent=(end*eased).toFixed(decimals)+suffix;
            if(progress<1)requestAnimationFrame(tick);
            else el.textContent=raw;
        };
        requestAnimationFrame(tick);
    };
    const countObserver=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                animate(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    },{threshold:.4});
    targets.forEach(el=>countObserver.observe(el));
})();

/* =========================================================
   SITE-WIDE SCROLL-REVEAL ANIMATIONS
   ========================================================= */
(()=>{
    const groupSelectors=[
        '.review-card',
        '.about-stats>div',
        '.service-row',
        '.resume-job',
        '.skill',
        '.projects article',
        '.work-preview-grid>a',
        '.four>div'
    ];
    const singleSelectors=[
        '.about-portrait',
        '.reviews-panel',
        '.about-content',
        '.services-top',
        '.resume-top',
        '.contact-info',
        '.contact-form',
        '.footer-new>div'
    ];

    groupSelectors.forEach(sel=>{
        document.querySelectorAll(sel).forEach((el,i)=>{
            el.classList.add('reveal');
            el.style.transitionDelay=`${Math.min(i,6)*70}ms`;
        });
    });
    singleSelectors.forEach(sel=>{
        document.querySelectorAll(sel).forEach(el=>el.classList.add('reveal'));
    });

    const revealObserver=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    },{threshold:.12,rootMargin:'0px 0px -60px 0px'});

    document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
})();