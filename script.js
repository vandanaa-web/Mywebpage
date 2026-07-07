// ==========================================
// DATA
// ==========================================

let mySkills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"];

let projects = [
    { name: "Portfolio Website", status: "Completed", year: 2025 },
    { name: "Task Manager App", status: "In Progress", year: 2026 },
    { name: "E-commerce Store", status: "Planning", year: 2026 },
    { name: "Weather Dashboard", status: "Completed", year: 2025 },
    { name: "Chat Application", status: "In Progress", year: 2026 }
];

// ==========================================
// RANDOM COLORS
// ==========================================

const badgeColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#FF8A5C", "#A29BFE", "#FD79A8", "#00B894", "#E17055", "#74B9FF"];

function getRandomColor() {
    return badgeColors[Math.floor(Math.random() * badgeColors.length)];
}

// ==========================================
// UPDATE SKILL COUNTER
// ==========================================

function updateSkillCount() {
    const container = document.querySelector("#skillCounterContainer");
    
    // If container doesn't exist, create it
    if (!container) {
        console.log("Creating skill counter container...");
        const newContainer = document.createElement("div");
        newContainer.id = "skillCounterContainer";
        // Insert it after the "What I'm learning" heading
        const heading = document.querySelector("h3");
        if (heading) {
            heading.parentNode.insertBefore(newContainer, heading.nextSibling);
        }
        // Call the function again with the new container
        updateSkillCount();
        return;
    }
    
    // Clear and update
    container.innerHTML = "";
    
    const counterElement = document.createElement("div");
    counterElement.style.padding = "10px";
    counterElement.style.marginBottom = "10px";
    counterElement.style.backgroundColor = "rgba(255,255,255,0.08)";
    counterElement.style.borderRadius = "8px";
    counterElement.style.fontWeight = "bold";
    counterElement.style.fontSize = "1.1rem";
    
    const skillCount = mySkills.length;
    const emoji = skillCount > 5 ? "🔥" : "💪";
    counterElement.textContent = `${emoji} You have ${skillCount} skill${skillCount > 1 ? 's' : ''}!`;
    
    if (skillCount > 10) {
        counterElement.style.color = "#FFD93D";
    } else if (skillCount > 5) {
        counterElement.style.color = "#6BCB77";
    } else {
        counterElement.style.color = "#FF6B6B";
    }
    
    container.appendChild(counterElement);
}

// ==========================================
// RENDER SKILLS WITH DELETE BUTTONS
// ==========================================

function renderSkillsWithDeleteButtons() {
    const skillList = document.querySelector("#skillList");
    
    if (!skillList) {
        console.error("Skill list not found!");
        return;
    }
    
    skillList.innerHTML = "";
    
    if (mySkills.length === 0) {
        const emptyMsg = document.createElement("li");
        emptyMsg.textContent = "No skills added yet. Add one above!";
        emptyMsg.style.color = "#999";
        emptyMsg.style.textAlign = "center";
        emptyMsg.style.padding = "20px";
        emptyMsg.style.listStyle = "none";
        skillList.appendChild(emptyMsg);
        return;
    }
    
    mySkills.forEach((skill, index) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.padding = "10px 15px";
        li.style.marginBottom = "8px";
        li.style.backgroundColor = "rgba(255,255,255,0.06)";
        li.style.borderRadius = "10px";
        li.style.borderLeft = "4px solid #b3b3ff";
        
        const skillName = document.createElement("span");
        skillName.textContent = `🚀 ${skill}`;
        li.appendChild(skillName);
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌ Delete";
        deleteBtn.style.backgroundColor = "#ff6b6b";
        deleteBtn.style.color = "white";
        deleteBtn.style.border = "none";
        deleteBtn.style.padding = "5px 12px";
        deleteBtn.style.borderRadius = "5px";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.fontSize = "12px";
        
        deleteBtn.addEventListener("click", function() {
            mySkills.splice(index, 1);
            renderSkillsWithDeleteButtons();
            renderSkillsWithBadges();
            renderProjects();
            updateSkillCount();
            
            const heading = document.querySelector("#mainHeading");
            if (heading) {
                heading.textContent = `🗑️ Removed "${skill}"`;
                setTimeout(() => {
                    heading.textContent = "👋 Hello, I'm [Your Name]";
                }, 1500);
            }
        });
        
        li.appendChild(deleteBtn);
        skillList.appendChild(li);
    });
}

