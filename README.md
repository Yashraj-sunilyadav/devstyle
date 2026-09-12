::: {align="center"}

✦ DevStyle

Visual CSS editing for frontend developers.

Select an element. Change the CSS. See the result instantly.





<br>{=html}

Don't guess the CSS value. See it.

DevStyle is a Chrome extension that brings a visual CSS editing workflow
directly onto any webpage. Select an element, inspect its layout, modify
styles in real time, move or resize it visually, and copy the resulting
CSS.
:::

🎬 What is DevStyle?

Frontend developers constantly switch between a webpage, DevTools and a
code editor just to answer a simple question:

"What CSS value should I change?"

DevStyle is designed to make that process visual.

        WEBPAGE
           │
           ▼
    ┌───────────────┐
    │ Select Element│
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │ Inspect Styles│
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │ Edit Visually │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │ See Changes   │
    │   Instantly    │
    └───────┬───────┘
            │
            ▼
       Copy CSS

✨ Current Features

Feature                          Status              What it does

🎯 Visual Inspector                ✅                Select and inspect
webpage elements

📐 Layout Editor                   ✅                Edit dimensions and
positioning

🔤 Typography                      ✅                Edit text-related
CSS

🎨 Appearance                      ✅                Edit background and
opacity

🧱 Border Editor                   ✅                Edit borders and
radius

📦 Spacing Editor                  ✅                Edit margin,
padding and gap

▣ Visual Box Model                 ✅                Visually edit
margin, border and
padding

🖱️ Move Element                    ✅                Drag elements
directly on the
page

↔️ Resize Element                  ✅                Resize selected
elements visually

🧩 Flexbox                         ✅                Inspect and edit
Inspector                                            Flexbox layouts

▦ Grid Inspector                   ✅                Inspect and edit
CSS Grid layouts

🌐 Universal Layout                🚧                Visual hierarchy
Inspector                                            for component
structure

🔍 CSS Property                    ✅                Quickly find CSS
Search                                               properties

📋 Copy CSS                        ✅                Copy your changes
as CSS

⌨️ Keyboard                        ✅                Fast
Shortcuts                                            keyboard-driven
workflow

🎨 Design System                   🔜                Analyze and
Generator                                            generate website
design systems

Legend: ✅ Available · 🚧 In development · 🔜 Planned

🎯 Visual Element Inspector

Select elements directly from the webpage instead of manually searching
through the DOM.

You can:

Hover to highlight elements

Click to select an element

Inspect the selected element

See tag, ID and class information

Select body and root-level elements

Switch to another element quickly

📐 Layout Editor

Change the most common layout properties without leaving the webpage.

Supported properties

Width
Height
Position
Top
Right
Bottom
Left
Z-index

Position modes

Static
Relative
Absolute
Fixed
Sticky

Changes are applied to the selected element immediately.

🔤 Typography

Experiment with typography visually.

Font Family
Font Size
Font Weight
Font Color
Line Height
Letter Spacing
Text Alignment

This makes it easy to find the right visual value before copying it into
your project.

🎨 Appearance

Currently supports:

Background color

Opacity

🧱 Border

Edit border styling in real time.

Controls

Border Width
Border Radius
Border Color
Border Style

Border styles

None
Solid
Dashed
Dotted
Double

📦 Spacing

Control the spacing around and inside an element.

Margin
Padding
Gap

▣ Visual Box Model

DevStyle provides a visual representation of the selected element's box
model.

┌─────────────────────────────────────┐
│              MARGIN                 │
│  ┌───────────────────────────────┐  │
│  │            BORDER             │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │        PADDING          │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │     CONTENT       │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

Margin

Top

Right

Bottom

Left

Border

Top

Right

Bottom

Left

Padding

Top

Right

Bottom

Left

Also displays:

Content width

Content height

Box sizing

🖱️ Move Elements Visually

Select an element and activate Move Element.

Then drag it directly on the webpage.

For example, DevStyle can turn a visual movement into:

position: relative;
left: 50px;
top: 20px;

This is useful when you know where an element should move but don't
know the exact CSS value yet.

↔️ Resize Elements Visually

Resize selected elements directly on the webpage using visual resize
handles.

Instead of repeatedly changing:

width: ...;
height: ...;

you can visually find the size you want and let DevStyle apply the
corresponding values.

🧩 Flexbox Inspector

When the selected element is a Flexbox container, DevStyle exposes a
dedicated Flexbox section.

It helps inspect and modify values such as:

Flex Direction
Justify Content
Align Items
Flex Wrap
Gap

The goal is to make Flexbox experimentation visual instead of requiring
constant manual CSS edits.

▦ Grid Inspector

When the selected element uses CSS Grid, DevStyle provides Grid
controls.

Current focus includes:

Grid Template Columns
Grid Template Rows
Grid Gap
Column Gap
Row Gap
Alignment

🌐 Universal Layout Inspector

The Universal Layout Inspector is being developed to understand a
selected component as a complete visual structure rather than looking at
only one CSS property at a time.

The intended hierarchy looks like:

.page
├── header
│   └── nav
│       ├── a
│       └── a
└── main
    └── section
        └── article

