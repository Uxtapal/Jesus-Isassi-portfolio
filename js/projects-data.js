/**
 * EDIT THIS FILE to add your own projects.
 *
 * Each project needs:
 *  - title, tagline, description: your text
 *  - model: path or URL to a .glb file (put your own in assets/models/)
 *  - poster: optional preview image shown while the model loads (assets/images/)
 *  - specs: any key/value pairs you want listed (material, tools, year, format...)
 *  - links: optional repo / demo URLs
 *  - colors: optional array of hex codes for the color picker in the detail
 *            view, e.g. ["#c9773f", "#1a1a1a"]. If omitted, a default
 *            palette is used. Works best on models with simple/untextured
 *            materials — heavily textured models (like a photo-real helmet)
 *            will look muddy when tinted.
 *
 * The three entries below use public sample models so you can see the
 * layout working immediately. Replace them with your own work.
 */

const PROJECTS = [
  {
    title: "Modular fiber array tool",  
    tagline: "Tool for the fiber array in the FTTX project [FTTX-2.0]",
    description:
      "A tool for the fiber array in the FTTX project [FTTX-2.0] — the first samples of this tool where 3d printed.",
    model: "assets/models/espaciador.glb",
    specs: {
      Material: "Painted composite",
      Tools: "Solidworks - 3D printer",
      Project: "FTTX-2.0",
      Year: "2026"
    },
    links: {
      repo: "https://github.com/your-username/your-repo",
      demo: ""
    }
  },
  {
    title: "Corset Frame",
    tagline: "Textile + rigid structure study",
    description:
      "Another placeholder entry, useful for showing how the layout reads with a very different silhouette and material.",
    model: "https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/Corset/glTF-Binary/Corset.glb",
    specs: {
      Material: "Fabric, boning",
      Tools: "Photogrammetry",
      Format: "glTF Binary (.glb)",
      Year: "2025"
    },
    links: {
      repo: "",
      demo: ""
    }
  },
  {
    title: "Boom Box",
    tagline: "Small consumer object, product design",
    description:
      "A compact object works well for testing how small details read up close once camera controls are on.",
    model: "https://modelviewer.dev/shared-assets/models/glTF-Sample-Models/2.0/BoomBox/glTF-Binary/BoomBox.glb",
    specs: {
      Material: "ABS, aluminum",
      Tools: "Fusion 360",
      Format: "glTF Binary (.glb)",
      Year: "2025"
    },
    links: {
      repo: "",
      demo: ""
    }
  }
];