// ==========================================
// RENDER SKILL BADGES
// ==========================================

function renderSkillsWithBadges() {
    const container = document.querySelector("#skillBadgeContainer");
    
    if (!container) {
        console.error("Badge container not found!");
        return;
    }
    
    container.innerHTML = "";
    
    const heading = document.createElement("h3");
    heading.textContent = "🏷️ Skill Badges:";
    heading.style.marginTop = "20px";
    heading.style.marginBottom = "10px";
    container.appendChild(heading);
    
    if (mySkills.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "No skills to show as badges.";
        emptyMsg.style.color = "#999";
        container.appendChild(emptyMsg);
        return;
    }
    
    const badgeWrapper = document.createElement("div");
    badgeWrapper.style.display = "flex";
    badgeWrapper.style.flexWrap = "wrap";
    badgeWrapper.style.gap = "10px";
    badgeWrapper.style.marginTop = "10px";
    
    mySkills.forEach((skill) => {
        const badge = document.createElement("span");
        badge.textContent = skill;
        const randomColor = getRandomColor();
        
        badge.style.backgroundColor = randomColor;
        badge.style.color = "#1e1e2f";
        badge.style.padding = "8px 16px";
        badge.style.borderRadius = "20px";
        badge.style.fontSize = "14px";
        badge.style.fontWeight = "bold";
        badge.style.display = "inline-block";
        badge.style.transition = "all 0.3s ease";
        badge.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
        badge.style.cursor = "pointer";
        
        badge.addEventListener("mouseenter", function() {
            this.style.transform = "scale(1.15) rotate(-2deg)";
        });
        badge.addEventListener("mouseleave", function() {
            this.style.transform = "scale(1) rotate(0deg)";
        });
        
        badgeWrapper.appendChild(badge);
    });
    
    container.appendChild(badgeWrapper);
}

// ==========================================
// RENDER PROJECTS
// ==========================================

function createProjectCard(project) {
    const projectCard = document.createElement("div");
    projectCard.style.backgroundColor = "rgba(255,255,255,0.05)";
    projectCard.style.padding = "12px";
    projectCard.style.marginBottom = "8px";
    projectCard.style.borderRadius = "8px";
    projectCard.style.borderLeft = "4px solid #b3b3ff";
    
    const nameEl = document.createElement("strong");
    nameEl.textContent = project.name;
    projectCard.appendChild(nameEl);
    
    const statusEl = document.createElement("span");
    statusEl.textContent = ` (${project.status})`;
    if (project.status === "Completed") {
        statusEl.style.color = "#4CAF50";
    } else if (project.status === "In Progress") {
        statusEl.style.color = "#FFB74D";
    } else {
        statusEl.style.color = "#90A4AE";
    }
    statusEl.style.fontWeight = "bold";
    projectCard.appendChild(statusEl);
    
    const yearEl = document.createElement("span");
    yearEl.textContent = ` - ${project.year}`;
    yearEl.style.opacity = "0.7";
    projectCard.appendChild(yearEl);
    
    return projectCard;
}

function renderProjects() {
    const container = document.querySelector("#skillBadgeContainer");
    
    if (!container) {
        console.error("Container not found!");
        return;
    }
    
    // Remove old project wrapper if it exists
    const oldWrapper = document.querySelector("#projectWrapper");
    if (oldWrapper) {
        oldWrapper.remove();
    }
    
    const projectWrapper = document.createElement("div");
    projectWrapper.id = "projectWrapper";
    projectWrapper.style.marginTop = "20px";
    
    // All Projects
    const allSection = document.createElement("div");
    allSection.style.marginBottom = "25px";
    allSection.style.padding = "15px";
    allSection.style.borderRadius = "10px";
    allSection.style.border = "1px solid rgba(255,255,255,0.1)";
    
    const allHeading = document.createElement("h3");
    allHeading.textContent = "📂 All Projects:";
    allSection.appendChild(allHeading);
    
    projects.forEach(project => {
        allSection.appendChild(createProjectCard(project));
    });
    projectWrapper.appendChild(allSection);
    
    // Completed Projects
    const completedProjects = projects.filter(project => project.status === "Completed");
    if (completedProjects.length > 0) {
        const completedSection = document.createElement("div");
        completedSection.style.padding = "15px";
        completedSection.style.borderRadius = "10px";
        completedSection.style.border = "2px solid #4CAF50";
        completedSection.style.backgroundColor = "rgba(76, 175, 80, 0.1)";
        
        const completedHeading = document.createElement("h3");
        completedHeading.textContent = "✅ Completed Projects:";
        completedHeading.style.color = "#4CAF50";
        completedSection.appendChild(completedHeading);
        
        completedProjects.forEach(project => {
            completedSection.appendChild(createProjectCard(project));
        });
        projectWrapper.appendChild(completedSection);
    }
    
    container.appendChild(projectWrapper);
}

