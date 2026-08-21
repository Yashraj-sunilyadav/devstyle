let inspecting = false;

let selectedElement = null;

let highlight = null;

let panel = null;

let panelDragging = false;

let dragStartX = 0;

let dragStartY = 0;

let panelStartLeft = 0;

let panelStartTop = 0;


// =====================================================
// CSS PROPERTY CONFIGURATION
// =====================================================

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
    ,{
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

    removePanel();


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


    document.documentElement
        .appendChild(panel);


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

function renderCategories(element) {

    return categories
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

}


// =====================================================
// RENDER PROPERTY
// =====================================================

function renderProperty(
    element,
    property
) {

    const styles =
        getComputedStyle(element);


    const value =
        styles[property.property];


    const searchText =
        property.label.toLowerCase();


    // -----------------------------------------
    // NUMBER
    // -----------------------------------------

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
                            Number.isNaN(
                                numericValue
                            )
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


    // -----------------------------------------
    // TEXT
    // -----------------------------------------

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


    // -----------------------------------------
    // COLOR
    // -----------------------------------------

    if (property.type === "color") {

        const hex =
            rgbToHex(value);


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


    // -----------------------------------------
    // FONT
    // -----------------------------------------

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
                                    currentFont
                                        .toLowerCase() ===
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


    // -----------------------------------------
    // SELECT
    // -----------------------------------------

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

if (property.type === "boxModel") {

    const styles = getComputedStyle(element);

    return createBoxModelEditor(element, styles);

}
    return "";



}


// =====================================================
// SETUP PANEL
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

}


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
    // -----------------------------------------

    panel
        .querySelectorAll(
            'input[type="number"]'
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
        // ==========================================
// BOX MODEL INPUTS
// ==========================================

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

function removePanel() {

    if (!panel) {
        return;
    }


    stopDragging();


    panel.remove();


    panel = null;


    selectedElement = null;

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

    return `

        <div class="devstyle-box-model">

            <!--
                MARGIN
            -->

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
                                ${Math.round(element.getBoundingClientRect().width)} ×
                                ${Math.round(element.getBoundingClientRect().height)}
                            </strong>

                        </div>

                    </div>

                </div>

            </div>


            <div class="devstyle-box-model-info">

                <div>
                    <span>Content Width</span>
                    <strong>
                        ${Math.round(
                            parseFloat(styles.width) || 0
                        )}px
                    </strong>
                </div>

                <div>
                    <span>Content Height</span>
                    <strong>
                        ${Math.round(
                            parseFloat(styles.height) || 0
                        )}px
                    </strong>
                </div>

                <div>
                    <span>Box Sizing</span>
                    <strong>
                        ${styles.boxSizing}
                    </strong>
                </div>

            </div>

        </div>

    `;
}