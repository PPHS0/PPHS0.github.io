document.getElementById("exploreBtn").addEventListener("click", function() {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

const projects = [
    { title: "Science Fair 2024", description: "Innovative experiments by our talented students." },
    { title: "Art Showcase", description: "Creative works displayed by the art department." },
    { title: "Tech Expo", description: "Cutting-edge projects from our tech classes." },
];

const projectList = document.getElementById("projectList");
projects.forEach(project => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.innerHTML = `<h3>${project.title}</h3><p>${project.description}</p>`;
    projectList.appendChild(projectDiv);
});
