const $ = id => document.getElementById(id);
const EMAIL = "nguyenvuduy64310@gmail.com"; 
const SKILLS = ["C++", "Python", "HTML", "CSS"];
const PROJ = [
  [
    "Website RujukCepat",
    "RujukCepat là một hệ sinh thái kỹ thuật số tích hợp giúp kết nối các dịch vụ y tế một cách nhanh chóng và toàn diện.",
    ["HTML & CSS", "JavaScript", "React JS", "Tailwind CSS"],
    "#047857,#022c22"
  ],
  [
    "RisetIn",
    "RisetIn là nền tảng kỹ thuật số ứng dụng trí tuệ nhân tạo (AI) giúp đẩy nhanh quá trình thương mại hóa nghiên cứu một cách dễ dàng và hiệu quả.",
    ["Figma", "VSCode", "HTML & CSS", "JavaScript", "React JS", "Tailwind CSS"],
    "#1d4ed8,#0f172a"
  ],
  [
    "Quản Lí Thú Y",
    "Ứng dụng quản lý bệnh viện thú y, giúp theo dõi sức khỏe và lịch sử điều trị của các chú thú cưng.",
    ["HTML & CSS", "JavaScript", ],
    "#b45309,#2a1203"
  ],
];

const chip = a => a.map((s, i) => `<b style="animation-delay:${i * 0.08}s">${s}</b>`).join("");

$("chips").innerHTML = chip(SKILLS);
$("grid").innerHTML = PROJ.map((p, i) => `<div class="card pc rv" style="transition-delay:${(i%3)*.12}s"><div class="thumb"><img src="images/du-an-${i+1}.jpg" alt="${p[0]}"></div><h3>${p[0]}</h3><p>${p[1]}</p><button class="btn" data-i="${i}">Chi tiết <svg class="i"><use href="#ar"/></svg></button></div>`).join("");
document.querySelectorAll("[data-i]").forEach(b => b.onclick = () => {
  const p = PROJ[b.dataset.i];
  $("mt").textContent = p[0];
  $("md").textContent = p[1];
  $("mg").innerHTML = chip(p[2]);
  $("modal").classList.add("on");
});

$("mc").onclick = () => $("modal").classList.remove("on");
$("modal").onclick = e => { if (e.target.id == "modal") $("modal").classList.remove("on"); };
addEventListener("keydown", e => { if (e.key == "Escape") $("modal").classList.remove("on"); });


const c = $("stars"), x = c.getContext("2d"), RM = matchMedia("(prefers-reduced-motion:reduce)").matches; 
let W, H, S = [], M = [];

function rs() {
  W = c.width = innerWidth;
  H = c.height = innerHeight;
  S = Array.from({ length: Math.floor(W * H / 9000) }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.3 + .3,
    p: Math.random() * 6.28,
    s: Math.random() * .02 + .005
  }));
}

