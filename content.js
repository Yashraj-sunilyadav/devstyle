let inspecting = false;

let selectedElement = null;

let highlight = null;

let panel = null;

let panelDragging = false;

let dragStartX = 0;

let dragStartY = 0;

let panelStartLeft = 0;

let panelStartTop = 0;
let layoutInspectorActive = false;
let layoutInspectorOverlay = null;
let layoutInspectorRoot = null;
let layoutInspectorFrame = null;

// =====================================================
// CSS PROPERTY CONFIGURATION
// =====================================================
// =====================================================
// DEVSTYLE KEYBOARD SHORTCUTS
// M = Move selected element
// H = Select another element
// ESC = Cancel current mode
// =====================================================

function activateSelectMode() {

    // Clean up any existing modes first
    if (movingElement) {
        stopElementMove();
    }

    if (inspecting) {
        stopInspector();
    }

    // Force inspect mode ON
    inspecting = true;

    createHighlight();

    document.addEventListener(
        "mousemove",
        handleMouseMove,
        true
    );

    document.addEventListener(
        "click",
        handleElementClick,
        true
    );
}
// =====================================================
// DEVSTYLE KEYBOARD SHORTCUTS
//
// M = Move selected element
// H = Select another element
// ESC = Cancel current mode
// =====================================================

document.addEventListener(
    "keydown",
    (event) => {

        const tag =
            event.target?.tagName?.toLowerCase();


        const isTyping =
            tag === "input" ||
            tag === "textarea" ||
            tag === "select" ||
            event.target?.isContentEditable;


        // -----------------------------------------
        // DO NOT TRIGGER SHORTCUTS WHILE TYPING
        // -----------------------------------------

        if (isTyping) {
            return;
        }


        // =========================================
        // H = SELECT ANOTHER ELEMENT
        // =========================================

        if (
            event.key.toLowerCase() === "h" &&
            panel
        ) {

            event.preventDefault();


            // -------------------------------------
            // 1. CLOSE LAYOUT INSPECTOR
            // -------------------------------------

            if (
                typeof stopUniversalLayoutInspector ===
                "function"
            ) {

                stopUniversalLayoutInspector();

            }


            if (
                typeof clearLayoutHighlight ===
                "function"
            ) {

                clearLayoutHighlight();

            }


            // -------------------------------------
            // 2. STOP MOVE MODE
            // -------------------------------------

            if (movingElement) {

                stopElementMove();

            }


            // -------------------------------------
            // 3. STOP RESIZE MODE
            // -------------------------------------

            if (
                typeof resizingElement !==
                "undefined" &&
                resizingElement
            ) {

                if (
                    typeof stopElementResize ===
                    "function"
                ) {

                    stopElementResize();

                }

            }


            // -------------------------------------
            // 4. STOP CURRENT INSPECTOR
            // -------------------------------------

            if (inspecting) {

                stopInspector();

            }


            // -------------------------------------
            // 5. START NORMAL INSPECT MODE
            // -------------------------------------

            startInspector();


            return;
        }


        // =========================================
        // M = MOVE CURRENTLY SELECTED ELEMENT
        // =========================================

        if (
            event.key.toLowerCase() === "m" &&
            panel &&
            selectedElement
        ) {

            event.preventDefault();


            // -------------------------------------
            // 1. CLOSE LAYOUT INSPECTOR
            // -------------------------------------

            if (
                typeof stopUniversalLayoutInspector ===
                "function"
            ) {

                stopUniversalLayoutInspector();

            }


            if (
                typeof clearLayoutHighlight ===
                "function"
            ) {

                clearLayoutHighlight();

            }


            // -------------------------------------
            // 2. STOP NORMAL INSPECTOR
            // -------------------------------------

            if (inspecting) {

                stopInspector();

            }


            // -------------------------------------
            // 3. STOP RESIZE MODE
            // -------------------------------------

            if (
                typeof resizingElement !==
                "undefined" &&
                resizingElement
            ) {

                if (
                    typeof stopElementResize ===
                    "function"
                ) {

                    stopElementResize();

                }

            }


            // -------------------------------------
            // 4. USE EXISTING MOVE BUTTON
            // -------------------------------------

            const moveButton =
                document.getElementById(
                    "devstyle-move-button"
                );


            if (moveButton) {

                moveButton.click();

            }


            return;
        }


        // =========================================
        // ESC = CANCEL ACTIVE MODE
        // =========================================

        if (
            event.key === "Escape"
        ) {


            // -------------------------------------
            // LAYOUT INSPECTOR
            // -------------------------------------

            if (
                typeof layoutInspectorActive !==
                "undefined" &&
                layoutInspectorActive
            ) {

                event.preventDefault();


                stopUniversalLayoutInspector();

                clearLayoutHighlight();


                const layoutButton =
                    document.getElementById(
                        "devstyle-layout-inspector-button"
                    );


                if (layoutButton) {

                    layoutButton.textContent =
                        "Show";

                    layoutButton
                        .classList
                        .remove("is-active");

                }


                return;
            }


            // -------------------------------------
            // MOVE
            // -------------------------------------

            if (movingElement) {

                event.preventDefault();

                stopElementMove();

                return;
            }


            // -------------------------------------
            // RESIZE
            // -------------------------------------

            if (
                typeof resizingElement !==
                "undefined" &&
                resizingElement
            ) {

                event.preventDefault();


                if (
                    typeof stopElementResize ===
                    "function"
                ) {

                    stopElementResize();

                }


                return;
            }


            // -------------------------------------
            // NORMAL INSPECTOR
            // -------------------------------------

            if (inspecting) {

                event.preventDefault();

                stopInspector();

                return;
            }

        }

    },
    true
);
const categories = [

    {
        id: "layout",
        name: "Layout",
        icon: "📐",

        properties: [

            {
                label: "Width",
                property: "width",
                type: "number",
                unit: "px"
            },

            {
                label: "Height",
                property: "height",
                type: "number",
                unit: "px"
            },

            {
                label: "Position",
                property: "position",
                type: "select",

                options: [
                    "static",
                    "relative",
                    "absolute",
                    "fixed",
                    "sticky"
                ]
            },

            {
                label: "Top",
                property: "top",
                type: "number",
                unit: "px"
            },

            {
                label: "Right",
                property: "right",
                type: "number",
                unit: "px"
            },

            {
                label: "Bottom",
                property: "bottom",
                type: "number",
                unit: "px"
            },

            {
                label: "Left",
                property: "left",
                type: "number",
                unit: "px"
            },

            {
                label: "Z Index",
                property: "zIndex",
                type: "number",
                unit: ""
            }

        ]
    },


    {
        id: "typography",
        name: "Typography",
        icon: "🔤",

        properties: [

            {
                label: "Font Family",
                property: "fontFamily",
                type: "font"
            },

            {
                label: "Font Size",
                property: "fontSize",
                type: "number",
                unit: "px"
            },

            {
                label: "Font Weight",
                property: "fontWeight",
                type: "select",

                options: [
                    "100",
                    "200",
                    "300",
                    "400",
                    "500",
                    "600",
                    "700",
                    "800",
                    "900"
                ],

                optionLabels: [
                    "100 - Thin",
                    "200 - Extra Light",
                    "300 - Light",
                    "400 - Normal",
                    "500 - Medium",
                    "600 - Semi Bold",
                    "700 - Bold",
                    "800 - Extra Bold",
                    "900 - Black"
                ]
            },

            {
                label: "Font Color",
                property: "color",
                type: "color"
            },

            {
                label: "Line Height",
                property: "lineHeight",
                type: "text"
            },

            {
                label: "Letter Spacing",
                property: "letterSpacing",
                type: "number",
                unit: "px"
            },

            {
                label: "Text Align",
                property: "textAlign",
                type: "select",

                options: [
                    "left",
                    "center",
                    "right",
                    "justify"
                ]
            }

        ]
    },


    {
        id: "appearance",
        name: "Appearance",
        icon: "🎨",

        properties: [

            {
                label: "Background Color",
                property: "backgroundColor",
                type: "color"
            },

            {
                label: "Opacity",
                property: "opacity",
                type: "number",
                unit: ""
            }

        ]
    },


    {
        id: "border",
        name: "Border",
        icon: "🧱",

        properties: [

            {
                label: "Border Width",
                property: "borderWidth",
                type: "number",
                unit: "px"
            },

            {
                label: "Border Radius",
                property: "borderRadius",
                type: "number",
                unit: "px"
            },

            {
                label: "Border Color",
                property: "borderColor",
                type: "color"
            },

            {
                label: "Border Style",
                property: "borderStyle",
                type: "select",

                options: [
                    "none",
                    "solid",
                    "dashed",
                    "dotted",
                    "double"
                ]
            }

        ]
    },


    {
        id: "spacing",
        name: "Spacing",
        icon: "📦",

        properties: [

            {
                label: "Margin",
                property: "margin",
                type: "text"
            },

            {
                label: "Padding",
                property: "padding",
                type: "text"
            },

            {
                label: "Gap",
                property: "gap",
                type: "number",
                unit: "px"
            }

        ]
    }
    , {
        id: "box-model",
        name: "Box Model",
        icon: "▣",

        properties: [
            {
                label: "Box Model",
                property: "boxModel",
                type: "boxModel"
            }
        ]
    },

];


// =====================================================
// MESSAGE LISTENER
// IMPORTANT: ONLY ONE LISTENER
// =====================================================

chrome.runtime.onMessage.addListener((message) => {

    if (message.type === "START_INSPECT") {

        startInspector();

    }

});


// =====================================================
// START INSPECTOR
// =====================================================

function startInspector() {

    if (inspecting) {

        stopInspector();

        return;

    }


    inspecting = true;

    createHighlight();


    document.addEventListener(
        "mousemove",
        handleMouseMove,
        true
    );


    document.addEventListener(
        "click",
        handleElementClick,
        true
    );

}


// =====================================================
// HIGHLIGHT
// =====================================================

function createHighlight() {

    if (highlight) {
        return;
    }


    highlight =
        document.createElement("div");


    highlight.id =
        "devstyle-highlight";


    document.documentElement
        .appendChild(highlight);

}


// =====================================================
// MOUSE MOVE
// =====================================================

function handleMouseMove(event) {

    if (!inspecting) {
        return;
    }


    const element =
        event.target;


    if (!(element instanceof Element)) {
        return;
    }


    if (
        element === highlight ||
        panel?.contains(element)
    ) {

        return;

    }


    const rect =
        element.getBoundingClientRect();


    highlight.style.left =
        `${rect.left}px`;


    highlight.style.top =
        `${rect.top}px`;


    highlight.style.width =
        `${rect.width}px`;


    highlight.style.height =
        `${rect.height}px`;

}


