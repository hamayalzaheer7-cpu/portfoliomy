const STORAGE_KEY = "hamayalPortfolio";

const defaultData = {
  name: "Hamayal Zaheer",
  role: "BS IT STUDENT ✳ WEB DEVELOPER ✳ MERN STACK LEARNER",
  intro: "I build clean, responsive websites and keep learning by turning ideas into working projects.",
  aboutHeading: "A web developer who enjoys building useful digital experiences.",
  about: "I'm Hamayal Zaheer, a 7th-semester BS Information Technology student at Superior University. I enjoy building responsive websites, learning modern web technologies, and creating practical solutions through code.",
  focus: "Frontend development & MERN stack learning",
  educationShort: "BS IT — Superior University",
  image: "",
  education: ["BS Information Technology | Superior University | 7th Semester", "Building practical skills through coursework and personal projects"],
  experience: ["Web Developer | Sky Infinit Institute | 2026–Present", "Frontend Development | Academic and personal projects | Ongoing"],
  skills: [
    { name: "HTML & CSS", level: 85 }, { name: "JavaScript", level: 75 },
    { name: "Bootstrap", level: 75 }, { name: "React", level: 55 },
    { name: "Git & GitHub", level: 50 }, { name: "MERN Stack", level: 35 }
  ],
  projects: [
    { name: "Easy Shopping", category: "HTML · CSS · JAVASCRIPT", description: "A multi-page shopping website with user accounts, product browsing, cart, checkout, and admin features using local storage." },
    { name: "Expense Tracker", category: "JAVASCRIPT", description: "A simple expense tracking interface for adding, viewing, and managing everyday expenses." },
    { name: "React Counter", category: "REACT · STATE", description: "A counter and settings panel using React state, event handling, conditional rendering, and local storage." },
    { name: "Team Member Cards", category: "REACT · PROPS", description: "Reusable React components that display team member information through props." }
  ],
  email: "hamayalzaheer7@gmail.com", phone: "", location: "Pakistan"
};

function cloneDefaults() {
  return JSON.parse(JSON.stringify(defaultData));
}

function loadPortfolio() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneDefaults();
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object" ||
        !Array.isArray(data.skills) ||
        !Array.isArray(data.education) ||
        !Array.isArray(data.experience) ||
        !Array.isArray(data.projects)) return cloneDefaults();
    return { ...cloneDefaults(), ...data };
  } catch (error) {
    console.warn("Could not read saved portfolio data.", error);
    return cloneDefaults();
  }
}

let portfolio = loadPortfolio();

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderTimeline(targetId, items, fallbackTitle) {
  const target = document.getElementById(targetId);
  target.replaceChildren();

  items.forEach((item) => {
    const parts = String(item).split("|").map(part => part.trim());
    const block = makeElement("article", "timeline-item");
    block.appendChild(makeElement("h4", "", parts[0] || fallbackTitle));
    if (parts.slice(1).join(" · ")) {
      block.appendChild(makeElement("p", "", parts.slice(1).join(" · ")));
    }
    target.appendChild(block);
  });
}

function renderSkills() {
  const list = document.getElementById("skillsList");
  list.replaceChildren();

  portfolio.skills.forEach((skill, index) => {
    const level = Math.max(0, Math.min(100, Number(skill.level) || 0));
    const row = makeElement("div", "skill-row");
    row.appendChild(makeElement("span", "skill-number", String(index + 1).padStart(2, "0")));
    row.appendChild(makeElement("span", "skill-name", skill.name));

    const track = makeElement("span", "skill-track");
    const fill = makeElement("span", "skill-fill");
    fill.style.width = level + "%";
    track.appendChild(fill);
    row.appendChild(track);
    row.appendChild(makeElement("span", "skill-percent", level + "%"));
    list.appendChild(row);
  });
}

function renderProjects() {
  const list = document.getElementById("projectList");
  list.replaceChildren();

  portfolio.projects.forEach((project, index) => {
    const card = makeElement("article", "project-card");
    const top = makeElement("div", "project-top");
    top.appendChild(makeElement("span", "", project.category || "PROJECT"));
    top.appendChild(makeElement("span", "", String(index + 1).padStart(2, "0") + " / " + String(portfolio.projects.length).padStart(2, "0")));

    const symbol = makeElement("div", "project-symbol", ["✳", "↗", "◌", "✦"][index % 4]);
    symbol.setAttribute("aria-hidden", "true");

    const bottom = makeElement("div", "project-bottom");
    bottom.appendChild(makeElement("h3", "", project.name));
    bottom.appendChild(makeElement("p", "", project.description || ""));

    card.append(top, symbol, bottom);
    list.appendChild(card);
  });
}

function renderPortfolio() {
  const displayName = portfolio.name || "Your Name";
  document.getElementById("navName").innerHTML = "";
  const navText = makeElement("span", "", displayName.toUpperCase());
  document.getElementById("navName").appendChild(navText);
  document.getElementById("navName").appendChild(makeElement("span", "", "®"));

  document.getElementById("heroName").replaceChildren();
  document.getElementById("heroName").append(
    document.createTextNode(displayName),
    makeElement("span", "title-period", ".")
  );
  document.getElementById("heroRole").textContent = portfolio.role;
  document.getElementById("heroIntro").textContent = portfolio.intro;
  document.getElementById("aboutName").textContent = displayName.toUpperCase();
  document.getElementById("aboutHeading").textContent = portfolio.aboutHeading;
  document.getElementById("aboutText").textContent = portfolio.about;
  document.getElementById("focusText").textContent = portfolio.focus;
  document.getElementById("educationShort").textContent = portfolio.educationShort;
  document.getElementById("footerName").textContent = displayName.toUpperCase() + "®";

  image.src = portfolio.image || "https://placehold.co/720x900/e9e4dc/25231f?text=YOUR+PORTRAIT";
  image.alt = "Portrait of " + displayName;

  renderTimeline("educationList", portfolio.education, "Education");
  renderTimeline("experienceList", portfolio.experience, "Experience");
  renderSkills();
  renderProjects();

  const email = portfolio.email || "yourname@example.com";
  const emailLink = document.getElementById("contactEmail");
  emailLink.textContent = email + " ↗";
  emailLink.href = "mailto:" + email;
  document.getElementById("contactLocation").textContent = (portfolio.location || "").toUpperCase();
  document.getElementById("year").textContent = new Date().getFullYear();
}

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen ? 'CLOSE <span>×</span>' : 'MENU <span>＋</span>';
});
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = 'MENU <span>＋</span>';
  });
});

renderPortfolio();
