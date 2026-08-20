# DevStyle

> **A visual CSS editor for developers.**
> Select an element on a webpage, change its CSS in real time, see the result instantly, and copy the styles.

![DevStyle Banner](https://placehold.co/1200x400/18181b/ffffff?text=DevStyle+%E2%80%94+Visual+CSS+Editor)

---

## 🚀 About

**DevStyle** is a Chrome extension designed to make experimenting with CSS faster and more intuitive.

Instead of repeatedly opening DevTools and manually changing CSS values, DevStyle lets you select an element directly on a webpage and modify its styles through a simple visual editor.

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

## ✨ Current Features — V1.1

### 🔍 Element Inspector

* Visual element selector
* Hover highlighting
* Select elements directly from the webpage
* Display selected element information

### 📐 Size & Position

* Change width
* Change height
* Change left position
* Change top position

### 🔤 Typography

* Change font family
* Change font size
* Change font weight / boldness
* Change font color
* Change line height
* Change letter spacing

### 🎨 Background

* Change background color

### 🧱 Border

* Change border width
* Change border radius
* Change border color
* Change border style
* Supports solid, dashed, dotted and double borders

### 📦 Spacing

* Change padding
* Change margin

### ⚡ Developer Workflow

* Live CSS changes
* No page refresh required
* Copy modified inline CSS
* Simple visual editing interface

---

# 🌐 Website & Localhost Access

The current development version can be tested on **localhost**, local HTML files, and live websites.

## 🏠 Local Development

You can test DevStyle on development servers such as:

```text
http://localhost:3000
http://localhost:5173
http://127.0.0.1:3000
```

You can also test local HTML files:

```text
file:///C:/your-project/index.html
```

If you are testing local HTML files, enable:

**Allow access to file URLs**

from the DevStyle extension settings.

---

## 🌍 Live Websites

If DevStyle doesn't work on a live website, check the extension's site-access permission.

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

**Version: V1.1.0**

**Status: 🚧 Active Development**

DevStyle is currently an early-stage development project.

The current version focuses on basic visual CSS editing and experimentation.

### Current limitations

* Limited CSS property support
* No Flexbox editor
* No CSS Grid editor
* No visual box-model editor
* No undo/redo
* No CSS history
* No saved presets
* Position editing may behave differently depending on the element's existing layout
* Advanced websites and complex DOM structures may require additional compatibility work

These limitations will be addressed in future releases.

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
Edit CSS
     ↓
Preview Changes
     ↓
Copy CSS
```

---

# 🛠️ Tech Stack

DevStyle V1.1 is built with:

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

| File            | Purpose                                |
| --------------- | -------------------------------------- |
| `manifest.json` | Chrome extension configuration         |
| `popup.html`    | Extension popup structure              |
| `popup.css`     | Popup styling                          |
| `popup.js`      | Popup interaction                      |
| `content.js`    | Element selection and CSS manipulation |
| `content.css`   | Inspector and editor UI                |

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
 Modify Element Styles
       │
       ▼
 Live Preview
```

For example, DevStyle reads the current CSS:

```javascript
const styles = getComputedStyle(element);

console.log(styles.fontSize);
console.log(styles.fontFamily);
console.log(styles.fontWeight);
console.log(styles.color);
console.log(styles.backgroundColor);
console.log(styles.borderRadius);
```

Then changes can be applied immediately:

```javascript
element.style.fontSize = "32px";
element.style.fontWeight = "700";
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

You can then experiment with the available CSS properties.

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

After making sure everything works, commit the changes:

```bash
git add .
git commit -m "feat: add typography, background, border, and spacing controls"
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
* [x] Improved editor UI

---

## 🔜 V1.2 — Box Model

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

Finding the right CSS value often involves repeatedly changing values and checking the result.

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

DevStyle aims to make that process visual.

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
| Current Version  | `1.1.0`               |
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
