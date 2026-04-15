async function loadPosts() {
  const res = await fetch("posts.json");
  const files = await res.json();

  const container = document.getElementById("blog-list");
  if (!container) return;

  for (let file of files.reverse()) {
    const md = await fetch("posts/" + file).then(r => r.text());

    const meta = parseMeta(md);

    const div = document.createElement("div");
    div.className = "blog-card";

    div.innerHTML = `
      <img src="${meta.image}" />
      <h4>${meta.title}</h4>
      <small>${meta.date}</small>
      <p>${meta.description}</p>
      <a href="post.html?file=${file}">Đọc tiếp →</a>
    `;

    container.appendChild(div);
  }
}

function parseMeta(md) {
  const meta = {};
  const match = md.match(/---([\s\S]*?)---/);

  if (match) {
    match[1].split("\n").forEach(line => {
      const [key, ...rest] = line.split(":");
      if (key) meta[key.trim()] = rest.join(":").trim();
    });
  }

  return meta;
}

loadPosts();