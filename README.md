# DevStyle

> **A visual CSS editor for developers.**
>
> Select an element on a webpage, modify its CSS in real time, preview the result instantly, and copy the styles.

![DevStyle Banner](https://placehold.co/1200x400/18181b/ffffff?text=DevStyle+%E2%80%94+Visual+CSS+Editor)

---

## 🚀 About

**DevStyle** is a Chrome extension designed to make CSS experimentation faster and more visual.

Instead of repeatedly opening DevTools, searching for styles, changing values, and switching between files, DevStyle lets you:

```text
Select
  ↓
Edit
  ↓
Preview
  ↓
Copy CSS
```

The goal is simple:

> **Don't guess the CSS value. See it.**

---

# ✨ Current Features — V1.4

## 🔍 Visual Element Inspector

* Select elements directly from a webpage
* Hover highlighting
* Inspect regular HTML elements
* Select `body` and root-level elements
* Display selected element information
* Show tag, ID and class information

---

## 📐 Layout

Currently supported:

* Width
* Height
* Position
* Top
* Right
* Bottom
* Left
* Z-index

---

## 🔤 Typography

Currently supported:

* Font family
* Font size
* Font weight
* Font color
* Line height
* Letter spacing
* Text alignment

---

## 🎨 Appearance

* Background color
* Opacity

---

## 🧱 Border

* Border width
* Border radius
* Border color
* Border style
* Solid
* Dashed
* Dotted
* Double

---

## 📦 Spacing

* Margin
* Padding
* Gap

---

# ⚡ Developer Experience

### Live CSS editing

Changes are applied directly to the selected element without refreshing the page.

### 🎨 Color picker

Use a visual color picker or enter a HEX value manually.

### 🔎 CSS property search

Search for a property instead of manually opening every category.

Example:

```text
border
```

or:

```text
font
```

### 📂 Collapsible categories

CSS properties are grouped into:

```text
📐 Layout
🔤 Typography
🎨 Appearance
🧱 Border
📦 Spacing
```

Categories can be opened and collapsed independently.

### 🖱️ Draggable editor

The DevStyle panel can be moved around the webpage so it doesn't cover the element you're working on.

### ↔️ Resizable editor

Resize the panel to give yourself more or less workspace.

### 📱 Responsive inspector UI

The editor adapts to its own size:

* Large panel → full controls
* Medium panel → compact controls
* Small panel → reduced UI
* Sticky categories automatically become compact
* Sticky category behavior is disabled at very small widths to preserve usable space

### ➕ Compact mode

The panel can be minimized while keeping the category navigation available.

### 📋 Copy CSS

Copy the modified inline CSS directly to the clipboard.

---

# ⌨️ Keyboard Shortcut

DevStyle can be launched without opening the extension popup.

### Windows / Linux

```text
Ctrl + Shift + E
```

### macOS

```text
Command + Shift + E
```

Workflow:

```text
Ctrl + Shift + E
       ↓
Inspector starts
       ↓
Hover over an element
       ↓
Click the element
       ↓
Edit CSS
```

You can change the shortcut from:

```text
chrome://extensions/shortcuts
```

---

# 🌐 Using DevStyle on Live Websites

The development version can be used on:

* Localhost projects
* Local HTML files
* Live websites

For example:

```text
http://localhost:3000
http://localhost:5173
http://127.0.0.1:3000
```

and live websites such as:

```text
https://example.com
```

## Enable website access

Open:

```text
chrome://extensions
```

Then:

```text
DevStyle
   ↓
Details
   ↓
Site access
   ↓
On all sites
```

After changing the permission:

1. Reload DevStyle.
2. Refresh the webpage.
3. Press `Ctrl + Shift + E`.
4. Select an element.

### Local HTML files

For files such as:

```text
file:///C:/Projects/test/index.html
```

enable:

**Allow access to file URLs**

from the DevStyle extension settings.

---

# ⚠️ Current Limitations

DevStyle is still under active development.

Current limitations include:

* Limited CSS property coverage
* No dedicated Flexbox editor yet
* No dedicated CSS Grid editor yet
* No visual box-model editor yet
* No undo/redo
* No CSS history
* No saved presets
* No Tailwind CSS export
* No SCSS export
* Advanced iframe support is still limited
* Shadow DOM support is not yet fully implemented
* Position editing can behave differently depending on an element's layout context
* Some complex websites may require additional compatibility work

---

# 🖥️ Basic Workflow

```text
Open Website
      ↓
Ctrl + Shift + E
      ↓
Hover Over Element
      ↓
Click Element
      ↓
Choose CSS Category
      ↓
Change Property
      ↓
See Live Result
      ↓
Copy CSS
```

---

# 🛠️ Tech Stack

DevStyle currently uses:

* **JavaScript**
* **HTML**
* **CSS**
* **Chrome Extension APIs**
* **Manifest V3**
* **DOM API**
* **CSSOM**
* **`getComputedStyle()`**
* **Chrome Commands API**
* **CSS Container Queries**

No backend or database is required for the current version.

---

# 📁 Project Structure

```text
devstyle/
│
├── manifest.json
├── background.js
│
├── popup.html
├── popup.css
├── popup.js
│
├── content.js
└── content.css
```

### File responsibilities

| File            | Purpose                                            |
| --------------- | -------------------------------------------------- |
| `manifest.json` | Chrome extension configuration and permissions     |
| `background.js` | Handles extension keyboard commands                |
| `popup.html`    | Extension popup structure                          |
| `popup.css`     | Popup styling                                      |
| `popup.js`      | Popup interactions                                 |
| `content.js`    | Element selection, inspector logic and CSS editing |
| `content.css`   | Inspector UI and responsive styling                |

---

# ⚙️ How It Works

DevStyle uses a Chrome content script to communicate with the webpage DOM.

```text
Chrome Extension
       │
       ▼
 Extension Popup
       │
       │ message
       ▼
 Content Script
       │
       ▼
 Element Selection
       │
       ▼
 getComputedStyle()
       │
       ▼
 CSS Inspector
       │
       ▼
 Modify Element
       │
       ▼
 Live Preview
       │
       ▼
 Copy CSS
```

For example:

```javascript
const styles = getComputedStyle(element);

console.log(styles.fontSize);
console.log(styles.fontFamily);
console.log(styles.color);
console.log(styles.backgroundColor);
console.log(styles.borderRadius);
```

Changes can then be applied directly:

```javascript
element.style.fontSize = "32px";
element.style.color = "#ff0000";
element.style.backgroundColor = "#111827";
element.style.borderRadius = "16px";
```

---

# 🧪 Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/devstyle.git
```

Then:

```bash
cd devstyle
```

---

## 2. Open Chrome Extensions

```text
chrome://extensions
```

---

## 3. Enable Developer Mode

Turn on:

**Developer mode**

in the top-right corner.

---

## 4. Load the extension

Click:

**Load unpacked**

Select the `devstyle` folder.

Make sure:

```text
manifest.json
```

is directly inside the selected folder.

---

## 5. Test

Open a webpage and use:

```text
Ctrl + Shift + E
```

or click the DevStyle extension and select:

**Inspect Element**

---

# 🔧 Development Workflow

When changing the extension:

```text
Edit Code
   ↓
Save
   ↓
chrome://extensions
   ↓
Reload DevStyle
   ↓
Refresh Test Page
   ↓
Test
```

After testing:

```bash
git add .
git commit -m "your commit message"
git pull origin main --rebase
git push origin main
```

---

# 🗺️ Roadmap

## ✅ V1.0 — Basic Inspector

* [x] Element selection
* [x] Element highlighting
* [x] Font color
* [x] Font size
* [x] Font weight
* [x] Width
* [x] Height
* [x] Position
* [x] Live preview
* [x] Copy CSS

---

## ✅ V1.1 — Extended CSS Controls

* [x] Font family
* [x] Line height
* [x] Letter spacing
* [x] Background color
* [x] Border width
* [x] Border radius
* [x] Border color
* [x] Border style
* [x] Padding
* [x] Margin
* [x] Gap
* [x] Text alignment

---

## ✅ V1.2 — Inspector UX

* [x] Categorized CSS properties
* [x] Collapsible categories
* [x] Property search
* [x] Body/root element selection
* [x] Body background editing
* [x] Data-driven CSS property configuration
* [x] Improved inspector UI

---

## ✅ V1.3 — Developer Workflow

* [x] Draggable editor panel
* [x] Resizable editor panel
* [x] Compact/minimized mode
* [x] Keyboard shortcut
* [x] Extension popup shortcut information

---

## ✅ V1.4 — Responsive Inspector

* [x] Responsive panel sizing
* [x] Adaptive header
* [x] Adaptive search bar
* [x] Adaptive controls
* [x] Compact sticky category headers
* [x] Disable sticky categories at very small panel sizes
* [x] Responsive CSS using container queries
* [x] More efficient use of resized panel space

---

## 🔜 V1.5 — Box Model

* [ ] Individual top/right/bottom/left padding
* [ ] Individual top/right/bottom/left margin
* [ ] Visual box-model editor
* [ ] Individual border controls
* [ ] `box-sizing`
* [ ] Min/max width
* [ ] Min/max height
* [ ] Content dimensions

---

## 🔜 V2 — Layout Editor

* [ ] Flexbox editor
* [ ] CSS Grid editor
* [ ] Gap controls
* [ ] Alignment controls
* [ ] Drag-to-resize element
* [ ] Visual spacing controls
* [ ] Z-index controls
* [ ] Advanced positioning

---

## 🔜 V3 — Developer Workflow

* [ ] Undo / Redo
* [ ] CSS history
* [ ] CSS selector generation
* [ ] Copy as Tailwind CSS
* [ ] Copy as SCSS
* [ ] Saved style presets
* [ ] Keyboard shortcuts for individual actions
* [ ] Responsive viewport preview

---

# 🔮 Future Ideas

Possible future features:

* 🤖 AI-powered CSS suggestions
* 🎨 Design-system presets
* 📱 Responsive design testing
* 🧩 Component extraction
* ☁️ Cloud-saved projects
* 🔄 Cross-device synchronization
* 👥 Team collaboration
* 🧠 Intelligent CSS recommendations
* 🎯 Visual drag-based property editing

---

# 🤝 Contributing

Contributions, ideas, bug reports, and feature requests are welcome.

## Report a bug

1. Open an Issue.
2. Describe the problem.
3. Explain how to reproduce it.
4. Include browser/environment information.
5. Add screenshots or console errors when useful.

## Contribute code

```text
Fork
  ↓
Create Branch
  ↓
Make Changes
  ↓
Test
  ↓
Commit
  ↓
Pull Request
```

---

# 💡 Why DevStyle?

Finding the right CSS value often means repeatedly experimenting:

```text
420px
  ↓
450px
  ↓
480px
  ↓
460px
  ↓
470px
```

DevStyle turns that process into a visual workflow.

Instead of guessing:

```text
Change CSS
   ↓
Refresh
   ↓
Check
   ↓
Change again
```

you can:

```text
Select
   ↓
Adjust
   ↓
See
   ↓
Copy
```

---

# ⭐ Support the Project

If DevStyle saves you time, consider giving the repository a ⭐.

Bug reports, feature requests, feedback, and contributions are also welcome.

---

# 📊 Project Status

| Item               | Status                |
| ------------------ | --------------------- |
| Current Version    | `1.4.0`               |
| Status             | 🚧 Active Development |
| Extension Platform | Chrome                |
| Manifest           | V3                    |
| Backend            | Not required          |
| Database           | Not required          |
| License            | Coming soon           |

---

# 📄 License

License information will be added as the project develops.

---

## DevStyle

**Select → Edit → Preview → Copy CSS**

Built for developers who don't want to guess CSS values.
