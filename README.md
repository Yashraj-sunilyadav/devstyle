DevStyle

A visual CSS editor for frontend developers.

DevStyle is a Chrome extension that lets you select an element on any
webpage, modify its CSS in real time, visually move and resize it, and
copy the resulting CSS.

The goal is simple:

Don't guess the CSS value. See it.

🚀 Current Version

V2.0

DevStyle is currently in active development.

Note: The Design System Generator and other planned advanced
features are not implemented yet. They are listed below as future
improvements.

✨ Current Features

🎯 Visual Element Inspector

Select elements directly from a webpage.

Hover to highlight elements

Click to select

View the selected element

Display tag, ID and class information

Select body and other root-level elements

📐 Layout

Change layout properties in real time:

Width

Height

Position

Top

Right

Bottom

Left

Z-index

Supported position types:

Static

Relative

Absolute

Fixed

Sticky

🔤 Typography

Modify:

Font family

Font size

Font weight

Font color

Line height

Letter spacing

Text alignment

🎨 Appearance

Currently supports:

Background color

Opacity

🧱 Border

Modify:

Border width

Border radius

Border color

Border style

Supported border styles:

None

Solid

Dashed

Dotted

Double

📦 Spacing

Modify:

Margin

Padding

Gap

▣ Visual Box Model

DevStyle includes a visual box-model editor for the selected element.

It provides controls for:

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

It also displays:

Content width

Content height

Box sizing

All changes are applied immediately to the selected element.

🖱️ Move Elements Visually

Select an element and use:

Move Element

Then drag the element directly on the webpage.

The selected element is moved using its CSS positioning.

Example:

position: relative;
left: 50px;
top: 20px;

↔️ Resize Elements Visually

DevStyle allows selected elements to be resized directly on the webpage.

Resize handles make it possible to visually adjust:

Width

Height

The corresponding CSS changes are applied in real time.

🧩 Flexbox Inspector

DevStyle provides a dedicated Flexbox section when the selected element
is a flex container.

It helps inspect and modify common Flexbox properties such as:

Flex direction

Justify content

Align items

Flex wrap

Gap

Other Flexbox layout values

▦ Grid Inspector

DevStyle also provides Grid controls when the selected element uses CSS
Grid.

It helps inspect and modify grid layout properties such as:

Grid template columns

Grid template rows

Grid gap

Column gap

Row gap

Alignment properties

🌐 Universal Layout Inspector

DevStyle includes a Universal Layout Inspector designed to inspect the
structure of a selected component and its descendants.

It is intended to work across different CSS layout systems, including:

Flexbox

Grid

Block

Inline

Absolute positioning

Fixed positioning

Sticky positioning

Normal document flow

Mixed layouts

The inspector provides a hierarchical view of the selected component and
its child elements.

This feature is part of the current development direction and is still
being improved.

🔍 CSS Property Search

Search CSS properties directly from the DevStyle panel.

This makes it easier to find a property without manually opening every
category.

Example:

Search → padding
Search → font-size
Search → border-radius

📋 Copy CSS

Copy the CSS changes made to the selected element.

This allows you to take the visual changes from DevStyle and use them
directly in your project.

⌨️ Keyboard Shortcuts

Shortcut             Action

Ctrl + Shift + E   Start DevStyle inspector
H                  Select another element
M                  Move selected element
Esc                Cancel active mode

On macOS:

Command + Shift + E

⚡ Live Editing

CSS changes are applied immediately to the webpage.

You can experiment with values visually without repeatedly switching
between:

Browser DevTools

Code editor

Browser preview

🎯 Goal

DevStyle is being built around a simple workflow:

Select
   ↓
Inspect
   ↓
Change
   ↓
See
   ↓
Copy

The goal is to make frontend styling faster and more visual.

🛣️ Roadmap

DevStyle is still actively evolving. Planned improvements include:

🎨 Design System Generator

A website-wide visual design system analyzer and generator.

Planned capabilities:

Website design-system overview

Color palette extraction

Color usage counts

Typography analysis

Font family detection

Font size scale

Spacing scale

Border-radius scale

Shadow analysis

Component detection

Button styles

Input styles

Card styles

Icon analysis

CSS variable / design-token detection

Design token visualization

Generated CSS variables

Exportable design-system CSS

Highlight where a color or token is used on the page

The goal is to turn an existing website into a visual representation of
its design language.

Status: Planned --- not implemented yet.

🧩 Bootstrap Support

Planned Bootstrap-oriented improvements include:

Detect Bootstrap components

Recognize Bootstrap utility classes

Inspect Bootstrap spacing utilities

Inspect Bootstrap typography utilities

Inspect Bootstrap grid structure

Understand Bootstrap breakpoints

Identify Bootstrap components

Improve editing of Bootstrap-based layouts

Generate or suggest Bootstrap-compatible changes

Status: Planned --- not implemented yet.

🚀 Future Improvements

Other areas being considered:

Better responsive layout inspection

Improved component hierarchy visualization

More CSS properties

Better responsive controls

CSS variable editing

More advanced layout debugging

Design-token editing

Improved export tools

More framework support

Better performance on large webpages

🧪 Development Status

DevStyle is an open-source project and is currently under active
development.

Features may change as the extension evolves.

Some features shown in the roadmap are concepts for future versions and
should not be considered available in the current release.

🤝 Contributing

Contributions, ideas, bug reports and feedback are welcome.

If you find a bug or have an idea for improving DevStyle, open an issue
or contribute through the project repository.

📄 License

License information will be added as the project develops.