// =====================================================
// SELECT ELEMENT
// =====================================================

function handleElementClick(event) {

    if (!inspecting) {
        return;
    }


    const element =
        event.target;


    if (!(element instanceof Element)) {
        return;
    }


    if (
        element === highlight ||
        panel?.contains(element)
    ) {

        return;

    }


    event.preventDefault();

    event.stopPropagation();

    event.stopImmediatePropagation();


    selectedElement =
        element;


    stopInspector();


    showEditor(element);

}


// =====================================================
// STOP INSPECTOR
// =====================================================

function stopInspector() {

    inspecting = false;


    document.removeEventListener(
        "mousemove",
        handleMouseMove,
        true
    );


    document.removeEventListener(
        "click",
        handleElementClick,
        true
    );


    if (highlight) {

        highlight.remove();

        highlight = null;

    }

}


// =====================================================
// SHOW EDITOR
// =====================================================

function showEditor(element) {

    // =====================================================
    // SAVE CURRENT PANEL STATE
    // =====================================================

    let oldPanelState = null;


    if (panel) {

        const rect =
            panel.getBoundingClientRect();


        oldPanelState = {

            left: rect.left,

            top: rect.top,

            width: rect.width,

            height: rect.height,

            compact:
                panel.classList.contains(
                    "devstyle-compact"
                )

        };

    }


    // =====================================================
    // REMOVE OLD PANEL
    // =====================================================

    removePanel();


    // =====================================================
    // VERY IMPORTANT
    // restore the newly selected element
    // because removePanel() sets selectedElement = null
    // =====================================================

    selectedElement =
        element;


    // =====================================================
    // CREATE NEW PANEL
    // =====================================================

    panel =
        document.createElement("div");


    panel.id =
        "devstyle-panel";


    panel.innerHTML = `

        <header
            class="devstyle-header"
            id="devstyle-drag-handle"
        >

            <div class="devstyle-header-main">

                <div class="devstyle-brand">
                    DevStyle
                </div>


                <div
                    class="devstyle-selected-element"
                    id="devstyle-selected-element"
                >
                    ${getElementName(element)}
                </div>

            </div>


            <div class="devstyle-header-actions">

                <button
                    id="devstyle-minimize"
                    class="devstyle-header-button"
                    title="Compact mode"
                >
                    −
                </button>


                <button
                    id="devstyle-close"
                    class="devstyle-header-button"
                    title="Close"
                >
                    ×
                </button>

            </div>

        </header>


        <div
            class="devstyle-search-wrap"
            id="devstyle-search-wrap"
        >

            <span class="devstyle-search-icon">
                ⌕
            </span>


            <input
                id="devstyle-search-input"
                type="text"
                placeholder="Search CSS property..."
                autocomplete="off"
            >

        </div>


        <main
            id="devstyle-content"
            class="devstyle-content"
        >

            ${renderCategories(element)}

        </main>


        <footer class="devstyle-footer">

            <button
                id="devstyle-copy"
                class="devstyle-copy"
            >
                Copy CSS
            </button>


            <div
                id="devstyle-status"
                class="devstyle-status"
            >
                Changes are applied instantly
            </div>

        </footer>

    `;


    // =====================================================
    // ADD NEW PANEL
    // =====================================================

    document.documentElement
        .appendChild(panel);


    // =====================================================
    // RESTORE PANEL POSITION / SIZE
    // =====================================================

    if (oldPanelState) {

        panel.style.left =
            `${oldPanelState.left}px`;


        panel.style.top =
            `${oldPanelState.top}px`;


        panel.style.right =
            "auto";


        panel.style.width =
            `${oldPanelState.width}px`;


        panel.style.height =
            `${oldPanelState.height}px`;


        if (
            oldPanelState.compact
        ) {

            panel.classList.add(
                "devstyle-compact"
            );

        }

    }


    // =====================================================
    // SETUP PANEL
    // =====================================================

    setupPanel(element);

}

// =====================================================
// ELEMENT NAME
// =====================================================

function getElementName(element) {

    let name =
        `<${element.tagName.toLowerCase()}>`;


    if (element.id) {

        name +=
            ` #${element.id}`;

    }


    if (
        typeof element.className === "string" &&
        element.className.trim()
    ) {

        const classes =
            element.className
                .trim()
                .split(/\s+/)
                .slice(0, 3);


        name +=
            ` .${classes.join(".")}`;

    }


    return escapeHTML(name);

}


// =====================================================
// RENDER CATEGORIES
// ALL CLOSED INITIALLY
// =====================================================




// =====================================================
// RENDER PROPERTY
// =====================================================

// =====================================================
// RENDER CATEGORIES
// ALL CLOSED INITIALLY
// =====================================================

function renderCategories(element) {

    let html = categories
        .map(category => {

            return `

                <section
                    class="devstyle-category"
                    data-category="${category.id}"
                >

                    <button
                        class="devstyle-category-header"
                        data-category-toggle="${category.id}"
                        type="button"
                    >

                        <span class="devstyle-category-left">

                            <span class="devstyle-category-icon">
                                ${category.icon}
                            </span>

                            <span>
                                ${category.name}
                            </span>

                        </span>


                        <span class="devstyle-arrow">
                            ⌄
                        </span>

                    </button>


                    <div
                        class="devstyle-category-content"
                        data-category-content="${category.id}"
                    >

                        ${category.properties
                            .map(property =>
                                renderProperty(
                                    element,
                                    property
                                )
                            )
                            .join("")}

                    </div>

                </section>

            `;

        })
        .join("");


    // =====================================================
    // FLEXBOX
    // Only show when selected element is a flex container
    // =====================================================

    html += renderFlexCategory(element);


// =================================================
// GRID
// Only show when selected element is a grid container
// =================================================

html += renderGridCategory(element);


html += renderUniversalLayoutCategory(element);

    return html;

}
// =====================================================
// RENDER PROPERTY
// =====================================================

