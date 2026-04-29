// LOGOUT BUTTON
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
  });
}

// CURSOR GLOW
const cursorGlow = document.getElementById("cursorGlow");
document.addEventListener("mousemove", (e) => {
  if (cursorGlow) {
    cursorGlow.style.left = e.pageX + "px";
    cursorGlow.style.top = e.pageY + "px";
  }
});

// SCROLL REVEAL ANIMATION
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// BLOG LIST PAGE
const blogList = document.getElementById("blog-list");
if (blogList && typeof posts !== "undefined") {
  blogList.innerHTML = posts
    .map(
      (p) => `
      <div class="card reveal active">
        <h3>${p.title}</h3>
        <p class="subtitle">${p.date}</p>
        <p>Click to read more...</p>
        <a href="post.html?slug=${p.slug}">Read</a>
      </div>
    `
    )
    .join("");
}

// BLOG POST PAGE
const postTitle = document.getElementById("post-title");
const postDate = document.getElementById("post-date");
const postContent = document.getElementById("post-content");

if (postTitle && typeof posts !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const post = posts.find((p) => p.slug === slug);

  if (post) {
    postTitle.innerText = post.title;
    postDate.innerText = post.date;
    postContent.innerHTML = post.content;
  } else {
    postTitle.innerText = "Post Not Found";
    postContent.innerHTML = "<p>This blog post does not exist.</p>";
  }
}

// PARTICLES BACKGROUND
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function createParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.8,
        dy: (Math.random() - 0.5) * 0.8,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(drawParticles);
  }

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  });

  createParticles();
  drawParticles();
}
