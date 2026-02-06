import { projects } from "/src/data/projects.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Projects modal loaded");

  // Modal elements
  const modal = document.getElementById("project-modal");
  const modalContainer = modal?.firstElementChild;

  const title = document.getElementById("modal-title");
  const description = document.getElementById("modal-description");
  const problem = document.getElementById("modal-problem");

  const image = document.getElementById("modal-image");
  const indicators = document.getElementById("image-indicators");

  const achievements = document.getElementById("modal-achievements");
  const technologies = document.getElementById("modal-technologies");

  const closeBtn = document.getElementById("close-modal");
  const nextBtn = document.getElementById("next-image");
  const prevBtn = document.getElementById("prev-image");

  let currentProject = null;
  let imageIndex = 0;

  /* =========================
     OPEN MODAL
  ========================= */
  document.querySelectorAll("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", e => {
      const card = e.target.closest("[data-project-id]");
      if (!card) return;

      const id = card.dataset.projectId;
      currentProject = projects.find(p => p.id === id);
      if (!currentProject) return;

      imageIndex = 0;
      render();

      modal.classList.remove("hidden");
      document.body.style.overflow = "hidden";

      // Reset scroll inside modal
      modal.querySelector(".overflow-y-auto")?.scrollTo(0, 0);
    });
  });

  /* =========================
     CLOSE MODAL
  ========================= */
  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
    currentProject = null;
  }

  closeBtn?.addEventListener("click", closeModal);

  // Click outside modal
  modal?.addEventListener("click", e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  /* =========================
     IMAGE NAVIGATION
  ========================= */
  nextBtn?.addEventListener("click", () => {
    if (!currentProject) return;
    imageIndex = (imageIndex + 1) % currentProject.images.length;
    renderImage();
  });

  prevBtn?.addEventListener("click", () => {
    if (!currentProject) return;
    imageIndex =
      (imageIndex - 1 + currentProject.images.length) %
      currentProject.images.length;
    renderImage();
  });

  /* =========================
     RENDER
  ========================= */
  function render() {
    renderText();
    renderImage();
    renderAchievements();
    renderTechnologies();
  }

  function renderText() {
    title.textContent = currentProject.title;
    description.textContent = currentProject.description;
    problem.textContent = currentProject.problem || "";
  }

  function renderImage() {
    image.src = currentProject.images[imageIndex];
    image.alt = currentProject.title;

    // Indicators
    indicators.innerHTML = "";
    currentProject.images.forEach((_, i) => {
      const dot = document.createElement("button");

      dot.className =
        "h-2 rounded-full transition-all duration-300 " +
        (i === imageIndex
          ? "w-6 bg-white"
          : "w-2 bg-white/50 hover:bg-white/80");

      dot.addEventListener("click", () => {
        imageIndex = i;
        renderImage();
      });

      indicators.appendChild(dot);
    });
  }

  function renderAchievements() {
    achievements.innerHTML = "";
    (currentProject.achievements || []).forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      achievements.appendChild(li);
    });
  }

  function renderTechnologies() {
    technologies.innerHTML = "";
    (currentProject.technologies || []).forEach(tech => {
      const badge = document.createElement("span");
      badge.className =
        "px-3 py-1.5 rounded-full text-sm font-medium " +
        "border border-gray-300 dark:border-neutral-700 " +
        "bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm " +
        "text-gray-800 dark:text-gray-200 " +
        "hover:bg-gray-100 dark:hover:bg-neutral-700 " +
        "transition-colors";
      badge.textContent = tech;
      technologies.appendChild(badge);
    });
  }
});