function renderProperty(element, property) {

    const styles = getComputedStyle(element);

    const value = styles[property.property];

    const searchText =
        property.label.toLowerCase();


    // =========================================
    // NUMBER
    // =========================================

    if (property.type === "number") {

        const numericValue =
            parseFloat(value);

        return `
            <div
                class="devstyle-field"
                data-property-name="${searchText}"
            >

                <label>
                    ${property.label}
                </label>

                <div class="devstyle-input-row">

                    <input
                        type="number"
                        value="${
                            Number.isNaN(numericValue)
                                ? 0
                                : numericValue
                        }"
                        data-property="${property.property}"
                    >

                    <span class="devstyle-unit">
                        ${property.unit}
                    </span>

                </div>

            </div>
        `;
    }


    // =========================================
    // TEXT
    // =========================================

    if (property.type === "text") {

        return `
            <div
                class="devstyle-field"
                data-property-name="${searchText}"
            >

                <label>
                    ${property.label}
                </label>

                <input
                    type="text"
                    value="${escapeAttribute(value)}"
                    data-property="${property.property}"
                >

            </div>
        `;
    }


    // =========================================
    // COLOR
    // =========================================

    if (property.type === "color") {

        const hex = rgbToHex(value);

        return `
            <div
                class="devstyle-field"
                data-property-name="${searchText}"
            >

                <label>
                    ${property.label}
                </label>

                <div class="devstyle-input-row">

                    <input
                        type="color"
                        value="${hex}"
                        data-color-property="${property.property}"
                    >

                    <input
                        type="text"
                        value="${hex}"
                        data-color-text="${property.property}"
                    >

                </div>

            </div>
        `;
    }


    // =========================================
    // FONT
    // =========================================

    if (property.type === "font") {

        const fonts = [
            "Arial",
            "Inter",
            "Roboto",
            "Poppins",
            "Verdana",
            "Helvetica",
            "Georgia",
            "Times New Roman",
            "Courier New",
            "sans-serif",
            "serif",
            "monospace"
        ];

        const currentFont =
            value
                .split(",")[0]
                .replace(/"/g, "")
                .trim();

        return `
            <div
                class="devstyle-field"
                data-property-name="${searchText}"
            >

                <label>
                    ${property.label}
                </label>

                <select
                    data-property="${property.property}"
                >

                    ${fonts
                        .map(font => `
                            <option
                                value="${font}"
                                ${
                                    currentFont.toLowerCase() ===
                                    font.toLowerCase()
                                        ? "selected"
                                        : ""
                                }
                            >
                                ${font}
                            </option>
                        `)
                        .join("")}

                </select>

            </div>
        `;
    }


    // =========================================
    // SELECT
    // =========================================

    if (property.type === "select") {

        return `
            <div
                class="devstyle-field"
                data-property-name="${searchText}"
            >

                <label>
                    ${property.label}
                </label>

                <select
                    data-property="${property.property}"
                >

                    ${property.options
                        .map((option, index) => {

                            const label =
                                property.optionLabels
                                    ? property.optionLabels[index]
                                    : option;

                            return `
                                <option
                                    value="${option}"
                                    ${
                                        value === option
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    ${label}
                                </option>
                            `;

                        })
                        .join("")}

                </select>

            </div>
        `;
    }


    // =========================================
    // BOX MODEL
    // =========================================

    if (property.type === "boxModel") {

        const styles =
            getComputedStyle(element);

        return createBoxModelEditor(
            element,
            styles
        );
    }


    return "";
}
function renderFlexCategory(element) {

    const styles =
        getComputedStyle(element);

    const isFlex =
        styles.display === "flex" ||
        styles.display === "inline-flex";


    // Flex controls only appear for flex containers

    if (!isFlex) {
        return "";
    }


    return `

        <section
            class="devstyle-category"
            data-category="flex"
        >

            <button
                type="button"
                class="devstyle-category-header"
                data-category-toggle="flex"
            >

                <span class="devstyle-category-left">

                    <span class="devstyle-category-icon">
                        ↔
                    </span>

                    <span>
                        Flexbox
                    </span>

                </span>

                <span class="devstyle-arrow">
                    ⌄
                </span>

            </button>


            <div
                class="devstyle-category-content"
                data-category-content="flex"
            >

                <!-- DIRECTION -->

                <div class="devstyle-field">

                    <label>
                        Direction
                    </label>

                    <select
                        data-property="flexDirection"
                    >

                        <option
                            value="row"
                            ${styles.flexDirection === "row"
                                ? "selected"
                                : ""}
                        >
                            row
                        </option>

                        <option
                            value="row-reverse"
                            ${styles.flexDirection === "row-reverse"
                                ? "selected"
                                : ""}
                        >
                            row-reverse
                        </option>

                        <option
                            value="column"
                            ${styles.flexDirection === "column"
                                ? "selected"
                                : ""}
                        >
                            column
                        </option>

                        <option
                            value="column-reverse"
                            ${styles.flexDirection === "column-reverse"
                                ? "selected"
                                : ""}
                        >
                            column-reverse
                        </option>

                    </select>

                </div>


                <!-- WRAP -->

                <div class="devstyle-field">

                    <label>
                        Wrap
                    </label>

                    <select
                        data-property="flexWrap"
                    >

                        <option
                            value="nowrap"
                            ${styles.flexWrap === "nowrap"
                                ? "selected"
                                : ""}
                        >
                            nowrap
                        </option>

                        <option
                            value="wrap"
                            ${styles.flexWrap === "wrap"
                                ? "selected"
                                : ""}
                        >
                            wrap
                        </option>

                        <option
                            value="wrap-reverse"
                            ${styles.flexWrap === "wrap-reverse"
                                ? "selected"
                                : ""}
                        >
                            wrap-reverse
                        </option>

                    </select>

                </div>


                <!-- JUSTIFY CONTENT -->

                <div class="devstyle-field">

                    <label>
                        Justify Content
                    </label>

                    <select
                        data-property="justifyContent"
                    >

                        <option
                            value="flex-start"
                            ${styles.justifyContent === "flex-start"
                                ? "selected"
                                : ""}
                        >
                            flex-start
                        </option>

                        <option
                            value="center"
                            ${styles.justifyContent === "center"
                                ? "selected"
                                : ""}
                        >
                            center
                        </option>

                        <option
                            value="flex-end"
                            ${styles.justifyContent === "flex-end"
                                ? "selected"
                                : ""}
                        >
                            flex-end
                        </option>

                        <option
                            value="space-between"
                            ${styles.justifyContent === "space-between"
                                ? "selected"
                                : ""}
                        >
                            space-between
                        </option>

                        <option
                            value="space-around"
                            ${styles.justifyContent === "space-around"
                                ? "selected"
                                : ""}
                        >
                            space-around
                        </option>

                        <option
                            value="space-evenly"
                            ${styles.justifyContent === "space-evenly"
                                ? "selected"
                                : ""}
                        >
                            space-evenly
                        </option>

                    </select>

                </div>


                <!-- ALIGN ITEMS -->

                <div class="devstyle-field">

                    <label>
                        Align Items
                    </label>

                    <select
                        data-property="alignItems"
                    >

                        <option
                            value="stretch"
                            ${styles.alignItems === "stretch"
                                ? "selected"
                                : ""}
                        >
                            stretch
                        </option>

                        <option
                            value="flex-start"
                            ${styles.alignItems === "flex-start"
                                ? "selected"
                                : ""}
                        >
                            flex-start
                        </option>

                        <option
                            value="center"
                            ${styles.alignItems === "center"
                                ? "selected"
                                : ""}
                        >
                            center
                        </option>

                        <option
                            value="flex-end"
                            ${styles.alignItems === "flex-end"
                                ? "selected"
                                : ""}
                        >
                            flex-end
                        </option>

                        <option
                            value="baseline"
                            ${styles.alignItems === "baseline"
                                ? "selected"
                                : ""}
                        >
                            baseline
                        </option>

                    </select>

                </div>


                <!-- ALIGN CONTENT -->

                <div class="devstyle-field">

                    <label>
                        Align Content
                    </label>

                    <select
                        data-property="alignContent"
                    >

                        <option
                            value="normal"
                            ${styles.alignContent === "normal"
                                ? "selected"
                                : ""}
                        >
                            normal
                        </option>

                        <option
                            value="flex-start"
                            ${styles.alignContent === "flex-start"
                                ? "selected"
                                : ""}
                        >
                            flex-start
                        </option>

                        <option
                            value="center"
                            ${styles.alignContent === "center"
                                ? "selected"
                                : ""}
                        >
                            center
                        </option>

                        <option
                            value="flex-end"
                            ${styles.alignContent === "flex-end"
                                ? "selected"
                                : ""}
                        >
                            flex-end
                        </option>

                        <option
                            value="space-between"
                            ${styles.alignContent === "space-between"
                                ? "selected"
                                : ""}
                        >
                            space-between
                        </option>

                        <option
                            value="space-around"
                            ${styles.alignContent === "space-around"
                                ? "selected"
                                : ""}
                        >
                            space-around
                        </option>

                        <option
                            value="stretch"
                            ${styles.alignContent === "stretch"
                                ? "selected"
                                : ""}
                        >
                            stretch
                        </option>

                    </select>

                </div>


                <!-- GAP -->

                <div class="devstyle-field">

                    <label>
                        Gap
                    </label>

                    <div class="devstyle-input-row">

                        <input
                            type="number"
                            data-property="gap"
                            min="0"
                            value="${parseFloat(styles.gap) || 0}"
                        >

                        <span class="devstyle-unit">
                            px
                        </span>

                    </div>

                </div>


                <!-- ROW GAP -->

                <div class="devstyle-field">

                    <label>
                        Row Gap
                    </label>

                    <div class="devstyle-input-row">

                        <input
                            type="number"
                            data-property="rowGap"
                            min="0"
                            value="${parseFloat(styles.rowGap) || 0}"
                        >

                        <span class="devstyle-unit">
                            px
                        </span>

                    </div>

                </div>


                <!-- COLUMN GAP -->

                <div class="devstyle-field">

                    <label>
                        Column Gap
                    </label>

                    <div class="devstyle-input-row">

                        <input
                            type="number"
                            data-property="columnGap"
                            min="0"
                            value="${parseFloat(styles.columnGap) || 0}"
                        >

                        <span class="devstyle-unit">
                            px
                        </span>

                    </div>

                </div>

            </div>

        </section>

    `;
}
// =====================================================
// RENDER GRID CATEGORY
// Only appears for CSS Grid containers
// =====================================================


function renderGridCategory(element) {

    const styles =
        getComputedStyle(element);


    const isGrid =
        styles.display === "grid" ||
        styles.display === "inline-grid";


    // Grid controls only appear for grid containers
    if (!isGrid) {
        return "";
    }


    return `

        <section
            class="devstyle-category"
            data-category="grid"
        >

            <button
                type="button"
                class="devstyle-category-header"
                data-category-toggle="grid"
            >

                <span class="devstyle-category-left">

                    <span class="devstyle-category-icon">
                        ▦
                    </span>

                    <span>
                        Grid
                    </span>

                </span>

                <span class="devstyle-arrow">
                    ⌄
                </span>

            </button>


            <div
                class="devstyle-category-content"
                data-category-content="grid"
            >


                <!-- =====================================
                     GRID TEMPLATE COLUMNS
                ====================================== -->

                <div
                    class="devstyle-field"
                    data-property-name="grid template columns"
                >

                    <label>
                        Template Columns
                    </label>

                    <input
                        type="text"
                        value="${escapeAttribute(
                            styles.gridTemplateColumns
                        )}"
                        data-property="gridTemplateColumns"
                    >

                </div>


                <!-- =====================================
                     GRID TEMPLATE ROWS
                ====================================== -->

                <div
                    class="devstyle-field"
                    data-property-name="grid template rows"
                >

                    <label>
                        Template Rows
                    </label>

                    <input
                        type="text"
                        value="${escapeAttribute(
                            styles.gridTemplateRows
                        )}"
                        data-property="gridTemplateRows"
                    >

                </div>


                <!-- =====================================
                     COLUMN GAP
                ====================================== -->

                <div
                    class="devstyle-field"
                    data-property-name="column gap"
                >

                    <label>
                        Column Gap
                    </label>

                    <div class="devstyle-input-row">

                        <input
                            type="number"
                            min="0"
                            value="${parseFloat(styles.columnGap) || 0}"
                            data-property="columnGap"
                        >

                        <span class="devstyle-unit">
                            px
                        </span>

                    </div>

                </div>


                <!-- =====================================
                     ROW GAP
                ====================================== -->

                <div
                    class="devstyle-field"
                    data-property-name="row gap"
                >

                    <label>
                        Row Gap
                    </label>

                    <div class="devstyle-input-row">

                        <input
                            type="number"
                            min="0"
                            value="${parseFloat(styles.rowGap) || 0}"
                            data-property="rowGap"
                        >

                        <span class="devstyle-unit">
                            px
                        </span>

                    </div>

                </div>


                <!-- =====================================
                     JUSTIFY ITEMS
                ====================================== -->

                <div
                    class="devstyle-field"
                    data-property-name="justify items"
                >

                    <label>
                        Justify Items
                    </label>

                    <select
                        data-property="justifyItems"
                    >

                        <option
                            value="normal"
                            ${styles.justifyItems === "normal"
                                ? "selected"
                                : ""}
                        >
                            normal
                        </option>

                        <option
                            value="stretch"
                            ${styles.justifyItems === "stretch"
                                ? "selected"
                                : ""}
                        >
                            stretch
                        </option>

                        <option
                            value="start"
                            ${styles.justifyItems === "start"
                                ? "selected"
                                : ""}
                        >
                            start
                        </option>

                        <option
                            value="center"
                            ${styles.justifyItems === "center"
                                ? "selected"
                                : ""}
                        >
                            center
                        </option>

                        <option
                            value="end"
                            ${styles.justifyItems === "end"
                                ? "selected"
                                : ""}
                        >
                            end
                        </option>

                    </select>

                </div>


                <!-- =====================================
                     ALIGN ITEMS
                ====================================== -->

                <div
                    class="devstyle-field"
                    data-property-name="align items"
                >

                    <label>
                        Align Items
                    </label>

                    <select
                        data-property="alignItems"
                    >

                        <option
                            value="normal"
                            ${styles.alignItems === "normal"
                                ? "selected"
                                : ""}
                        >
                            normal
                        </option>

                        <option
                            value="stretch"
                            ${styles.alignItems === "stretch"
                                ? "selected"
                                : ""}
                        >
                            stretch
                        </option>

                        <option
                            value="start"
                            ${styles.alignItems === "start"
                                ? "selected"
                                : ""}
                        >
                            start
                        </option>

                        <option
                            value="center"
                            ${styles.alignItems === "center"
                                ? "selected"
                                : ""}
                        >
                            center
                        </option>

                        <option
                            value="end"
                            ${styles.alignItems === "end"
                                ? "selected"
                                : ""}
                        >
                            end
                        </option>

                    </select>

                </div>


                <!-- =====================================
                     JUSTIFY CONTENT
                ====================================== -->

                <div
                    class="devstyle-field"
                    data-property-name="justify content"
                >

                    <label>
                        Justify Content
                    </label>

                    <select
                        data-property="justifyContent"
                    >

                        <option
                            value="normal"
                            ${styles.justifyContent === "normal"
                                ? "selected"
                                : ""}
                        >
                            normal
                        </option>

                        <option
                            value="start"
                            ${styles.justifyContent === "start"
                                ? "selected"
                                : ""}
                        >
                            start
                        </option>

                        <option
                            value="center"
                            ${styles.justifyContent === "center"
                                ? "selected"
                                : ""}
                        >
                            center
                        </option>

                        <option
                            value="end"
                            ${styles.justifyContent === "end"
                                ? "selected"
                                : ""}
                        >
                            end
                        </option>

                        <option
                            value="space-between"
                            ${styles.justifyContent === "space-between"
                                ? "selected"
                                : ""}
                        >
                            space-between
                        </option>

                        <option
                            value="space-around"
                            ${styles.justifyContent === "space-around"
                                ? "selected"
                                : ""}
                        >
                            space-around
                        </option>

                        <option
                            value="space-evenly"
                            ${styles.justifyContent === "space-evenly"
                                ? "selected"
                                : ""}
                        >
                            space-evenly
                        </option>

                    </select>

                </div>


                <!-- =====================================
                     ALIGN CONTENT
                ====================================== -->

                <div
                    class="devstyle-field"
                    data-property-name="align content"
                >

                    <label>
                        Align Content
                    </label>

                    <select
                        data-property="alignContent"
                    >

                        <option
                            value="normal"
                            ${styles.alignContent === "normal"
                                ? "selected"
                                : ""}
                        >
                            normal
                        </option>

                        <option
                            value="start"
                            ${styles.alignContent === "start"
                                ? "selected"
                                : ""}
                        >
                            start
                        </option>

                        <option
                            value="center"
                            ${styles.alignContent === "center"
                                ? "selected"
                                : ""}
                        >
                            center
                        </option>

                        <option
                            value="end"
                            ${styles.alignContent === "end"
                                ? "selected"
                                : ""}
                        >
                            end
                        </option>

                        <option
                            value="space-between"
                            ${styles.alignContent === "space-between"
                                ? "selected"
                                : ""}
                        >
                            space-between
                        </option>

                        <option
                            value="space-around"
                            ${styles.alignContent === "space-around"
                                ? "selected"
                                : ""}
                        >
                            space-around
                        </option>

                        <option
                            value="space-evenly"
                            ${styles.alignContent === "space-evenly"
                                ? "selected"
                                : ""}
                        >
                            space-evenly
                        </option>

                        <option
                            value="stretch"
                            ${styles.alignContent === "stretch"
                                ? "selected"
                                : ""}
                        >
                            stretch
                        </option>

                    </select>

                </div>


            </div>

        </section>

    `;
}

// =====================================================
// BOOTSTRAP CATEGORY
// Detects common Bootstrap utility/layout classes
// =====================================================
// =====================================================
// BOOTSTRAP CATEGORY
// =====================================================


// =====================================================
// UNIVERSAL LAYOUT INSPECTOR CATEGORY
// Works for EVERY selected element
// =====================================================
// =====================================================
// UNIVERSAL LAYOUT INSPECTOR
// VISUAL COMPONENT STRUCTURE
// =====================================================

// =====================================================
// UNIVERSAL LAYOUT INSPECTOR
// =====================================================

function renderUniversalLayoutCategory(element) {

    if (!element) {
        return "";
    }


    return `

        <section
            class="devstyle-category"
            data-category="layout-inspector"
        >

            <button
                type="button"
                class="devstyle-category-header"
                data-category-toggle="layout-inspector"
            >

                <span class="devstyle-category-left">

                    <span class="devstyle-category-icon">
                        ▦
                    </span>

                    <span>
                        Layout Inspector
                    </span>

                </span>


                <span class="devstyle-arrow">
                    ⌄
                </span>

            </button>


            <div
                class="devstyle-category-content"
                data-category-content="layout-inspector"
            >

                <!-- =====================================
                     TOOLBAR
                ====================================== -->

                <div class="devstyle-layout-toolbar">

                    <div class="devstyle-layout-toolbar-info">

                        <div class="devstyle-layout-title">
                            Component Structure
                        </div>

                        <div class="devstyle-layout-subtitle">
                            Visual hierarchy of this element
                        </div>

                    </div>


                    <button
                        type="button"
                        id="devstyle-layout-inspector-button"
                        class="devstyle-layout-show-button"
                    >
                        Show
                    </button>

                </div>


                <!-- =====================================
                     COMPONENT TREE
                ====================================== -->

                <div
                    id="devstyle-layout-tree"
                    class="devstyle-layout-tree"
                >

                    ${renderUniversalLayoutTree(
                        element,
                        0,
                        6
                    )}

                </div>


                <!-- =====================================
                     FOOTER
                ====================================== -->

                <div class="devstyle-layout-footer">

                    <span>
                        Click an element to inspect
                    </span>

                    <span>
                        ${countLayoutElements(element)}
                        elements
                    </span>

                </div>

            </div>

        </section>

    `;
}

// =====================================================
// UNIVERSAL LAYOUT TREE
// =====================================================
// =====================================================
// UNIVERSAL LAYOUT TREE
// =====================================================

function renderUniversalLayoutTree(
    element,
    depth = 0,
    maxDepth = 6
) {

    if (!element) {
        return "";
    }


    const children =
        Array.from(
            element.children
        ).filter(
            child =>
                isLayoutVisible(child)
        );


    const styles =
        getComputedStyle(element);


    const rect =
        element.getBoundingClientRect();


    const layoutType =
        getLayoutType(styles);


    // -----------------------------------------
    // ELEMENT NAME
    // -----------------------------------------

    let elementName = "";


    if (element.id) {

        elementName =
            `#${element.id}`;

    }

    else if (
        typeof element.className === "string" &&
        element.className.trim()
    ) {

        elementName =
            "." +
            element.className
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .join(".");

    }


    // -----------------------------------------
    // CHILDREN LAYOUT
    // -----------------------------------------

    let childrenClass =
        "devstyle-layout-children-normal";


    if (
        styles.display === "flex" ||
        styles.display === "inline-flex"
    ) {

        childrenClass =
            "devstyle-layout-children-flex";


    }


    else if (
        styles.display === "grid" ||
        styles.display === "inline-grid"
    ) {

        childrenClass =
            "devstyle-layout-children-grid";

    }


    return `

        <div
            class="devstyle-layout-tree-node"
            data-layout-element="true"
            data-layout-depth="${depth}"
            style="margin-left:${depth * 8}px"
        >


            <!-- =====================================
                 ELEMENT ROW
            ====================================== -->

            <div
                class="devstyle-layout-tree-row"
                data-layout-target="true"
            >

                <span
                    class="devstyle-layout-tree-arrow"
                >

                    ${
                        children.length > 0 &&
                        depth < maxDepth

                            ? "▾"

                            : "·"
                    }

                </span>


                <span
                    class="devstyle-layout-tree-tag"
                >
                    ${element.tagName.toLowerCase()}
                </span>


                ${
                    elementName

                        ? `

                            <span
                                class="devstyle-layout-tree-name"
                            >
                                ${escapeHTML(
                                    elementName
                                )}
                            </span>

                        `

                        : ""
                }


                <span
                    class="devstyle-layout-tree-type"
                >
                    ${layoutType}
                </span>


                <span
                    class="devstyle-layout-tree-size"
                >
                    ${Math.round(rect.width)}
                    ×
                    ${Math.round(rect.height)}
                </span>

            </div>


            <!-- =====================================
                 CHILDREN
            ====================================== -->

            ${
                children.length > 0 &&
                depth < maxDepth

                    ? `

                        <div
                            class="
                                devstyle-layout-tree-children
                                ${childrenClass}
                            "
                        >

                            ${children
                                .map(
                                    child =>
                                        renderUniversalLayoutTree(
                                            child,
                                            depth + 1,
                                            maxDepth
                                        )
                                )
                                .join("")
                            }

                        </div>

                    `

                    : ""
            }

        </div>

    `;
}
// =====================================================
// COUNT LAYOUT ELEMENTS
// =====================================================

function countLayoutElements(element) {

    if (!element) {
        return 0;
    }


    let count = 1;


    const children =
        Array.from(
            element.querySelectorAll("*")
        );


    children.forEach(child => {

        if (
            isLayoutVisible(child)
        ) {

            count++;

        }

    });


    return count;

}

// =====================================================
// LAYOUT HELPERS
// =====================================================

function isLayoutVisible(element) {

    if (!element) {
        return false;
    }


    // Never inspect DevStyle itself
    if (
        element.id === "devstyle-panel" ||
        element.closest("#devstyle-panel")
    ) {

        return false;

    }


    const styles =
        getComputedStyle(element);


    const rect =
        element.getBoundingClientRect();


    if (
        styles.display === "none" ||
        styles.visibility === "hidden"
    ) {

        return false;

    }


    if (
        rect.width <= 0 ||
        rect.height <= 0
    ) {

        return false;

    }


    return true;
}


// =====================================================
// LAYOUT TYPE
// =====================================================

function getLayoutType(styles) {

    if (
        styles.display === "flex" ||
        styles.display === "inline-flex"
    ) {

        return "Flex";

    }


    if (
        styles.display === "grid" ||
        styles.display === "inline-grid"
    ) {

        return "Grid";

    }


    if (
        styles.position === "absolute"
    ) {

        return "Absolute";

    }


    if (
        styles.position === "fixed"
    ) {

        return "Fixed";

    }


    return styles.display;
}


// =====================================================
// ELEMENT NAME
// =====================================================

function getLayoutElementName(element) {

    let name =
        element.tagName.toLowerCase();


    if (element.id) {

        name +=
            ` #${element.id}`;

    }


    if (
        typeof element.className === "string" &&
        element.className.trim()
    ) {

        const classes =
            element.className
                .trim()
                .split(/\s+/)
                .slice(0, 2);


        name +=
            `.${classes.join(".")}`;

    }


    return name;
}


// =====================================================
// SELECTOR
// =====================================================

function getLayoutSelector(element) {

    let selector =
        element.tagName.toLowerCase();


    if (element.id) {

        selector +=
            `#${element.id}`;

    }


    else if (
        typeof element.className === "string" &&
        element.className.trim()
    ) {

        selector +=
            "." +
            element.className
                .trim()
                .split(/\s+/)
                .slice(0, 3)
                .join(".");

    }


    return selector;
}


// =====================================================
// BOX VALUES
// =====================================================

function formatBoxValues(
    styles,
    type
) {

    return [

        styles[`${type}Top`],

        styles[`${type}Right`],

        styles[`${type}Bottom`],

        styles[`${type}Left`]

    ].join("  ");
}


// =====================================================
// BORDER VALUES
// =====================================================

function formatBorderValues(styles) {

    return [

        styles.borderTopWidth,

        styles.borderRightWidth,

        styles.borderBottomWidth,

        styles.borderLeftWidth

    ].join("  ");
}
// =====================================================
// BOOTSTRAP GUTTER OPTIONS
// =====================================================
// =====================================================
// START UNIVERSAL LAYOUT INSPECTOR
// =====================================================

function startUniversalLayoutInspector(
    element
) {

    if (!element) {
        return;
    }


    stopUniversalLayoutInspector();


    layoutInspectorActive =
        true;


    layoutInspectorRoot =
        element;


    layoutInspectorOverlay =
        document.createElement(
            "div"
        );


    layoutInspectorOverlay.id =
        "devstyle-universal-layout-overlay";


    Object.assign(
        layoutInspectorOverlay.style,
        {

            position: "fixed",

            left: "0",

            top: "0",

            width: "100vw",

            height: "100vh",

            zIndex: "2147483640",

            pointerEvents: "none"

        }
    );


    document.documentElement
        .appendChild(
            layoutInspectorOverlay
        );


    updateUniversalLayoutOverlay();


    window.addEventListener(
        "scroll",
        updateUniversalLayoutOverlay,
        true
    );


    window.addEventListener(
        "resize",
        updateUniversalLayoutOverlay
    );

}

// =====================================================
// BOOTSTRAP COLUMN OPTIONS
// =====================================================

// =====================================================
// UPDATE OVERLAY
// =====================================================

function updateUniversalLayoutOverlay() {

    if (
        !layoutInspectorActive ||
        !layoutInspectorRoot ||
        !layoutInspectorOverlay
    ) {

        return;

    }


    if (layoutInspectorFrame) {
        return;
    }


    layoutInspectorFrame =
        requestAnimationFrame(
            () => {

                layoutInspectorFrame =
                    null;


                layoutInspectorOverlay.innerHTML =
                    "";


                renderUniversalOverlayNode(
                    layoutInspectorRoot,
                    0,
                    6
                );

            }
        );

}

// =====================================================
// BOOTSTRAP NUMBER OPTIONS
// =====================================================


// =====================================================
// RENDER VISUAL NODE
// =====================================================

function renderUniversalOverlayNode(
    element,
    depth,
    maxDepth
) {

    if (
        depth > maxDepth ||
        !isLayoutVisible(element)
    ) {

        return;

    }


    const rect =
        element.getBoundingClientRect();


    const styles =
        getComputedStyle(element);


    const box =
        document.createElement("div");


    box.className =
        "devstyle-universal-layout-box";


    Object.assign(
        box.style,
        {

            position: "fixed",

            left: `${rect.left}px`,

            top: `${rect.top}px`,

            width: `${rect.width}px`,

            height: `${rect.height}px`,

            boxSizing: "border-box",

            pointerEvents: "none",

            zIndex:
                String(
                    2147483640 - depth
                )

        }
    );


    // =========================================
    // ADAPTIVE STROKE
    // =========================================

    const area =
        rect.width *
        rect.height;


    let width;


    if (depth === 0) {

        width = 3;

    }

    else if (
        area > 250000
    ) {

        width = 2.5;

    }

    else if (
        area > 80000
    ) {

        width = 2;

    }

    else if (
        area > 20000
    ) {

        width = 1.5;

    }

    else {

        width = 1;

    }


    box.style.border =
        `${width}px solid rgba(70, 140, 255, ${
            Math.max(
                0.25,
                0.8 - depth * 0.09
            )
        })`;


    // =========================================
    // LABEL ONLY FOR IMPORTANT ELEMENTS
    // =========================================

    if (
        depth <= 2 &&
        rect.width >= 80 &&
        rect.height >= 25
    ) {

        const label =
            document.createElement("div");


        label.className =
            "devstyle-universal-layout-label";


        label.textContent =
            `${getLayoutElementName(element)}  ${Math.round(rect.width)} × ${Math.round(rect.height)}`;


        Object.assign(
            label.style,
            {

                position: "absolute",

                left: "0",

                top: "0",

                transform:
                    "translateY(-100%)",

                maxWidth:
                    `${Math.min(
                        300,
                        Math.max(
                            100,
                            rect.width
                        )
                    )}px`,

                overflow: "hidden",

                textOverflow:
                    "ellipsis",

                whiteSpace:
                    "nowrap",

                padding:
                    depth === 0
                        ? "4px 7px"
                        : "2px 5px",

                fontSize:
                    depth === 0
                        ? "11px"
                        : "9px",

                lineHeight: "1.3",

                background:
                    "rgba(15,15,20,.92)",

                color:
                    "#ffffff",

                borderRadius:
                    "3px"

            }
        );


        box.appendChild(
            label
        );

    }


    layoutInspectorOverlay
        .appendChild(box);


    // =========================================
    // CHILDREN
    // =========================================

    if (
        depth < maxDepth
    ) {

        Array.from(
            element.children
        )
        .filter(child =>
            isLayoutVisible(child)
        )
        .forEach(child => {

            renderUniversalOverlayNode(
                child,
                depth + 1,
                maxDepth
            );

        });

    }

}
// =====================================================
// DETECT BOOTSTRAP
// =====================================================

// =====================================================
// STOP UNIVERSAL LAYOUT INSPECTOR
// =====================================================

function stopUniversalLayoutInspector() {

    layoutInspectorActive =
        false;


    layoutInspectorRoot =
        null;


    if (layoutInspectorFrame) {

        cancelAnimationFrame(
            layoutInspectorFrame
        );

        layoutInspectorFrame =
            null;

    }


    window.removeEventListener(
        "scroll",
        updateUniversalLayoutOverlay,
        true
    );


    window.removeEventListener(
        "resize",
        updateUniversalLayoutOverlay
    );


    if (layoutInspectorOverlay) {

        layoutInspectorOverlay.remove();

        layoutInspectorOverlay =
            null;

    }

}

// =====================================================
// UPDATE BOOTSTRAP
// =====================================================



// =====================================================
// REMOVE BOOTSTRAP CLASSES
// =====================================================


function setupPanel(element) {

    setupCategoryToggles();
    setupResponsiveStickyCategory();
    setupPropertyInputs(element);

    setupSearch();

    setupDragging();

    setupMinimize();


    document
        .getElementById("devstyle-close")
        .addEventListener(
            "click",
            removePanel
        );


    document
        .getElementById("devstyle-copy")
        .addEventListener(
            "click",
            () => {

                copyChangedCSS(element);

            }
        );


const resizeButton =
    document.getElementById(
        "devstyle-resize-button"
    );

if (resizeButton) {

    resizeButton.addEventListener(
        "click",
        () => {

            if (resizingElement) {

                stopElementResize();

            } else {

                startElementResize(
                    element
                );

            }

        }
    );

}    }


// =====================================================
// CATEGORY TOGGLES
// MULTIPLE CAN REMAIN OPEN
// =====================================================
function setupCategoryToggles() {

    const headers =
        panel.querySelectorAll(
            "[data-category-toggle]"
        );


    headers.forEach(header => {

        header.addEventListener(
            "click",
            () => {

                const categoryId =
                    header.dataset.categoryToggle;


                const category =
                    panel.querySelector(
                        `[data-category="${categoryId}"]`
                    );


                if (!category) {
                    return;
                }


                const content =
                    category.querySelector(
                        "[data-category-content]"
                    );


                const arrow =
                    category.querySelector(
                        ".devstyle-arrow"
                    );


                const isOpen =
                    category.classList.contains(
                        "is-open"
                    );


                if (isOpen) {

                    category.classList.remove(
                        "is-open"
                    );

                    content.style.display =
                        "none";

                    arrow.textContent =
                        "⌄";

                }

                else {

                    category.classList.add(
                        "is-open"
                    );

                    content.style.display =
                        "block";

                    arrow.textContent =
                        "⌃";


                    /*
                     * Put the newly opened category
                     * at the top of the scroll area.
                     */

                    setTimeout(() => {

                        category.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 50);

                }

            }
        );

    });

}

// =====================================================
// PROPERTY INPUTS
// =====================================================
function setupPropertyInputs(element) {

    // -----------------------------------------
    // NUMBER INPUTS
    // Exclude Grid track inputs
    // -----------------------------------------

    panel
        .querySelectorAll(
            'input[type="number"]:not([data-grid-track])'
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    const property =
                        input.dataset.property;

                    const value =
                        input.value;


                    if (
                        [
                            "top",
                            "right",
                            "bottom",
                            "left"
                        ].includes(property)
                    ) {

                        const position =
                            getComputedStyle(
                                element
                            ).position;


                        if (
                            position ===
                            "static"
                        ) {

                            element.style.position =
                                "relative";

                        }

                    }


                    if (
                        property === "zIndex" ||
                        property === "opacity"
                    ) {

                        element.style[property] =
                            value;

                    }

                    else {

                        element.style[property] =
                            `${value}px`;

                    }

                }
            );

        });


    // -----------------------------------------
    // GRID TRACK INPUTS
    // -----------------------------------------

    panel
        .querySelectorAll(
            'input[data-grid-track]'
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    const trackType =
                        input.dataset.gridTrack;

                    const index =
                        Number(
                            input.dataset.gridIndex
                        );


                    const property =
                        trackType === "column"
                            ? "gridTemplateColumns"
                            : "gridTemplateRows";


                    let current =
                        element.style[property];


                    // If no inline value exists,
                    // use the computed value.
                    if (!current) {

                        current =
                            getComputedStyle(
                                element
                            )[property];

                    }


                    const tracks =
                        parseGridTrackValues(
                            current
                        );


                    // Make sure the index exists
                    while (
                        tracks.length <= index
                    ) {

                        tracks.push("0px");

                    }


                    tracks[index] =
                        `${input.value || 0}px`;


                    element.style[property] =
                        tracks.join(" ");

                }
            );

        });


    // -----------------------------------------
    // TEXT INPUTS
    // -----------------------------------------

    panel
        .querySelectorAll(
            'input[type="text"][data-property]'
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    const property =
                        input.dataset.property;


                    element.style[property] =
                        input.value;

                }
            );

        });


    // -----------------------------------------
    // SELECT
    // -----------------------------------------

    panel
        .querySelectorAll(
            "select[data-property]"
        )
        .forEach(select => {

            select.addEventListener(
                "change",
                () => {

                    const property =
                        select.dataset.property;


                    element.style[property] =
                        select.value;

                }
            );

        });


    // -----------------------------------------
    // COLORS
    // -----------------------------------------

    panel
        .querySelectorAll(
            'input[type="color"]'
        )
        .forEach(colorInput => {

            const property =
                colorInput.dataset.colorProperty;


            const textInput =
                panel.querySelector(
                    `[data-color-text="${property}"]`
                );


            if (!textInput) {
                return;
            }


            colorInput.addEventListener(
                "input",
                () => {

                    const value =
                        colorInput.value;


                    element.style[property] =
                        value;


                    textInput.value =
                        value;

                }
            );


            textInput.addEventListener(
                "input",
                () => {

                    const value =
                        textInput.value;


                    if (
                        /^#[0-9A-F]{6}$/i.test(
                            value
                        )
                    ) {

                        element.style[property] =
                            value;


                        colorInput.value =
                            value;

                    }

                }
            );

        });


    // -----------------------------------------
    // BOX MODEL INPUTS
    // -----------------------------------------

    panel
        .querySelectorAll(
            "[data-box-property]"
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    const property =
                        input.dataset.boxProperty;

                    const value =
                        input.value;


                    element.style[property] =
                        `${value}px`;

                }
            );

        });


    // -----------------------------------------
    // MOVE ELEMENT
    // -----------------------------------------

    const moveButton =
        document.getElementById(
            "devstyle-move-button"
        );


    if (moveButton) {

        moveButton.addEventListener(
            "click",
            () => {

                if (movingElement) {

                    stopElementMove();

                }

                else {

                    startElementMove(
                        element
                    );

                }

            }
        );

    }


    // -----------------------------------------
    // UNIVERSAL LAYOUT INSPECTOR
    // -----------------------------------------

    const layoutInspectorButton =
        document.getElementById(
            "devstyle-layout-inspector-button"
        );


    if (layoutInspectorButton) {

        layoutInspectorButton.addEventListener(
            "click",
            () => {

                if (
                    layoutInspectorActive
                ) {

                    stopUniversalLayoutInspector();


                    layoutInspectorButton.textContent =
                        "⊞ Show Layout";


                    layoutInspectorButton
                        .classList
                        .remove("is-active");

                }

                else {

                    startUniversalLayoutInspector(
                        element
                    );


                    layoutInspectorButton.textContent =
                        "× Hide Layout";


                    layoutInspectorButton
                        .classList
                        .add("is-active");

                }

            }
        );

    }


    // -----------------------------------------
    // LAYOUT TREE INTERACTION
    // -----------------------------------------

    const layoutTree =
        panel.querySelector(
            "#devstyle-layout-tree"
        );


    if (layoutTree) {

        layoutTree
            .querySelectorAll(
                "[data-layout-target]"
            )
            .forEach(row => {

                // -----------------------------
                // HOVER
                // -----------------------------

                row.addEventListener(
                    "mouseenter",
                    () => {

                        const node =
                            row.closest(
                                "[data-layout-element]"
                            );


                        const target =
                            findLayoutElementFromTree(
                                node,
                                element
                            );


                        if (target) {

                            highlightLayoutElement(
                                target
                            );

                        }

                    }
                );


                // -----------------------------
                // REMOVE HIGHLIGHT
                // -----------------------------

                row.addEventListener(
                    "mouseleave",
                    () => {

                        clearLayoutHighlight();

                    }
                );


                // -----------------------------
                // CLICK
                // -----------------------------

                row.addEventListener(
                    "click",
                    () => {

                        const node =
                            row.closest(
                                "[data-layout-element]"
                            );


                        const target =
                            findLayoutElementFromTree(
                                node,
                                element
                            );


                        if (!target) {
                            return;
                        }


                        // Already selected
                        if (
                            target === element
                        ) {

                            return;

                        }


                        // Select the clicked
                        // element using the
                        // existing editor system.
                        showEditor(
                            target
                        );

                    }
                );

            });

    }

}
// =====================================================
// SEARCH
// =====================================================

