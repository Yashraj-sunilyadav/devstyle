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

## ✨ Current Features — V1

* 🔍 Visual element selector
* 🎨 Change font color
* 🔠 Change font size
* 📐 Change element width
* 📏 Change element height
* 📍 Change element position
* ⚡ Live CSS changes
* 📋 Copy modified CSS
* ❌ Close the inspector when finished

---

## 🌐 Website & Localhost Access

The current development version can be tested on **localhost**, local HTML files, and live websites.

### 🏠 Local Development

You can test DevStyle on:

```text
http://localhost:3000
http://localhost:5173
http://127.0.0.1:3000
```

You can also test it with local HTML files:

```text
file:///C:/your-project/index.html
```

If you are testing local HTML files, enable:

**Allow access to file URLs**

from the DevStyle extension settings.

### 🌍 Live Websites

If DevStyle doesn't work on a live website, check its site-access permission.

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

This allows the extension to run on websites across the internet.

> **Note:** Only enable the permissions you are comfortable granting to the extension.

---

## ⚠️ Current Version

**Version: V1 — Early Development Release**

The current version is primarily intended for **development, testing, and experimentation**.

Current capabilities are intentionally limited to basic CSS editing.

### Currently supported

* Localhost development websites
* Local HTML files
* Live websites after enabling the required site-access permission
* Basic CSS property editing

### Known limitations

* Limited CSS properties
* No Flexbox editor yet
* No CSS Grid editor yet
* No visual margin/padding editor
* No undo/redo
* No CSS history
* Position editing may behave differently depending on the element's existing layout
* Advanced websites and complex DOM structures may require additional compatibility work

These limitations will be addressed in future versions.

---

## 🖥️ Demo

> Demo GIF/video coming soon.

Basic workflow:

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
Change CSS
     ↓
Preview Changes
     ↓
Copy CSS
```

---

## 🛠️ Tech Stack

DevStyle V1 is intentionally built using a lightweight stack.

* **HTML**
* **CSS**
* **JavaScript**
* **Chrome Extension APIs**
* **Manifest V3**
* **DOM API**
* **CSSOM**
* **`getComputedStyle()`**

No backend or database is required for the current version.

---

## 📁 Project Structure

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

## ⚙️ How It Works

The extension uses a **content script** to interact directly with the webpage DOM.

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
 Modify Element
       │
       ▼
 Live Preview
```

For example, DevStyle can read the current style:

```javascript
const styles = getComputedStyle(element);

console.log(styles.fontSize);
console.log(styles.color);
```

and modify it instantly:

```javascript
element.style.fontSize = "40px";
element.style.color = "#ff0000";
```

---

# 🧪 Run Locally

## 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/devstyle.git
```

Then enter the project:

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

Then select the cloned:

```text
devstyle
```

folder.

Make sure `manifest.json` is directly inside the selected folder.

---

## 5. Start testing

Open a webpage.

Click the **DevStyle** extension.

Select:

**Inspect Element**

Hover over an element and click it.

You can then modify its:

* Width
* Height
* Position
* Font size
* Font weight
* Font color

Changes should appear immediately.

---

# 🔧 Development Workflow

When you modify the extension's code:

1. Save your changes.
2. Go to:

```text
chrome://extensions
```

3. Find DevStyle.
4. Click **Reload**.
5. Refresh the webpage.
6. Test again.

---

# 🗺️ Roadmap

## V1 — Basic Inspector

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

## V2 — Better CSS Editing

* [ ] Padding controls
* [ ] Margin controls
* [ ] Border controls
* [ ] Border radius
* [ ] Background color
* [ ] Better color picker
* [ ] Undo / Redo
* [ ] CSS history
* [ ] CSS selector generation

---

## V3 — Advanced Layout

* [ ] Flexbox editor
* [ ] CSS Grid editor
* [ ] Drag-to-resize
* [ ] Visual spacing controls
* [ ] Transform controls
* [ ] Z-index controls
* [ ] Positioning improvements
* [ ] Responsive viewport testing

---

## V4 — Developer Workflow

* [ ] Copy as Tailwind CSS
* [ ] Copy as SCSS
* [ ] Saved style presets
* [ ] Component export
* [ ] Keyboard shortcuts
* [ ] Design-system helpers
* [ ] CSS comparison/history
* [ ] Better iframe support
* [ ] Shadow DOM support

---

## 🔮 Future Ideas

Potential future features include:

* 🤖 AI-powered CSS suggestions
* 🎨 Design-system presets
* 📱 Responsive design preview
* 📐 Visual box-model editor
* 🧩 Component extraction
* ☁️ Cloud-saved projects
* 🔄 Cross-device synchronization
* 👥 Team collaboration

---

# 🤝 Contributing

Contributions, ideas, bug reports, and feature requests are welcome.

If you find a bug:

1. Open an **Issue**.
2. Explain what happened.
3. Include the website/environment where it happened if possible.
4. Include screenshots or console errors when relevant.

If you want to contribute code:

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

Finding the right CSS value often involves repeatedly changing a value and checking the result.

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

If you encounter a problem or have an idea, feel free to open an issue.

---

# 📌 Project Status

**Current Version:** `v1.0.0`

**Status:** 🚧 Active Development

DevStyle is currently an experimental project and is being actively developed.

The feature set and architecture may change as the project evolves.

---

# 📄 License

License information will be added as the project develops.

---

## DevStyle

**Select → Edit → Preview → Copy CSS**

Built for developers who don't want to guess CSS values.
