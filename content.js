let inspecting = false;
let selectedElement = null;
let highlight = null;
let panel = null;


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
                type: "number"
            },
            {
                label: "Height",
                property: "height",
                type: "number"
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
                type: "number"
            },
            {
                label: "Right",
                property: "right",
                type: "number"
            },
            {
                label: "Bottom",
                property: "bottom",
                type: "number"
            },
            {
                label: "Left",
                property: "left",
                type: "number"
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
                type: "number"
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
                type: "number"
            },
            {
                label: "Letter Spacing",
                property: "letterSpacing",
                type: "number"
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
                type: "number"
            },
            {
                label: "Border Radius",
                property: "borderRadius",
                type: "number"
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
                type: "number"
            },
            {
                label: "Padding",
                property: "padding",
                type: "number"
            },
            {
                label: "Gap",
                property: "gap",
                type: "number"
            }
        ]
    }
];


// =====================================================
// MESSAGE FROM POPUP
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
// CREATE HIGHLIGHT
// =====================================================

function createHighlight() {

    if (highlight) {
        return;
    }

    highlight = document.createElement("div");

    highlight.id = "devstyle-highlight";

    document.documentElement.appendChild(highlight);

}


// =====================================================
// MOUSE MOVE
// =====================================================

function handleMouseMove(event) {

    if (!inspecting) {
        return;
    }

    const element = event.target;

    if (
        element === highlight ||
        panel?.contains(element)
    ) {
        return;
    }

    if (!(element instanceof Element)) {
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
// CLICK ELEMENT
// =====================================================

function handleElementClick(event) {

    if (!inspecting) {
        return;
    }

    const element = event.target;

    if (
        element === highlight ||
        panel?.contains(element)
    ) {
        return;
    }

    if (!(element instanceof Element)) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    selectedElement = element;

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

    const styles =
        getComputedStyle(element);

    panel =
        document.createElement("div");

    panel.id =
        "devstyle-panel";


    panel.innerHTML = `

        <div class="devstyle-header">

            <div>

                <div class="devstyle-title">
                    DevStyle
                </div>

                <div class="devstyle-element">
                    ${getElementName(element)}
                </div>

            </div>

            <button
                class="devstyle-close"
                id="devstyle-close"
            >
                ×
            </button>

        </div>


        <div class="devstyle-search">

            <span>⌕</span>

            <input
                type="text"
                id="devstyle-search-input"
                placeholder="Search CSS property..."
            >

        </div>


        <div
            id="devstyle-categories"
            class="devstyle-categories"
        >

            ${renderCategories(element)}

        </div>


        <button
            class="devstyle-copy"
            id="devstyle-copy"
        >
            Copy CSS
        </button>


        <div
            class="devstyle-status"
            id="devstyle-status"
        >
            Changes are applied instantly
        </div>

    `;


    document.documentElement.appendChild(panel);

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
        element.className &&
        typeof element.className === "string"
    ) {

        const classes =
            element.className
                .trim()
                .split(/\s+/)
                .slice(0, 2);

        if (classes.length) {

            name +=
                ` .${classes.join(".")}`;

        }

    }

    return escapeHTML(name);

}


// =====================================================
// RENDER CATEGORIES
// =====================================================

function renderCategories(element) {

    return categories
        .map((category, index) => {

            return `

                <div
                    class="devstyle-category"
                    data-category="${category.id}"
                >

                    <button
                        class="devstyle-category-header"
                        data-category-toggle="${category.id}"
                    >

                        <span>

                            <span class="devstyle-category-icon">
                                ${category.icon}
                            </span>

                            ${category.name}

                        </span>

                        <span class="devstyle-arrow">
                            ${index === 0 ? "⌃" : "⌄"}
                        </span>

                    </button>


                    <div
                        class="devstyle-category-content"
                        data-category-content="${category.id}"
                        style="
                            display:
                            ${index === 0
                                ? "block"
                                : "none"};
                        "
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

                </div>

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


    if (property.type === "number") {

        let numericValue =
            parseFloat(value);

        if (isNaN(numericValue)) {
            numericValue = 0;
        }

        const unit =
            property.unit === ""
                ? ""
                : "px";

        return `

            <div
                class="devstyle-field"
                data-property-search="${property.label.toLowerCase()}"
            >

                <label>
                    ${property.label}
                </label>

                <div class="devstyle-input-row">

                    <input
                        type="number"
                        value="${numericValue}"
                        data-property="${property.property}"
                    >

                    <span class="devstyle-unit">
                        ${unit}
                    </span>

                </div>

            </div>

        `;

    }


    if (property.type === "color") {

        const hex =
            rgbToHex(value);


        return `

            <div
                class="devstyle-field"
                data-property-search="${property.label.toLowerCase()}"
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


    if (property.type === "font") {

        const fonts = [
            "Arial",
            "Inter",
            "Roboto",
            "Poppins",
            "Helvetica",
            "Georgia",
            "Times New Roman",
            "Courier New",
            "Verdana",
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
                data-property-search="${property.label.toLowerCase()}"
            >

                <label>
                    ${property.label}
                </label>

                <select
                    data-property="${property.property}"
                >

                    ${fonts
                        .map(font => {

                            return `
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
                            `;

                        })
                        .join("")}

                </select>

            </div>

        `;

    }


    if (property.type === "select") {

        const currentValue =
            value;


        return `

            <div
                class="devstyle-field"
                data-property-search="${property.label.toLowerCase()}"
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
                                        currentValue === option
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


    return "";

}


// =====================================================
// SETUP PANEL
// =====================================================

function setupPanel(element) {

    setupCategoryToggles();

    setupPropertyInputs(element);

    setupSearch();

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
            () => copyChangedCSS(element)
        );

}


// =====================================================
// CATEGORY TOGGLES
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

                const category =
                    header.dataset.categoryToggle;


                const contents =
                    panel.querySelectorAll(
                        "[data-category-content]"
                    );


                const arrows =
                    panel.querySelectorAll(
                        ".devstyle-arrow"
                    );


                contents.forEach(content => {

                    content.style.display =
                        "none";

                });


                arrows.forEach(arrow => {

                    arrow.textContent =
                        "⌄";

                });


                const selectedContent =
                    panel.querySelector(
                        `[data-category-content="${category}"]`
                    );


                const selectedArrow =
                    header.querySelector(
                        ".devstyle-arrow"
                    );


                if (selectedContent) {

                    selectedContent.style.display =
                        "block";

                }


                if (selectedArrow) {

                    selectedArrow.textContent =
                        "⌃";

                }

            }
        );

    });

}