function setupSearch() {

    const input =
        document.getElementById(
            "devstyle-search-input"
        );


    input.addEventListener(
        "input",
        () => {

            const query =
                input.value
                    .trim()
                    .toLowerCase();


            const categoryElements =
                panel.querySelectorAll(
                    ".devstyle-category"
                );


            categoryElements.forEach(
                category => {

                    const categoryName =
                        category
                            .querySelector(
                                ".devstyle-category-left"
                            )
                            ?.textContent
                            .toLowerCase() || "";


                    const fields =
                        category.querySelectorAll(
                            "[data-property-name]"
                        );


                    let visibleCount = 0;


                    fields.forEach(field => {

                        const propertyName =
                            field.dataset.propertyName;


                        const matches =
                            !query ||
                            categoryName.includes(query) ||
                            propertyName.includes(query);


                        field.style.display =
                            matches
                                ? "block"
                                : "none";


                        if (matches) {
                            visibleCount++;
                        }

                    });


                    const categoryMatches =
                        !query ||
                        categoryName.includes(query);


                    if (
                        categoryMatches ||
                        visibleCount > 0
                    ) {

                        category.style.display =
                            "block";

                    }

                    else {

                        category.style.display =
                            "none";

                    }


                    // Open a matching category
                    // when searching a property.

                    if (
                        query &&
                        visibleCount > 0 &&
                        !category.classList.contains(
                            "is-open"
                        )
                    ) {

                        category.classList.add(
                            "is-open"
                        );


                        const content =
                            category.querySelector(
                                ".devstyle-category-content"
                            );


                        const arrow =
                            category.querySelector(
                                ".devstyle-arrow"
                            );


                        content.style.display =
                            "block";


                        arrow.textContent =
                            "⌃";

                    }

                }
            );

        }
    );

}


