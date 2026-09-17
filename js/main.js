(function () {
  const listEl = document.getElementById("project-list");
  const overlay = document.getElementById("detail-overlay");
  const viewerHost = document.getElementById("detail-viewer");
  const closeBtn = document.getElementById("detail-close");
  const titleEl = document.getElementById("detail-title");
  const indexEl = document.getElementById("detail-index");
  const descEl = document.getElementById("detail-description");
  const specsEl = document.getElementById("detail-specs");
  const linksEl = document.getElementById("detail-links");
  const colorsEl = document.getElementById("detail-colors");

  // Used when a project doesn't define its own `colors` array.
  const DEFAULT_COLORS = ["#c9773f", "#5b9dd9", "#2f9e44", "#e8e4da", "#c03a2bb0", "#a3a3a3"];

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  // model-viewer's material API works in linear color space, so a plain
  // hex-to-0..1 conversion looks washed out. This converts sRGB (what you
  // pick on a color wheel) to linear so swatches match what you'd expect.
  function srgbToLinear(channel255) {
    const c = channel255 / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  function hexToLinearRGBA(hex) {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b), 1];
  }

  // Wires up the color swatches for whichever model is currently open.
  function setupColorPicker(modelViewer, project) {
    const palette = project.colors && project.colors.length ? project.colors : DEFAULT_COLORS;
    let originalFactors = null;

    function applyColor(rgba) {
      if (!modelViewer.model) return;
      modelViewer.model.materials.forEach((mat) => {
        mat.pbrMetallicRoughness.setBaseColorFactor(rgba);
      });
    }

    function renderSwatches() {
      colorsEl.innerHTML = "";

      palette.forEach((hex) => {
        const btn = document.createElement("button");
        btn.className = "color-swatch";
        btn.style.background = hex;
        btn.type = "button";
        btn.setAttribute("aria-label", "Set color " + hex);
        btn.addEventListener("click", () => {
          colorsEl.querySelectorAll(".color-swatch").forEach((s) => s.classList.remove("is-active"));
          btn.classList.add("is-active");
          applyColor(hexToLinearRGBA(hex));
        });
        colorsEl.appendChild(btn);
      });

      const resetBtn = document.createElement("button");
      resetBtn.className = "color-swatch color-swatch-reset";
      resetBtn.type = "button";
      resetBtn.textContent = "↺";
      resetBtn.setAttribute("aria-label", "Reset to original color");
      resetBtn.addEventListener("click", () => {
        if (!originalFactors) return;
        colorsEl.querySelectorAll(".color-swatch").forEach((s) => s.classList.remove("is-active"));
        modelViewer.model.materials.forEach((mat, idx) => {
          mat.pbrMetallicRoughness.setBaseColorFactor(originalFactors[idx]);
        });
      });
      colorsEl.appendChild(resetBtn);
    }

    colorsEl.innerHTML = '<span class="detail-colors-loading">Loading colors…</span>';

    modelViewer.addEventListener(
      "load",
      () => {
        originalFactors = modelViewer.model.materials.map((m) =>
          m.pbrMetallicRoughness.baseColorFactor.slice()
        );
        renderSwatches();
      },
      { once: true }
    );
  }

  function renderRows() {
    PROJECTS.forEach((project, i) => {
      const row = document.createElement("article");
      row.className = "project-row";
      row.tabIndex = 0;
      row.setAttribute("role", "button");
      row.setAttribute("aria-label", "View details for " + project.title);

      row.innerHTML = `
        <div class="project-row-preview">
          <model-viewer
            src="${project.model}"
            alt="${project.title}"
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="12deg"
            disable-zoom
            exposure="0.1"
            interaction-prompt="none"
            loading="lazy">
          </model-viewer>
        </div>
        <div class="project-row-text">
          <span class="project-row-index">${pad(i + 1)}</span>
          <h3>${project.title}</h3>
          <p>${project.tagline}</p>
        </div>
      `;

      row.addEventListener("click", () => openDetail(i));
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetail(i);
        }
      });

      listEl.appendChild(row);
    });
  }

  function openDetail(i) {
    const project = PROJECTS[i];

    viewerHost.innerHTML = `
      <model-viewer
        src="${project.model}"
        alt="${project.title}"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        exposure="0.4"
        ar
        ar-modes="webxr scene-viewer quick-look">
      </model-viewer>
    `;

    setupColorPicker(viewerHost.querySelector("model-viewer"), project);

    indexEl.textContent = pad(i + 1);
    titleEl.textContent = project.title;
    descEl.textContent = project.description;

    specsEl.innerHTML = "";
    Object.entries(project.specs || {}).forEach(([key, value]) => {
      if (!value) return;
      const dt = document.createElement("dt");
      dt.textContent = key;
      const dd = document.createElement("dd");
      dd.textContent = value;
      specsEl.appendChild(dt);
      specsEl.appendChild(dd);
    });

    linksEl.innerHTML = "";
    if (project.links) {
      if (project.links.repo) {
        linksEl.innerHTML += `<a href="${project.links.repo}" target="_blank" rel="noopener">View repo →</a>`;
      }
      if (project.links.demo) {
        linksEl.innerHTML += `<a href="${project.links.demo}" target="_blank" rel="noopener">Live demo →</a>`;
      }
    }

    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDetail() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    viewerHost.innerHTML = "";
  }

  closeBtn.addEventListener("click", closeDetail);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeDetail();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDetail();
  });

  renderRows();
})();