The planned/current development direction is to make the structure
useful across:

Flexbox

CSS Grid

Block layout

Inline layout

Absolute positioning

Fixed positioning

Sticky positioning

Normal document flow

Mixed layouts

The inspector is still being improved.

🔍 CSS Property Search

Don't open every category manually.

Search directly:

padding
font-size
border-radius
display
width

DevStyle filters the available CSS controls so you can reach the
property faster.

📋 Copy CSS

Once you have finished experimenting, copy the CSS changes and move them
into your project.

Visual Experiment
       ↓
Find the correct value
       ↓
Copy CSS
       ↓
Use it in your project

⌨️ Keyboard Shortcuts

Shortcut             Action

Ctrl + Shift + E   Start DevStyle inspector
H                  Select another element
M                  Move selected element
Esc                Cancel the active mode

macOS

Command + Shift + E

The shortcuts are designed to keep the workflow inside the webpage
rather than forcing repeated mouse interaction with the extension panel.

⚡ Why DevStyle?

Traditional workflow

Browser
  ↓
DevTools
  ↓
Find element
  ↓
Find CSS property
  ↓
Change value
  ↓
Look at result
  ↓
Repeat

DevStyle workflow

Click element
      ↓
Change visually
      ↓
See result instantly
      ↓
Copy CSS

The focus is visual iteration.

🧠 Design Philosophy

DevStyle is built around a few principles:

01 --- Visual first

If a CSS value can be understood visually, make it visual.

02 --- Instant feedback

Changes should appear immediately.

03 --- Less guessing

Developers should be able to experiment with values instead of
predicting them.

04 --- Keep the developer in flow

The fewer times you need to switch between tools, the faster you can
iterate.

05 --- CSS remains the source

DevStyle helps you discover the values. The resulting CSS can then be
copied into the actual project.

🛣️ Roadmap

The next major phase of DevStyle is moving beyond individual element
editing toward understanding an entire website's visual language.

🎨 Design System Generator --- Planned

Not implemented yet.

The goal is to scan a website and turn its existing visual patterns into
a readable design-system dashboard.

Planned analysis

Website
   │
   ├── Colors
   ├── Typography
   ├── Spacing
   ├── Radius
   ├── Shadows
   ├── Components
   ├── Icons
   └── Design Tokens

Planned capabilities

Website design-system overview

Color palette extraction

Color usage counts

Typography analysis

Font-family detection

Font-size scale

Spacing scale

Border-radius scale

Shadow analysis

Component detection

Button styles

Input styles

Card styles

Icon analysis

CSS variable detection

Design-token visualization

Generated CSS variables

Exportable design-system CSS

Highlight token/color usage on the page

Edit common design values

The long-term idea

Existing Website
       ↓
     Scan
       ↓
Analyze visual patterns
       ↓
Design System
       ↓
Tokens + Components + Styles
       ↓
Export / Improve

🧩 Bootstrap Support --- Planned

Not implemented yet.

DevStyle is planned to become more useful on websites built with
Bootstrap.

Potential capabilities include:

Detect Bootstrap components

Recognize Bootstrap utility classes

Understand Bootstrap spacing utilities

Inspect Bootstrap typography utilities

Inspect Bootstrap grid structure

Understand Bootstrap breakpoints

Identify Bootstrap components

Suggest Bootstrap-compatible changes

Improve editing of Bootstrap-based layouts

🚀 Future Improvements

Other areas being considered:

Better responsive layout inspection

More CSS properties

CSS variable editing

Advanced layout debugging

Better component hierarchy visualization

Improved responsive controls

Design-token editing

More framework support

Improved export tools

Performance improvements on large webpages

Better developer workflow integrations

🏗️ Project Structure

DevStyle is a Manifest V3 Chrome extension.

The main pieces are:

DevStyle/
├── manifest.json
├── background.js
├── content.js
├── content.css
├── popup.html
├── popup.css
├── popup.js
└── icons/
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png

Main responsibilities

File              Purpose

manifest.json   Chrome extension configuration
content.js      Inspector, editor and webpage interaction
content.css     DevStyle interface styling
popup.html      Extension popup structure
popup.css       Popup styling
popup.js        Popup interactions
background.js   Extension background/service worker
icons/          DevStyle extension icons

🧪 Development Status

DevStyle is an open-source project under active development.

Current development is focused on making the visual editing workflow
more powerful while gradually expanding into website-wide layout and
design-system analysis.

Features marked Planned are concepts for future releases and are
not available in the current version.

🤝 Contributing

Ideas, feedback, bug reports and contributions are welcome.

If you find something that can be improved:

Open an issue

Describe the problem or idea

Include steps to reproduce bugs when possible

Suggest improvements

Submit a pull request if you want to contribute code

⭐ Support the Project

If DevStyle is useful to you:

⭐ Star the repository

🐛 Report bugs

💡 Suggest features

🔧 Contribute code

📣 Share it with other frontend developers

::: {align="center"}

Built for developers who think visually.

DevStyle --- See the CSS. Change the CSS.

View DevStyle on
GitHub

<br>{=html}

✦ Developed by Yazz
:::