function fr() {
  x.clearRect(0, 0, W, H);
  x.fillStyle = "#fff";
  for (const s of S) {
    s.p += s.s;
    x.globalAlpha = .3 + .7 * Math.abs(Math.sin(s.p));
    x.beginPath();
    x.arc(s.x, s.y, s.r, 0, 6.28);
    x.fill();
  }
  for (const m of M) {
    m.x += m.vx;
    m.y += m.vy;
    m.l -= .008;
    const tx = m.x - m.vx * 12, ty = m.y - m.vy * 12, g = x.createLinearGradient(m.x, m.y, tx, ty);
    g.addColorStop(0, `rgba(255,255,255,${m.l})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    x.globalAlpha = 1;
    x.strokeStyle = g;
    x.lineWidth = 1.6;
    x.beginPath();
    x.moveTo(m.x, m.y);
    x.lineTo(tx, ty);
    x.stroke();
  }
  M = M.filter(m => m.l > 0);
  if (!RM) requestAnimationFrame(fr);
}

rs();
addEventListener("resize", rs);
fr();

if (!RM) setInterval(() => {
  if (M.length < 2) M.push({ x: Math.random() * W * .8, y: Math.random() * H * .5, vx: 7 + Math.random() * 4, vy: 5 + Math.random() * 3, l: 1 });
}, 2400);

/* cursor glow + mascot eyes */
addEventListener("mousemove", e => {
  $("glow").style.left = e.clientX + "px";
  $("glow").style.top = e.clientY + "px";
  const r = $("mascot").getBoundingClientRect(), dx = e.clientX - (r.left + 26), dy = e.clientY - (r.top + 23), d = Math.hypot(dx, dy) || 1;
  $("eyes").style.transform = `translate(${dx / d * 3}px,${dy / d * 2}px)`;
});


const ph = $("photo"), tl = $("tilt");
if (ph && tl) {
  ph.onmousemove = e => {
    const r = ph.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    tl.style.transform = `rotateY(${px * 16}deg) rotateX(${-py * 16}deg)`;
  };
  ph.onmouseleave = () => tl.style.transform = "";
}

const secs = [...document.querySelectorAll("section")], links = [...document.querySelectorAll(".nav a")];
function spy() {
  let i = 0;
  secs.forEach((s, k) => { if (s.getBoundingClientRect().top < innerHeight * .5) i = k; });
  links.forEach((l, k) => l.classList.toggle("on", k == i));
  const a = links[i];
  $("pill").style.left = a.offsetLeft + "px";
  $("pill").style.width = a.offsetWidth + "px";
  $("mascot").style.left = (a.offsetLeft + a.offsetWidth / 2 - 26) + "px";
}
addEventListener("scroll", spy, { passive: true });
addEventListener("resize", spy);
addEventListener("load", spy);
spy();

/* reveal */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add("in");
    io.unobserve(e.target);
  }
}), { threshold: .15 });
document.querySelectorAll(".rv").forEach(el => io.observe(el));

/* typewriter */
const PH = ["Sinh viên công nghệ thông tin", "Lập trình C++ & Python ", "Đam mê học máy"];
let pi = 0, ci = 0, del = false;
(function ty() {
  const w = PH[pi];
  ci += del ? -1 : 1;
  $("tw").textContent = w.slice(0, ci);
  let d = del ? 35 : 70;
  if (!del && ci == w.length) {
    del = true;
    d = 1500;
  } else if (del && ci == 0) {
    del = false;
    pi = (pi + 1) % PH.length;
    d = 300;
  }
  setTimeout(ty, d);
})();

function toast(m) {
  const t = document.getElementById("toast");
  if (t) {
    t.textContent = m;
    t.classList.add("on");
    clearTimeout(toast.h);
    toast.h = setTimeout(() => t.classList.remove("on"), 2800);
  }
}

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBEcmCInqhGdxhsrO2cDSH2LoZZu3J39Uk",
  authDomain: "my-portfolio-dbac8.firebaseapp.com",
  databaseURL: "https://my-portfolio-dbac8-default-rtdb.firebaseio.com",
  projectId: "my-portfolio-dbac8",
  storageBucket: "my-portfolio-dbac8.firebasestorage.app",
  messagingSenderId: "149977976169",
  appId: "1:149977976169:web:4e8d9a75dc480ee83d01f8",
  measurementId: "G-FKE71ZTEDW"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const UPLOAD_LABEL = "Chọn ảnh đại diện";
let img = "";

const kfEl = document.getElementById("kf");
if (kfEl) {
  kfEl.onchange = e => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 5 * 1048576) { 
      e.target.value = ""; 
      return toast("Ảnh vượt quá 5MB"); 
    }
    const r = new FileReader();
    r.onload = () => { 
      img = r.result; 
      const klEl = document.getElementById("kl");
      if (klEl && klEl.lastChild) klEl.lastChild.textContent = " " + f.name; 
    };
    r.onerror = () => toast("Không đọc được ảnh");
    r.readAsDataURL(f);
  };
}

db.ref("comments").on("value", snapshot => {
  const data = snapshot.val();
  const cntEl = document.getElementById("cnt");
  const listEl = document.getElementById("list");

  if (!data) {
    if (cntEl) cntEl.textContent = "0";
    if (listEl) listEl.innerHTML = "";
    return;
  }

  const commentsArray = Object.values(data);
  if (cntEl) cntEl.textContent = commentsArray.length;

  if (listEl) {
    listEl.innerHTML = commentsArray.reverse().map(c => `
      <div>
        ${c.i 
          ? `<img src="${esc(c.i)}" alt="">` 
          : `<s>${esc((c.n && c.n[0]) || "?").toUpperCase()}</s>`}
        <span>
          <b>${esc(c.n)}</b>
          <p>${esc(c.t)}</p>
        </span>
      </div>
    `).join("");
  }
});

const kbEl = document.getElementById("kb");
if (kbEl) {
  kbEl.onclick = () => {
    const knEl = document.getElementById("kn");
    const kcEl = document.getElementById("kc");
    const n = knEl ? knEl.value.trim() : "";
    const t = kcEl ? kcEl.value.trim() : "";

    if (!n && !t) return toast("Vui lòng nhập tên và bình luận");
    if (!n) { if (knEl) knEl.focus(); return toast("Bạn chưa nhập tên"); }
    if (!t) { if (kcEl) kcEl.focus(); return toast("Bạn chưa nhập bình luận"); }

    db.ref("comments").push({
      n: n,
      t: t,
      i: img,
      time: new Date().toLocaleString("vi-VN")
    }).then(() => {
      if (kcEl) kcEl.value = "";
      img = "";
      const klEl = document.getElementById("kl");
      if (klEl && klEl.lastChild) klEl.lastChild.textContent = " " + UPLOAD_LABEL;
      if (kfEl) kfEl.value = "";
      toast("Đã gửi bình luận thành công!");
    }).catch(err => {
      console.error(err);
      toast("Lỗi gửi bình luận, thử lại sau!");
    });
  };
}

/* Thẻ treo con lắc, kéo thả được */
(function () {
  var pend = document.getElementById('lny-pend'), stage = document.getElementById('lny-stage'),
      bd = document.getElementById('lny-badge'), anc = document.getElementById('lny-anc');
  if (!pend || !bd || !stage || !anc) return;
  var th = 0.7, om = 0, drag = false, pl = 0, lt = 0, vis = false, running = false;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function swing(now) {
    var dt = Math.min(0.033, (now - lt) / 1000 || 0.016); lt = now;
    if (!drag) { om += (-15 * Math.sin(th) - 0.7 * om) * dt; th += om * dt; }
    pend.style.transform = 'rotate(' + th + 'rad)';
    if (vis) requestAnimationFrame(swing); else running = false;
  }
  function go() { if (!running && !reduce) { running = true; lt = performance.now(); requestAnimationFrame(swing); } }

  function pt(e) {
    var r = anc.getBoundingClientRect();
    return Math.max(-1.25, Math.min(1.25, Math.atan2(r.left - e.clientX, Math.max(40, e.clientY - r.top))));
  }
  bd.addEventListener('pointerdown', function (e) { drag = true; om = 0; pl = performance.now(); try { bd.setPointerCapture(e.pointerId); } catch (x) {} });
  bd.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var n = pt(e), now = performance.now(), d = Math.max(8, now - pl) / 1000;
    om = (n - th) / d * 0.6; th = n; pl = now;
    if (reduce) pend.style.transform = 'rotate(' + th + 'rad)';
  });
  function rel() { drag = false; om = Math.max(-6, Math.min(6, om)); }
  bd.addEventListener('pointerup', rel); bd.addEventListener('pointercancel', rel);

  if (reduce) { th = 0; pend.style.transform = 'none'; return; }
  pend.style.transform = 'rotate(' + th + 'rad)';
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) go(); }).observe(stage);
  } else { vis = true; go(); }
})();