// ==========================================
// ADD SKILL FUNCTIONALITY
// ==========================================

function setupAddSkill() {
    const addSkillBtn = document.querySelector("#addSkillBtn");
    const skillInput = document.querySelector("#newSkillInput");
    
    if (!addSkillBtn || !skillInput) {
        console.error("Add skill elements not found!");
        return;
    }
    
    addSkillBtn.addEventListener("click", function() {
        const newSkill = skillInput.value.trim();
        if (newSkill === "") {
            alert("Please enter a skill!");
            return;
        }
        mySkills.push(newSkill);
        skillInput.value = "";
        renderSkillsWithDeleteButtons();
        renderSkillsWithBadges();
        renderProjects();
        updateSkillCount();
        
        const heading = document.querySelector("#mainHeading");
        if (heading) {
            heading.textContent = `✨ Added "${newSkill}"! ✨`;
            setTimeout(() => {
                heading.textContent = "👋 Hello, I'm [Your Name]";
            }, 2000);
        }
    });
    
    skillInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addSkillBtn.click();
        }
    });
}

// ==========================================
// DARK MODE
// ==========================================

function setupDarkMode() {
    const darkModeBtn = document.querySelector("#darkModeToggle");
    if (!darkModeBtn) return;
    
    let isDarkMode = true;
    
    darkModeBtn.addEventListener("click", function() {
        isDarkMode = !isDarkMode;
        const body = document.querySelector("body");
        const card = document.querySelector(".card");
        
        if (isDarkMode) {
            body.style.background = "linear-gradient(135deg, #1e1e2f, #2a0845)";
            body.style.color = "white";
            darkModeBtn.textContent = "🌙 Toggle Dark Mode";
            if (card) card.style.color = "white";
            document.querySelectorAll("h1, h2, h3, p, li").forEach(el => {
                el.style.color = "white";
            });
        } else {
            body.style.background = "linear-gradient(135deg, #f5f7fa, #c3cfe2)";
            body.style.color = "#1e1e2f";
            darkModeBtn.textContent = "☀️ Toggle Light Mode";
            if (card) card.style.color = "#1e1e2f";
            document.querySelectorAll("h1, h2, h3, p, li").forEach(el => {
                el.style.color = "#1e1e2f";
            });
        }
    });
}

// ==========================================
// COUNTER BUTTON
// ==========================================

function setupCounterButton() {
    const counterButton = document.querySelector("#counterButton");
    if (!counterButton) return;
    
    let clickCount = 0;
    
    counterButton.addEventListener("click", function() {
        clickCount++;
        counterButton.textContent = `Clicked ${clickCount} times! 🎯`;
        
        const heading = document.querySelector("#mainHeading");
        if (heading) {
            if (clickCount === 1) {
                heading.textContent = "First click! Nice! 👏";
            } else if (clickCount === 5) {
                heading.textContent = "5 clicks! You're on fire! 🔥";
            } else if (clickCount === 10) {
                heading.textContent = "10 clicks! WOW! 🏆";
                clickCount = 0;
                setTimeout(() => {
                    counterButton.textContent = "Click Me!";
                    heading.textContent = "👋 Hello, I'm [Your Name]";
                }, 1000);
            }
        }
    });
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================

function init() {
    console.log("🚀 Initializing app...");
    
    // Check if main heading exists
    const mainHeading = document.querySelector("#mainHeading");
    if (mainHeading) {
        console.log("✅ Main heading found!");
    } else {
        console.error("❌ Main heading NOT found! Check your HTML.");
    }
    
    // Render everything
    renderSkillsWithDeleteButtons();
    renderSkillsWithBadges();
    renderProjects();
    updateSkillCount();
    setupAddSkill();
    setupDarkMode();
    setupCounterButton();
    
    console.log("✅ App initialized with", mySkills.length, "skills");
}

// Run when page loads
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
