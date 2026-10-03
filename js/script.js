const loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),700));

const header=document.getElementById("header");
const backTop=document.getElementById("backTop");
window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",scrollY>50);
  backTop.classList.toggle("show",scrollY>500);
});
backTop.onclick=()=>scrollTo({top:0,behavior:"smooth"});

const menuToggle=document.getElementById("menuToggle"), navLinks=document.getElementById("navLinks");
menuToggle.addEventListener("click",()=>navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

let counted=false;
const statsObserver=new IntersectionObserver(entries=>{
 if(entries[0].isIntersecting&&!counted){
  counted=true;
  document.querySelectorAll("[data-count]").forEach(el=>{
   const target=+el.dataset.count; let start=0; const duration=1100;
   const step=timestamp=>{if(!el.startTime)el.startTime=timestamp;const p=Math.min((timestamp-el.startTime)/duration,1);el.textContent=Math.floor(p*target).toLocaleString();if(p<1)requestAnimationFrame(step)};
   requestAnimationFrame(step);
  });
 }
},{threshold:.5});
statsObserver.observe(document.getElementById("stats"));

const schedule={
 Monday:[["06:30 AM","Strength Foundations","Rahul"],["08:00 AM","HIIT Conditioning","Neha"],["06:00 PM","Strength & Power","Rahul"],["08:00 PM","Boxing Basics","Arjun"]],
 Tuesday:[["07:00 AM","Mobility Flow","Maya"],["09:00 AM","Fat Loss Circuit","Neha"],["06:30 PM","Functional Training","Arjun"],["08:00 PM","Strength Foundations","Rahul"]],
 Wednesday:[["06:30 AM","Strength Foundations","Rahul"],["08:00 AM","HIIT Conditioning","Neha"],["06:00 PM","Performance Training","Arjun"],["07:30 PM","Mobility Flow","Maya"]],
 Thursday:[["07:00 AM","Functional Training","Arjun"],["09:00 AM","Fat Loss Circuit","Neha"],["06:00 PM","Strength & Power","Rahul"],["08:00 PM","Boxing Basics","Arjun"]],
 Friday:[["06:30 AM","Strength Foundations","Rahul"],["08:00 AM","Mobility Flow","Maya"],["06:00 PM","HIIT Conditioning","Neha"],["08:00 PM","Performance Training","Arjun"]],
 Saturday:[["08:00 AM","Full Body Conditioning","Neha"],["10:00 AM","Strength Foundations","Rahul"],["05:00 PM","Group Challenge","Arjun"],["07:00 PM","Mobility Flow","Maya"]]
};
const list=document.getElementById("scheduleList");
function renderSchedule(day){
 list.innerHTML=schedule[day].map(x=>`<div class="schedule-item"><time>${x[0]}</time><div><h4>${x[1]}</h4><p>Coach ${x[2]}</p></div><b>60 MIN</b></div>`).join("");
}
renderSchedule("Monday");
document.querySelectorAll("#dayTabs button").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll("#dayTabs button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");renderSchedule(btn.dataset.day);
}));

document.querySelectorAll(".choose-plan").forEach(btn=>btn.addEventListener("click",()=>{
 document.getElementById("interest").value="General Membership";
 document.getElementById("message").value=`I'm interested in the ${btn.dataset.plan} membership. Please contact me with the next steps.`;
 document.getElementById("contact").scrollIntoView({behavior:"smooth"});
 setTimeout(()=>document.getElementById("name").focus(),600);
}));

document.getElementById("contactForm").addEventListener("submit",e=>{
 e.preventDefault();
 const name=document.getElementById("name").value.trim(), phone=document.getElementById("phone").value.trim();
 const interest=document.getElementById("interest").value, msg=document.getElementById("message").value.trim();
 const text=`Hi IRONCORE, I'm ${name}. Phone: ${phone}. I'm interested in ${interest}.${msg?` Message: ${msg}`:""}`;
 const url="https://wa.me/919999999999?text="+encodeURIComponent(text);
 const note=document.getElementById("formNote");
 note.textContent="Opening WhatsApp with your enquiry…";
 window.open(url,"_blank","noopener");
});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
 const id=a.getAttribute("href");if(id.length>1){const el=document.querySelector(id);if(el){e.preventDefault();el.scrollIntoView({behavior:"smooth"});}}
}));
