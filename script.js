const menuToggle=document.querySelector(".menu-toggle");const nav=document.querySelector(".nav-links");
menuToggle?.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",open)});
nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const copyBtn=document.getElementById("copyIp");
copyBtn?.addEventListener("click",async()=>{const ip=copyBtn.dataset.ip;try{await navigator.clipboard.writeText(ip);copyBtn.innerHTML="IP کپی شد ✓";setTimeout(()=>copyBtn.innerHTML=`${ip} <span>کپی</span>`,1800)}catch{copyBtn.innerHTML="کپی نشد"}});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("joinForm")?.addEventListener("submit", e => { e.preventDefault(); const f=e.currentTarget,m=document.getElementById("formMessage"),d=Object.fromEntries(new FormData(f)); if(!d.minecraft||!d.age||!d.reason){m.textContent="لطفاً فیلدهای ضروری را کامل کن.";return} m.textContent="درخواستت ثبت شد. برای ارسال واقعی به Discord باید یک سرویس بک‌اند جداگانه وصل شود."; f.reset(); });