// =====================================================
// DRAG PANEL
// =====================================================

function setupDragging() {

    const handle =
        document.getElementById(
            "devstyle-drag-handle"
        );


    if (!handle) {
        return;
    }


    handle.addEventListener(
        "mousedown",
        startDragging
    );

}


function startDragging(event) {

    if (
        event.target.closest(
            "button,input,select"
        )
    ) {

        return;

    }


    panelDragging = true;


    const rect =
        panel.getBoundingClientRect();


    dragStartX =
        event.clientX;


    dragStartY =
        event.clientY;


    panelStartLeft =
        rect.left;


    panelStartTop =
        rect.top;


    panel.style.left =
        `${rect.left}px`;


    panel.style.top =
        `${rect.top}px`;


    panel.style.right =
        "auto";


    document.body.style.userSelect =
        "none";


    document.addEventListener(
        "mousemove",
        dragPanel
    );


    document.addEventListener(
        "mouseup",
        stopDragging
    );

}


function dragPanel(event) {

    if (!panelDragging) {
        return;
    }


    const deltaX =
        event.clientX -
        dragStartX;


    const deltaY =
        event.clientY -
        dragStartY;


    let newLeft =
        panelStartLeft +
        deltaX;


    let newTop =
        panelStartTop +
        deltaY;


    const maxLeft =
        window.innerWidth -
        panel.offsetWidth;


    const maxTop =
        window.innerHeight -
        panel.offsetHeight;


    newLeft =
        Math.max(
            0,
            Math.min(
                newLeft,
                maxLeft
            )
        );


    newTop =
        Math.max(
            0,
            Math.min(
                newTop,
                maxTop
            )
        );


    panel.style.left =
        `${newLeft}px`;


    panel.style.top =
        `${newTop}px`;

}


