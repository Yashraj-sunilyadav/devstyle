# DevStyle

> A visual CSS editor for frontend developers.

DevStyle is a Chrome extension that lets you select an element on any webpage, modify its CSS in real time, visually move and resize it, and copy the resulting CSS.

The goal is simple:

> **Don't guess the CSS value. See it.**

---

## 🚀 Current Version

**V1.5**

DevStyle is currently in active development.

---

# ✨ Features

## 🎯 Visual Element Inspector

Select elements directly from a webpage.

- Hover to highlight elements
- Click to select
- View the selected element
- Display tag, ID and class information
- Select `body` and other root-level elements

---

## 📐 Layout

Change layout properties in real time:

- Width
- Height
- Position
- Top
- Right
- Bottom
- Left
- Z-index

Supported position types:

- Static
- Relative
- Absolute
- Fixed
- Sticky

---

## 🔤 Typography

Modify:

- Font family
- Font size
- Font weight
- Font color
- Line height
- Letter spacing
- Text alignment

---

## 🎨 Appearance

Currently supports:

- Background color
- Opacity

---

## 🧱 Border

Modify:

- Border width
- Border radius
- Border color
- Border style

Supported border styles:

- None
- Solid
- Dashed
- Dotted
- Double

---

## 📦 Spacing

Modify:

- Margin
- Padding
- Gap

---

# ▣ Visual Box Model

DevStyle includes a visual box-model editor for the selected element.

It provides controls for:

### Margin

- Top
- Right
- Bottom
- Left

### Border

- Top
- Right
- Bottom
- Left

### Padding

- Top
- Right
- Bottom
- Left

It also displays:

- Content width
- Content height
- Box sizing

All changes are applied immediately to the selected element.

---

# 🖱️ Move Elements Visually

Select an element and use:

**Move Element**

Then drag the element directly on the webpage.

The selected element is moved using its CSS positioning.

Example:

```css
position: relative;
left: 50px;
top: 20px;