// =====================================================
// PROPERTY INPUTS
// =====================================================

function setupPropertyInputs(element) {


    // ==========================================
    // NUMBER INPUTS
    // ==========================================

    const numberInputs =
        panel.querySelectorAll(
            'input[type="number"]'
        );


    numberInputs.forEach(input => {

        input.addEventListener(
            "input",
            () => {

                const property =
                    input.dataset.property;

                const value =
                    input.value;


                // Position needs non-static position

                if (
                    [
                        "top",
                        "right",
                        "bottom",
                        "left"
                    ].includes(property)
                ) {

                    const currentPosition =
                        getComputedStyle(
                            element
                        ).position;


                    if (
                        currentPosition ===
                        "static"
                    ) {

                        element.style.position =
                            "relative";

                    }

                }


                // Unitless properties

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


    // ==========================================
    // SELECT INPUTS
    // ==========================================

    const selectInputs =
        panel.querySelectorAll(
            "select[data-property]"
        );


    selectInputs.forEach(select => {

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


    // ==========================================
    // COLOR INPUTS
    // ==========================================

    const colorInputs =
        panel.querySelectorAll(
            'input[type="color"]'
        );


    colorInputs.forEach(colorInput => {

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
                    /^#[0-9A-F]{6}$/i.test(value)
                ) {

                    element.style[property] =
                        value;

                    colorInput.value =
                        value;

                }

            }
        );

    });

}


// =====================================================
// SEARCH
// =====================================================

function setupSearch() {

    const searchInput =
        document.getElementById(
            "devstyle-search-input"
        );


    searchInput.addEventListener(
        "input",
        () => {

            const search =
                searchInput.value
                    .trim()
                    .toLowerCase();


            const fields =
                panel.querySelectorAll(
                    "[data-property-search]"
                );


            const categoriesElements =
                panel.querySelectorAll(
                    ".devstyle-category"
                );


            if (!search) {

                fields.forEach(field => {

                    field.style.display =
                        "block";

                });

                return;

            }


            fields.forEach(field => {

                const propertyName =
                    field.dataset
                        .propertySearch;


                field.style.display =
                    propertyName.includes(search)
                        ? "block"
                        : "none";

            });


            categoriesElements.forEach(category => {

                const visibleFields =
                    category.querySelectorAll(
                        '[data-property-search]:not([style*="display: none"])'
                    );


                const content =
                    category.querySelector(
                        ".devstyle-category-content"
                    );


                if (
                    visibleFields.length > 0
                ) {

                    category.style.display =
                        "block";

                    content.style.display =
                        "block";

                }

                else {

                    category.style.display =
                        "none";

                }

            });

        }
    );

}


// =====================================================
// COPY CSS
// =====================================================

function copyChangedCSS(element) {

    const styles =
        element.style;


    let css = "";


    for (
        let i = 0;
        i < styles.length;
        i++
    ) {

        const property =
            styles[i];


        const value =
            styles.getPropertyValue(
                property
            );


        css +=
            `${property}: ${value};\n`;

    }


    navigator.clipboard
        .writeText(css)
        .then(() => {

            const status =
                document.getElementById(
                    "devstyle-status"
                );


            if (status) {

                status.textContent =
                    "CSS copied!";

                setTimeout(() => {

                    status.textContent =
                        "Changes are applied instantly";

                }, 1500);

            }

        });

}


// =====================================================
// REMOVE PANEL
// =====================================================

function removePanel() {

    if (panel) {

        panel.remove();

        panel = null;

    }

}


// =====================================================
// RGB → HEX
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
            .map(value => {

                return Number(value)
                    .toString(16)
                    .padStart(2, "0");

            })
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