function stopDragging() {

    panelDragging = false;


    document.body.style.userSelect =
        "";


    document.removeEventListener(
        "mousemove",
        dragPanel
    );


    document.removeEventListener(
        "mouseup",
        stopDragging
    );

}


// =====================================================
// MINIMIZE / COMPACT MODE
// =====================================================

function setupMinimize() {

    const button =
        document.getElementById(
            "devstyle-minimize"
        );


    button.addEventListener(
        "click",
        () => {

            const minimized =
                panel.classList.toggle(
                    "devstyle-compact"
                );


            if (minimized) {

                button.textContent =
                    "+";

                button.title =
                    "Expand editor";

            }

            else {

                button.textContent =
                    "−";

                button.title =
                    "Compact editor";

            }

        }
    );

}


// =====================================================
// COPY CSS
// =====================================================

async function copyChangedCSS(element) {

    const inlineStyles =
        element.style;


    let css = "";


    for (
        let i = 0;
        i < inlineStyles.length;
        i++
    ) {

        const property =
            inlineStyles[i];


        const value =
            inlineStyles.getPropertyValue(
                property
            );


        css +=
            `${property}: ${value};\n`;

    }


    try {

        await navigator.clipboard.writeText(
            css
        );


        const status =
            document.getElementById(
                "devstyle-status"
            );


        status.textContent =
            "CSS copied!";


        setTimeout(() => {

            if (status) {

                status.textContent =
                    "Changes are applied instantly";

            }

        }, 1500);


    }

    catch (error) {

        console.error(
            "Failed to copy CSS:",
            error
        );

    }

}


// =====================================================
// REMOVE PANEL
// =====================================================

// =====================================================
// REMOVE PANEL
//
// Also completely resets:
// - Layout Inspector
// - Layout hover highlight
// - Move mode
// - Resize mode
// - Inspect mode
// =====================================================

function removePanel() {


    // =========================================
    // STOP UNIVERSAL LAYOUT INSPECTOR
    // =========================================

    if (
        typeof stopUniversalLayoutInspector ===
        "function"
    ) {

        stopUniversalLayoutInspector();

    }


    // =========================================
    // CLEAR LAYOUT HIGHLIGHT
    // =========================================

    if (
        typeof clearLayoutHighlight ===
        "function"
    ) {

        clearLayoutHighlight();

    }


    // =========================================
    // RESET LAYOUT BUTTON STATE
    // =========================================

    const layoutButton =
        document.getElementById(
            "devstyle-layout-inspector-button"
        );


    if (layoutButton) {

        layoutButton.textContent =
            "Show";

        layoutButton
            .classList
            .remove("is-active");

    }


    // =========================================
    // STOP MOVE MODE
    // =========================================

    if (movingElement) {

        stopElementMove();

    }


    // =========================================
    // STOP RESIZE MODE
    // =========================================

    if (
        typeof resizingElement !==
        "undefined" &&
        resizingElement
    ) {

        if (
            typeof stopElementResize ===
            "function"
        ) {

            stopElementResize();

        }

    }


    // =========================================
    // STOP NORMAL INSPECTOR
    // =========================================

    if (inspecting) {

        stopInspector();

    }


    // =========================================
    // IF THERE IS NO PANEL
    // =========================================

    if (!panel) {

        selectedElement =
            null;

        return;

    }


    // =========================================
    // STOP PANEL DRAGGING
    // =========================================

    stopDragging();


    // =========================================
    // REMOVE PANEL
    // =========================================

    panel.remove();


    panel =
        null;


    // =========================================
    // CLEAR SELECTED ELEMENT
    // =========================================

    selectedElement =
        null;

}


