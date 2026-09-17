# Your Name — Portfolio

A plain HTML/CSS/JS portfolio site with interactive 3D model viewers, built to run for free on **GitHub Pages**. No build step, no framework — open `index.html` and it works.

The 3D viewer is Google's [`<model-viewer>`](https://modelviewer.dev/) web component. It handles `.glb`/`.gltf` files, lets visitors orbit/zoom with the mouse or touch, and supports "View in AR" on phones for free.

---

## 1. Try it locally

Because the page loads model files, some browsers block it if you just double-click `index.html` (CORS). Easiest fix — serve the folder locally:

```bash
# from inside the portfolio-site folder
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. Right now it's pre-filled with three public sample models so you can see the layout working immediately.

---

## 2. Add your own projects

Everything lives in **`js/projects-data.js`**. Each project is one object:

```js
{
  title: "My Project",
  tagline: "One line description",
  description: "A couple of sentences for the detail view.",
  model: "assets/models/my-project.glb",
  specs: {
    Material: "Aluminum",
    Tools: "Fusion 360, Blender",
    Format: "glTF Binary (.glb)",
    Year: "2026"
  },
  links: {
    repo: "https://github.com/you/repo",
    demo: ""
  }
}
```

Add, remove, or reorder objects in the `PROJECTS` array — the page renders them automatically, numbered in order.

Update the placeholder text in `index.html` too: the hero headline, the `About` paragraph, and the email/GitHub links in the footer.

---

## 3. Getting your 3D models web-ready

`<model-viewer>` wants **`.glb`** (a single packaged glTF file). If your models are in another format:

| You have | Do this |
|---|---|
| Blender project | `File → Export → glTF 2.0 (.glb)`. Choose "glTF Binary (.glb)" format. |
| `.obj` / `.fbx` / `.stl` | Import into [Blender](https://www.blender.org/) (free) and export as `.glb`, or use an online converter like [products.aspose.app/3d/conversion](https://products.aspose.app/3d/conversion) or [anyconv.com](https://anyconv.com/). |
| CAD file (STEP/IGES) | Export to `.obj` or `.fbx` from your CAD tool first, then convert to `.glb` as above. |

**Keep file sizes small** so the page loads fast:
- Aim for under ~10 MB per model, ideally 1–3 MB.
- Compress with [gltf-transform](https://gltf-transform.dev/): `npx @gltf-transform/cli optimize input.glb output.glb`
- Keep textures at 1K–2K resolution — 4K+ textures rarely help on screen and slow the page down a lot.
- You can check/preview any file first at [gltf.report](https://gltf.report/) or [modelviewer.dev/editor](https://modelviewer.dev/editor/).

Put your finished `.glb` files in `assets/models/` and point `model:` at that path, e.g. `"assets/models/my-project.glb"`.

---

## 4. Deploy to GitHub Pages (free)

1. Create a new repository on GitHub (public repos get free Pages hosting).
2. Push this folder's contents to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
5. Save. GitHub gives you a URL after a minute, usually:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO/
   ```

That's it — it's free, and it redeploys automatically every time you push to `main`.

**Optional:** if you want `yourname.com` instead of the github.io URL, add a `CNAME` file with your domain and point your domain's DNS at GitHub Pages (see [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

---

## File structure

```
portfolio-site/
├── index.html              ← page structure, hero text, about text
├── css/style.css            ← all styling
├── js/
│   ├── projects-data.js     ← EDIT THIS to add your projects
│   └── main.js               ← renders project rows + the detail popup
├── assets/
│   ├── models/               ← put your .glb files here
│   └── images/               ← optional poster/thumbnail images
└── README.md
```
