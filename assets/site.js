async function loadProfile() {
  try {
    const res = await fetch('/data/profile.json');
    if (!res.ok) throw new Error('Profile JSON not found');
    const data = await res.json();

    document.getElementById('name').textContent = data.name || '';
    document.getElementById('tagline').textContent = data.tagline || '';
    const ln = document.getElementById('linkedin');
    if (data.linkedin) { ln.href = data.linkedin; ln.style.display = ''; } else ln.style.display = 'none';
    const gh = document.getElementById('github');
    if (data.github) { gh.href = data.github; gh.style.display = ''; } else gh.style.display = 'none';

    document.getElementById('bio').textContent = data.bio || '';
    const email = document.getElementById('email');
    if (data.email) { email.href = 'mailto:' + data.email; email.textContent = data.email; }

    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    const projects = data.projects || [];
    if (projects.length === 0) {
      const p = document.createElement('p');
      p.className = 'more';
      p.textContent = 'No projects added yet. Edit /data/profile.json to add projects.';
      grid.appendChild(p);
      return;
    }

    for (const proj of projects) {
      const card = document.createElement('article');
      card.className = 'card';
      const h3 = document.createElement('h3');
      if (proj.link) {
        const a = document.createElement('a');
        a.href = proj.link;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = proj.title || 'Project';
        h3.appendChild(a);
      } else {
        h3.textContent = proj.title || 'Project';
      }
      const p = document.createElement('p');
      p.textContent = proj.description || '';
      card.appendChild(h3);
      card.appendChild(p);
      grid.appendChild(card);
    }

  } catch (err) {
    console.error('Failed to load profile:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadProfile);