// =====================================================
// RGB TO HEX
// =====================================================

function rgbToHex(rgb) {

    if (
        !rgb ||
        rgb === "transparent"
    ) {

        return "#000000";

    }


    const values =
        rgb.match(/\d+/g);


    if (
        !values ||
        values.length < 3
    ) {

        return "#000000";

    }


    return "#" +
        values
            .slice(0, 3)
            .map(value =>
                Number(value)
                    .toString(16)
                    .padStart(2, "0")
            )
            .join("");

}


// =====================================================
// ESCAPE HTML
// =====================================================

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value;


    return div.innerHTML;

}


// =====================================================
// ESCAPE ATTRIBUTE
// =====================================================

function escapeAttribute(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}
function setupActiveCategoryTracking() {

    const content =
        document.getElementById(
            "devstyle-content"
        );


    if (!content) {
        return;
    }


    const openCategories =
        content.querySelectorAll(
            ".devstyle-category.is-open"
        );


    function updateActiveCategory() {

        let activeCategory = null;

        let closestDistance =
            Infinity;


        openCategories.forEach(category => {

            const rect =
                category.getBoundingClientRect();


            const contentRect =
                content.getBoundingClientRect();


            const distance =
                Math.abs(
                    rect.top -
                    contentRect.top
                );


            if (
                rect.bottom >
                contentRect.top &&
                distance <
                closestDistance
            ) {

                closestDistance =
                    distance;

                activeCategory =
                    category;

            }

        });


        openCategories.forEach(
            category => {

                category.classList.remove(
                    "active-sticky"
                );

            }
        );


        if (activeCategory) {

            activeCategory.classList.add(
                "active-sticky"
            );

        }

    }


    content.addEventListener(
        "scroll",
        updateActiveCategory
    );


    updateActiveCategory();

}
function setupResponsiveStickyCategory() {

    if (!panel) {
        return;
    }

    const resizeObserver =
        new ResizeObserver(() => {

            const width =
                panel.getBoundingClientRect().width;

            // Large / normal panel
            if (width >= 340) {

                panel.classList.remove(
                    "devstyle-small-panel"
                );

                panel.classList.remove(
                    "devstyle-medium-panel"
                );

            }

            // Medium panel
            else if (width >= 290) {

                panel.classList.remove(
                    "devstyle-small-panel"
                );

                panel.classList.add(
                    "devstyle-medium-panel"
                );

            }

            // Small panel
            else {

                panel.classList.remove(
                    "devstyle-medium-panel"
                );

                panel.classList.add(
                    "devstyle-small-panel"
                );

            }

        });


    resizeObserver.observe(panel);

    // Store observer so it can be cleaned up
    panel._devstyleResizeObserver =
        resizeObserver;
}
function createBoxModelEditor(element, styles) {

    const isRootElement =
        element === document.body ||
        element === document.documentElement;

    const currentPosition =
        styles.position;

    const movementDisabled =
        isRootElement;


    return `

        <div class="devstyle-box-model">

            <!-- =================================================
                 MOVE ELEMENT
            ================================================= -->

            <div class="devstyle-move-section">

                <div class="devstyle-move-header">

                    <div>

                        <div class="devstyle-move-title">
                            Move Element
                        </div>

                        <div class="devstyle-move-description">
                            Drag the selected element directly on the page.
                        </div>

                    </div>

                </div>


                <button
                    type="button"
                    id="devstyle-move-button"
                    class="devstyle-move-button"
                    ${movementDisabled ? "disabled" : ""}
                >

                    ${movementDisabled
            ? "Not available for root element"
            : "↔  Move Element"
        }

                </button>
                <button
    type="button"
    id="devstyle-resize-button"
    class="devstyle-resize-button"
>
    ↗ Resize Element
</button>


                <div
                    id="devstyle-move-status"
                    class="devstyle-move-status"
                >

                    ${movementDisabled
            ? "Select a child element to move it."
            : `Current position: ${currentPosition}`
        }

                </div>

            </div>


            <!-- =================================================
                 VISUAL BOX MODEL
            ================================================= -->

            <div class="devstyle-box-layer devstyle-margin-layer">

                <span class="devstyle-layer-label">
                    Margin
                </span>


                <input
                    class="box-input box-margin-top"
                    type="number"
                    value="${parseFloat(styles.marginTop) || 0}"
                    data-box-property="marginTop"
                >


                <input
                    class="box-input box-margin-right"
                    type="number"
                    value="${parseFloat(styles.marginRight) || 0}"
                    data-box-property="marginRight"
                >


                <input
                    class="box-input box-margin-bottom"
                    type="number"
                    value="${parseFloat(styles.marginBottom) || 0}"
                    data-box-property="marginBottom"
                >


                <input
                    class="box-input box-margin-left"
                    type="number"
                    value="${parseFloat(styles.marginLeft) || 0}"
                    data-box-property="marginLeft"
                >


                <!-- BORDER -->

                <div class="devstyle-box-layer devstyle-border-layer">

                    <span class="devstyle-layer-label">
                        Border
                    </span>


                    <input
                        class="box-input box-border-top"
                        type="number"
                        value="${parseFloat(styles.borderTopWidth) || 0}"
                        data-box-property="borderTopWidth"
                    >


                    <input
                        class="box-input box-border-right"
                        type="number"
                        value="${parseFloat(styles.borderRightWidth) || 0}"
                        data-box-property="borderRightWidth"
                    >


                    <input
                        class="box-input box-border-bottom"
                        type="number"
                        value="${parseFloat(styles.borderBottomWidth) || 0}"
                        data-box-property="borderBottomWidth"
                    >


                    <input
                        class="box-input box-border-left"
                        type="number"
                        value="${parseFloat(styles.borderLeftWidth) || 0}"
                        data-box-property="borderLeftWidth"
                    >


                    <!-- PADDING -->

                    <div class="devstyle-box-layer devstyle-padding-layer">

                        <span class="devstyle-layer-label">
                            Padding
                        </span>


                        <input
                            class="box-input box-padding-top"
                            type="number"
                            value="${parseFloat(styles.paddingTop) || 0}"
                            data-box-property="paddingTop"
                        >


                        <input
                            class="box-input box-padding-right"
                            type="number"
                            value="${parseFloat(styles.paddingRight) || 0}"
                            data-box-property="paddingRight"
                        >


                        <input
                            class="box-input box-padding-bottom"
                            type="number"
                            value="${parseFloat(styles.paddingBottom) || 0}"
                            data-box-property="paddingBottom"
                        >


                        <input
                            class="box-input box-padding-left"
                            type="number"
                            value="${parseFloat(styles.paddingLeft) || 0}"
                            data-box-property="paddingLeft"
                        >


                        <!-- CONTENT -->

                        <div class="devstyle-box-content">

                            <span>
                                Content
                            </span>

                            <strong>
                                ${Math.round(element.getBoundingClientRect().width)}
                                ×
                                ${Math.round(element.getBoundingClientRect().height)}
                            </strong>

                        </div>

                    </div>

                </div>

            </div>


            <!-- =================================================
                 BOX INFO
            ================================================= -->

            <div class="devstyle-box-model-info">

                <div>
                    <span>
                        Content Width
                    </span>

                    <strong>
                        ${Math.round(
            parseFloat(styles.width) || 0
        )}px
                    </strong>
                </div>


                <div>
                    <span>
                        Content Height
                    </span>

                    <strong>
                        ${Math.round(
            parseFloat(styles.height) || 0
        )}px
                    </strong>
                </div>


                <div>
                    <span>
                        Box Sizing
                    </span>

                    <strong>
                        ${styles.boxSizing}
                    </strong>
                </div>

            </div>

        </div>

    `;
}
// =====================================================
// MOVE STATE
// =====================================================

let movingElement = false;

let moveOverlay = null;

let movePointerId = null;

let moveStartMouseX = 0;

let moveStartMouseY = 0;

let moveStartLeft = 0;

let moveStartTop = 0;
// =====================================================
// RESIZE STATE
// =====================================================

let resizingElement = false;

let resizeOverlay = null;

let resizePointerId = null;

let resizeDirection = null;

let resizeStartMouseX = 0;
let resizeStartMouseY = 0;

let resizeStartWidth = 0;
let resizeStartHeight = 0;

let resizeStartLeft = 0;
let resizeStartTop = 0;
// =====================================================
// START MOVE MODE
// =====================================================

function startElementMove(element) {

    if (movingElement) {
        return;
    }


    // Root elements should not be moved.
    if (
        element === document.body ||
        element === document.documentElement
    ) {
        return;
    }


    movingElement = true;


    const styles =
        getComputedStyle(element);


    // Static elements cannot respond to
    // top / left, so use relative positioning.
    if (
        styles.position === "static"
    ) {

        element.style.position =
            "relative";

        moveStartLeft = 0;

        moveStartTop = 0;

    }

    else {

        moveStartLeft =
            parseFloat(styles.left) || 0;

        moveStartTop =
            parseFloat(styles.top) || 0;

    }


    createMoveOverlay(element);


    const button =
        document.getElementById(
            "devstyle-move-button"
        );


    if (button) {

        button.textContent =
            "Drag the highlighted element";

        button.classList.add(
            "is-moving"
        );

    }


    const status =
        document.getElementById(
            "devstyle-move-status"
        );


    if (status) {

        status.textContent =
            "Press and drag the highlighted area.";

    }

}


// =====================================================
// CREATE MOVE OVERLAY
// =====================================================

function createMoveOverlay(element) {

    removeMoveOverlay();


    moveOverlay =
        document.createElement("div");


    moveOverlay.id =
        "devstyle-move-overlay";


    // Very important:
    // allow the overlay to receive pointer events.
    moveOverlay.style.pointerEvents =
        "auto";


    moveOverlay.style.cursor =
        "move";


    document.documentElement
        .appendChild(moveOverlay);


    updateMoveOverlay(element);


    // Pointer Events are much more reliable
    // than the previous mouse implementation.
    moveOverlay.addEventListener(
        "pointerdown",
        startPointerDrag
    );

}


// =====================================================
// POSITION OVERLAY
// =====================================================

function updateMoveOverlay(element) {

    if (!moveOverlay) {
        return;
    }


    const rect =
        element.getBoundingClientRect();


    moveOverlay.style.left =
        `${rect.left}px`;


    moveOverlay.style.top =
        `${rect.top}px`;


    moveOverlay.style.width =
        `${rect.width}px`;


    moveOverlay.style.height =
        `${rect.height}px`;

}


