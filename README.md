# DevStyle

> **A visual CSS editor for developers.**
> Select an element on a webpage, change its CSS in real time, see the result instantly, and copy the styles.

![DevStyle Banner](https://placehold.co/1200x400/18181b/ffffff?text=DevStyle+%E2%80%94+Visual+CSS+Editor)

---

## 🚀 About

**DevStyle** is a Chrome extension designed to make experimenting with CSS faster and more intuitive.

Instead of repeatedly opening DevTools and manually changing CSS values, DevStyle lets you visually select an element and modify its CSS directly on the webpage.

### The idea

```text
Select Element
      ↓
Edit CSS
      ↓
See Changes Instantly
      ↓
Copy CSS
```

---

# ✨ Current Features — V1.2

## 🔍 Visual Element Inspector

* Select elements directly from a webpage
* Hover highlighting
* Inspect regular HTML elements
* Select `body` and other root-level elements
* Display the selected element's tag, ID and classes

## 📐 Layout

* Width
* Height
* Position
* Top
* Right
* Bottom
* Left
* Z-index

## 🔤 Typography

* Font family
* Font size
* Font weight
* Font color
* Line height
* Letter spacing
* Text alignment

## 🎨 Appearance

* Background color
* Opacity

## 🧱 Border

* Border width
* Border radius
* Border color
* Border style
* Solid
* Dashed
* Dotted
* Double

## 📦 Spacing

* Margin
* Padding
* Gap

## ⚡ Developer Workflow

* Live CSS changes
* No page refresh required
* Color picker
* CSS property search
* Collapsible categories
* Cleaner inspector interface
* Copy modified inline CSS

---

# 🆕 What's New in V1.2?

V1.2 focuses heavily on **UX and extensibility**.

### Categorized CSS properties

Instead of displaying every property at once, CSS controls are organized into categories:

```text
📐 Layout
🔤 Typography
🎨 Appearance
🧱 Border
📦 Spacing
```

Only one category is expanded at a time, keeping the inspector compact.

### CSS Property Search

Use the search field to quickly find a property:

```text
Search CSS property...
```

For example:

```text
border
```

will quickly show the available border controls.

### Root Element Editing

DevStyle can now select and modify root-level elements such as:

```html
<body>
<html>
```

This makes it possible to experiment with things such as the **overall webpage background**.

---

# 🌐 Website & Localhost Access

The current development version can be tested on localhost, local HTML files, and live websites.

## 🏠 Local Development

DevStyle can be tested on development servers such as:

```text
http://localhost:3000
http://localhost:5173
http://127.0.0.1:3000
```

You can also test local HTML files:

```text
file:///C:/your-project/index.html
```

If you're testing local HTML files, enable:

**Allow access to file URLs**

from the DevStyle extension settings.

---

## 🌍 Live Websites

If DevStyle doesn't work on a live website:

1. Open:

```text
chrome://extensions
```

2. Find **DevStyle**.

3. Click **Details**.

4. Find:

**Site access**

5. Select:

**On all sites**

This allows DevStyle to run on websites across the internet.

> **Note:** Only enable permissions you are comfortable granting to the extension.

---

# ⚠️ Current Version

**Version: `1.2.0`**

**Status: 🚧 Active Development**

DevStyle is currently an early-stage development project.

The current version focuses on visual CSS experimentation and a scalable inspector interface.

### Known limitations

* CSS property support is still limited
* No Flexbox editor yet
* No CSS Grid editor yet
* No visual box-model editor yet
* No undo/redo
* No CSS history
* No saved presets
* Position behavior can vary depending on the element's existing layout
* Complex websites may require additional compatibility work
* Advanced iframe and Shadow DOM support is not yet implemented

---

# 🖥️ Demo

> Demo GIF/video coming soon.

### Basic workflow

```text
Open Website
     ↓
Click DevStyle
     ↓
Inspect Element
     ↓
Hover over Element
     ↓
Select Element
     ↓
Choose Category
     ↓
Change CSS
     ↓
Preview Changes
     ↓
Copy CSS
```

---

# 🛠️ Tech Stack

DevStyle V1.2 is built with:

* **JavaScript**
* **HTML**
* **CSS**
* **Chrome Extension APIs**
* **Manifest V3**
* **DOM API**
* **CSSOM**
* **`getComputedStyle()`**

No backend or database is required for the current version.

---

# 📁 Project Structure

```text
devstyle/
│
├── manifest.json
│
├── popup.html
├── popup.css
├── popup.js
│
├── content.js
└── content.css
```

### File responsibilities

| File            | Purpose                                          |
| --------------- | ------------------------------------------------ |
| `manifest.json` | Chrome extension configuration                   |
| `popup.html`    | Extension popup structure                        |
| `popup.css`     | Popup styling                                    |
| `popup.js`      | Popup interaction                                |
| `content.js`    | Element selection, CSS controls and live editing |
| `content.css`   | Inspector and editor UI                          |

---

# ⚙️ How It Works

DevStyle uses a Chrome content script to interact with the webpage DOM.

```text
Chrome Extension
       │
       ▼
   Popup UI
       │
       │ Message
       ▼
 Content Script
       │
       ▼
 Select DOM Element
       │
       ▼
 getComputedStyle()
       │
       ▼
 Read Current CSS
       │
       ▼
 CSS Property Editor
       │
       ▼
 Modify Element Styles
       │
       ▼
 Live Preview
```

The inspector uses `getComputedStyle()` to determine the currently rendered styles.

Example:

```javascript
const styles = getComputedStyle(element);

console.log(styles.fontSize);
console.log(styles.fontFamily);
console.log(styles.color);
console.log(styles.backgroundColor);
console.log(styles.borderRadius);
```

DevStyle then applies changes directly to the selected element:

```javascript
element.style.fontSize = "32px";
element.style.color = "#ff0000";
element.style.borderRadius = "16px";
```

---

# 🧪 Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/devstyle.git
```

Enter the project:

```bash
cd devstyle
```

---

## 2. Open Chrome Extensions

Go to:

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

Then select the cloned `devstyle` folder.

Make sure `manifest.json` is directly inside the selected folder.

---

## 5. Start testing

Open a webpage.

Click the **DevStyle** extension.

Select:

**Inspect Element**

Hover over an element and click it.

The DevStyle editor will appear.

---

# 🔧 Development Workflow

When making changes:

```text
Edit Code
    ↓
Save Files
    ↓
chrome://extensions
    ↓
Reload DevStyle
    ↓
Refresh Webpage
    ↓
Test
```

After testing:

```bash
git add .
git commit -m "feat: improve inspector UX and add categorized CSS controls"
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

---

## ✅ V1.2 — Inspector UX

* [x] Categorized properties
* [x] Collapsible categories
* [x] Property search
* [x] Root element selection
* [x] Body background editing
* [x] Layout category
* [x] Typography category
* [x] Appearance category
* [x] Border category
* [x] Spacing category
* [x] Data-driven property configuration

---

## 🔜 V1.3 — Box Model

* [ ] Individual top/right/bottom/left padding
* [ ] Individual top/right/bottom/left margin
* [ ] Box model visualizer
* [ ] Individual border controls
* [ ] `box-sizing`
* [ ] Min/max width
* [ ] Min/max height

---

## 🔜 V2 — Layout Editor

* [ ] Flexbox editor
* [ ] CSS Grid editor
* [ ] Gap controls
* [ ] Alignment controls
* [ ] Drag-to-resize
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
* [ ] Keyboard shortcuts
* [ ] Responsive viewport preview

---

## 🔮 Future Ideas

Potential future features:

* 🤖 AI-powered CSS suggestions
* 🎨 Design-system presets
* 📱 Responsive design testing
* 🧩 Component extraction
* ☁️ Cloud-saved projects
* 🔄 Cross-device synchronization
* 👥 Team collaboration

---

# 🤝 Contributing

Contributions, ideas, bug reports, and feature requests are welcome.

### Reporting a bug

1. Open an **Issue**.
2. Describe the problem.
3. Include the browser/environment if relevant.
4. Include screenshots or console errors when possible.
5. Explain how to reproduce the issue.

### Contributing code

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

Finding the right CSS value often means repeatedly changing values and checking the result.

For example:

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

DevStyle aims to make this process visual.

> **Don't guess the CSS value. See it.**

---

# ⭐ Support the Project

If you find DevStyle useful, consider giving the repository a ⭐.

It helps the project reach more developers and motivates continued development.

Found a bug or have an idea?

Open an issue and help improve DevStyle.

---

# 📊 Project Status

| Item             | Status                |
| ---------------- | --------------------- |
| Current Version  | `1.2.0`               |
| Status           | 🚧 Active Development |
| Chrome Extension | Manifest V3           |
| Backend          | Not required          |
| Database         | Not required          |
| License          | Coming soon           |

---

# 📄 License

License information will be added as the project develops.

---

## DevStyle

**Select → Edit → Preview → Copy CSS**

Built for developers who don't want to guess CSS values.