// =====================================================
// START POINTER DRAG
// =====================================================
// =====================================================
// START POINTER DRAG
// =====================================================

function startPointerDrag(event) {

    if (!movingElement) {
        return;
    }


    event.preventDefault();
    event.stopPropagation();


    // ==========================================
    // GET CURRENT ELEMENT POSITION
    // EVERY DRAG STARTS FROM HERE
    // ==========================================

    const styles =
        getComputedStyle(
            selectedElement
        );


    moveStartLeft =
        parseFloat(styles.left) || 0;


    moveStartTop =
        parseFloat(styles.top) || 0;


    // ==========================================
    // GET MOUSE POSITION FOR THIS DRAG
    // ==========================================

    moveStartMouseX =
        event.clientX;


    moveStartMouseY =
        event.clientY;


    movePointerId =
        event.pointerId;


    // ==========================================
    // POINTER CAPTURE
    // ==========================================

    try {

        moveOverlay.setPointerCapture(
            event.pointerId
        );

    } catch (error) {

        console.warn(
            "Pointer capture unavailable:",
            error
        );

    }


    // ==========================================
    // LISTEN FOR THIS DRAG
    // ==========================================

    moveOverlay.addEventListener(
        "pointermove",
        handlePointerMove
    );


    moveOverlay.addEventListener(
        "pointerup",
        finishPointerDrag
    );


    moveOverlay.addEventListener(
        "pointercancel",
        finishPointerDrag
    );


    document.body.style.userSelect =
        "none";


    updateMoveStatus(
        moveStartLeft,
        moveStartTop
    );

}
// =====================================================
// HANDLE DRAG
// =====================================================

function handlePointerMove(event) {

    if (
        !movingElement ||
        event.pointerId !== movePointerId ||
        !selectedElement
    ) {
        return;
    }


    event.preventDefault();


    const deltaX =
        event.clientX -
        moveStartMouseX;


    const deltaY =
        event.clientY -
        moveStartMouseY;


    const newLeft =
        moveStartLeft +
        deltaX;


    const newTop =
        moveStartTop +
        deltaY;


    selectedElement.style.left =
        `${Math.round(newLeft)}px`;


    selectedElement.style.top =
        `${Math.round(newTop)}px`;


    updateMoveOverlay(
        selectedElement
    );


    updateMoveStatus(
        newLeft,
        newTop
    );

}


// =====================================================
// UPDATE MOVE STATUS
// =====================================================

function updateMoveStatus(
    left,
    top
) {

    const status =
        document.getElementById(
            "devstyle-move-status"
        );


    if (!status) {
        return;
    }


    status.textContent =
        `X: ${Math.round(left)}px   Y: ${Math.round(top)}px`;

}


// =====================================================
// FINISH POINTER DRAG
// =====================================================

function finishPointerDrag(event) {

    if (
        !movingElement ||
        event.pointerId !== movePointerId
    ) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();


    // -----------------------------------------
    // RELEASE POINTER CAPTURE
    // -----------------------------------------

    if (moveOverlay) {

        try {

            moveOverlay.releasePointerCapture(
                event.pointerId
            );

        } catch (error) {

            // Pointer may already be released.
        }


        moveOverlay.removeEventListener(
            "pointermove",
            handlePointerMove
        );

        moveOverlay.removeEventListener(
            "pointerup",
            finishPointerDrag
        );

        moveOverlay.removeEventListener(
            "pointercancel",
            finishPointerDrag
        );

    }


    // -----------------------------------------
    // GET FINAL POSITION
    // -----------------------------------------

    if (selectedElement) {

        const styles =
            getComputedStyle(
                selectedElement
            );

        const finalLeft =
            parseFloat(styles.left) || 0;

        const finalTop =
            parseFloat(styles.top) || 0;


        console.log(
            "Final position:",
            finalLeft,
            finalTop
        );

    }


    // -----------------------------------------
    // EXIT MOVE MODE
    // IMPORTANT
    // This removes the blue overlay.
    // -----------------------------------------

    stopElementMove();

}

// =====================================================
// EXIT MOVE MODE
// =====================================================

function stopElementMove() {

    movingElement = false;

    movePointerId = null;

    document.body.style.userSelect = "";

    removeMoveOverlay();

    const button =
        document.getElementById(
            "devstyle-move-button"
        );

    if (button) {
        button.textContent =
            "↔ Move Element";

        button.classList.remove(
            "is-moving"
        );
    }

}

// =====================================================
// REMOVE OVERLAY
// =====================================================

function removeMoveOverlay() {

    if (!moveOverlay) {
        return;
    }


    moveOverlay.remove();

    moveOverlay =
        null;

}
// =====================================================
// RESIZE STATE
// =====================================================



// =====================================================
// START RESIZE
// =====================================================

function startElementResize(element) {

    if (
        !element ||
        element === document.body ||
        element === document.documentElement
    ) {
        return;
    }

    if (movingElement) {
        stopElementMove();
    }

    if (resizingElement) {
        return;
    }

    resizingElement = true;

    createResizeOverlay(element);


    const button =
        document.getElementById(
            "devstyle-resize-button"
        );

    if (button) {

        button.textContent =
            "↗ Resizing...";

        button.classList.add(
            "is-resizing"
        );

    }

}


// =====================================================
// CREATE RESIZE OVERLAY
// =====================================================

function createResizeOverlay(element) {

    removeResizeOverlay();


    resizeOverlay =
        document.createElement("div");

    resizeOverlay.id =
        "devstyle-resize-overlay";


    document.documentElement
        .appendChild(resizeOverlay);


    updateResizeOverlay(element);


    const directions = [
        "nw",
        "ne",
        "sw",
        "se"
    ];


    directions.forEach(
        direction => {

            const handle =
                document.createElement(
                    "div"
                );

            handle.className =
                `devstyle-resize-handle handle-${direction}`;

            handle.dataset.direction =
                direction;


            handle.addEventListener(
                "pointerdown",
                startResizeDrag
            );


            resizeOverlay.appendChild(
                handle
            );

        }
    );

}


// =====================================================
// UPDATE RESIZE OVERLAY
// =====================================================

function updateResizeOverlay(element) {

    if (!resizeOverlay) {
        return;
    }


    const rect =
        element.getBoundingClientRect();


    resizeOverlay.style.left =
        `${rect.left}px`;

    resizeOverlay.style.top =
        `${rect.top}px`;

    resizeOverlay.style.width =
        `${rect.width}px`;

    resizeOverlay.style.height =
        `${rect.height}px`;

}


// =====================================================
// START RESIZE DRAG
// =====================================================

function startResizeDrag(event) {

    if (
        !resizingElement ||
        !selectedElement
    ) {
        return;
    }


    event.preventDefault();

    event.stopPropagation();


    const rect =
        selectedElement.getBoundingClientRect();


    resizeDirection =
        event.currentTarget.dataset.direction;


    resizeStartMouseX =
        event.clientX;

    resizeStartMouseY =
        event.clientY;


    resizeStartWidth =
        rect.width;

    resizeStartHeight =
        rect.height;


    resizePointerId =
        event.pointerId;


    try {

        event.currentTarget.setPointerCapture(
            event.pointerId
        );

    } catch (error) {

        console.warn(
            "Resize pointer capture unavailable:",
            error
        );

    }


    event.currentTarget.addEventListener(
        "pointermove",
        handleResizeDrag
    );


    event.currentTarget.addEventListener(
        "pointerup",
        finishResizeDrag
    );


    event.currentTarget.addEventListener(
        "pointercancel",
        finishResizeDrag
    );


    document.body.style.userSelect =
        "none";

}


// =====================================================
// HANDLE RESIZE DRAG
// =====================================================

function handleResizeDrag(event) {

    if (
        !resizingElement ||
        !selectedElement ||
        event.pointerId !== resizePointerId
    ) {
        return;
    }


    event.preventDefault();


    const deltaX =
        event.clientX -
        resizeStartMouseX;


    const deltaY =
        event.clientY -
        resizeStartMouseY;


    let newWidth =
        resizeStartWidth;


    let newHeight =
        resizeStartHeight;


    // Right-side movement

    if (
        resizeDirection === "se" ||
        resizeDirection === "ne"
    ) {

        newWidth =
            resizeStartWidth +
            deltaX;

    }


    // Left-side movement

    if (
        resizeDirection === "sw" ||
        resizeDirection === "nw"
    ) {

        newWidth =
            resizeStartWidth -
            deltaX;

    }


    // Bottom-side movement

    if (
        resizeDirection === "se" ||
        resizeDirection === "sw"
    ) {

        newHeight =
            resizeStartHeight +
            deltaY;

    }


    // Top-side movement

    if (
        resizeDirection === "ne" ||
        resizeDirection === "nw"
    ) {

        newHeight =
            resizeStartHeight -
            deltaY;

    }


    // Minimum size

    newWidth =
        Math.max(
            20,
            newWidth
        );


    newHeight =
        Math.max(
            20,
            newHeight
        );


    // Apply

    selectedElement.style.width =
        `${Math.round(newWidth)}px`;


    selectedElement.style.height =
        `${Math.round(newHeight)}px`;


    updateResizeOverlay(
        selectedElement
    );

}


// =====================================================
// FINISH RESIZE
// =====================================================

function finishResizeDrag(event) {

    if (
        event.pointerId !== resizePointerId
    ) {
        return;
    }


    event.preventDefault();

    event.stopPropagation();


    const handle =
        event.currentTarget;


    try {

        handle.releasePointerCapture(
            event.pointerId
        );

    } catch (error) {
        // Already released.
    }


    handle.removeEventListener(
        "pointermove",
        handleResizeDrag
    );


    handle.removeEventListener(
        "pointerup",
        finishResizeDrag
    );


    handle.removeEventListener(
        "pointercancel",
        finishResizeDrag
    );


    resizePointerId =
        null;


    document.body.style.userSelect =
        "";


    stopElementResize();

}


// =====================================================
// STOP RESIZE
// =====================================================

function stopElementResize() {

    resizingElement =
        false;

    resizePointerId =
        null;

    resizeDirection =
        null;


    document.body.style.userSelect =
        "";


    removeResizeOverlay();


    const button =
        document.getElementById(
            "devstyle-resize-button"
        );


    if (button) {

        button.textContent =
            "↗ Resize Element";

        button.classList.remove(
            "is-resizing"
        );

    }

}


// =====================================================
// REMOVE RESIZE OVERLAY
// =====================================================

function removeResizeOverlay() {

    if (!resizeOverlay) {
        return;
    }


    resizeOverlay.remove();

    resizeOverlay = null;

}