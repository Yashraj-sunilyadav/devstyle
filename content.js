let inspecting = false;
let selectedElement = null;
let highlight = null;
let panel = null;


// =====================================================
// RECEIVE MESSAGE FROM POPUP
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

    document.body.appendChild(highlight);

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

    if (
        element === document.body ||
        element === document.documentElement
    ) {
        return;
    }

    const rect = element.getBoundingClientRect();

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

    if (
        element === document.body ||
        element === document.documentElement
    ) {
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

    const styles = getComputedStyle(element);

    panel = document.createElement("div");

    panel.id = "devstyle-panel";

    panel.innerHTML = `

        <div class="devstyle-header">

            <div class="devstyle-title">
                DevStyle
            </div>

            <button
                class="devstyle-close"
                id="devstyle-close"
            >
                ×
            </button>

        </div>


        <div class="devstyle-element">

            &lt;${element.tagName.toLowerCase()}&gt;

            ${
                element.id
                    ? "#" + element.id
                    : ""
            }

        </div>


        <!-- ================= SIZE ================= -->

        <div class="devstyle-group">

            <div class="devstyle-group-title">
                Size
            </div>

            ${createNumberField(
                "Width",
                "width",
                parseFloat(styles.width)
            )}

            ${createNumberField(
                "Height",
                "height",
                parseFloat(styles.height)
            )}

        </div>


        <!-- ================= POSITION ================= -->

        <div class="devstyle-group">

            <div class="devstyle-group-title">
                Position
            </div>

            ${createNumberField(
                "Left",
                "left",
                parseFloat(styles.left)
            )}

            ${createNumberField(
                "Top",
                "top",
                parseFloat(styles.top)
            )}

        </div>


        <!-- ================= TYPOGRAPHY ================= -->

        <div class="devstyle-group">

            <div class="devstyle-group-title">
                Typography
            </div>


            <!-- Font Family -->

            <div class="devstyle-field">

                <label>
                    Font Family
                </label>

                <select
                    id="devstyle-font-family"
                >

                    <option value="Arial">
                        Arial
                    </option>

                    <option value="Inter">
                        Inter
                    </option>

                    <option value="Roboto">
                        Roboto
                    </option>

                    <option value="Poppins">
                        Poppins
                    </option>

                    <option value="sans-serif">
                        Sans Serif
                    </option>

                    <option value="serif">
                        Serif
                    </option>

                    <option value="monospace">
                        Monospace
                    </option>

                </select>

            </div>


            <!-- Font Size -->

            ${createNumberField(
                "Font Size",
                "fontSize",
                parseFloat(styles.fontSize)
            )}


            <!-- Font Weight -->

            <div class="devstyle-field">

                <label>
                    Font Weight
                </label>

                <select
                    id="devstyle-font-weight"
                >

                    <option value="100">
                        100 - Thin
                    </option>

                    <option value="200">
                        200 - Extra Light
                    </option>

                    <option value="300">
                        300 - Light
                    </option>

                    <option value="400">
                        400 - Normal
                    </option>

                    <option value="500">
                        500 - Medium
                    </option>

                    <option value="600">
                        600 - Semi Bold
                    </option>

                    <option value="700">
                        700 - Bold
                    </option>

                    <option value="800">
                        800 - Extra Bold
                    </option>

                    <option value="900">
                        900 - Black
                    </option>

                </select>

            </div>


            <!-- Font Color -->

            ${createColorField(
                "Font Color",
                "color",
                rgbToHex(styles.color)
            )}


            <!-- Line Height -->

            ${createNumberField(
                "Line Height",
                "lineHeight",
                parseFloat(styles.lineHeight)
            )}


            <!-- Letter Spacing -->

            ${createNumberField(
                "Letter Spacing",
                "letterSpacing",
                parseFloat(styles.letterSpacing)
            )}

        </div>


        <!-- ================= BACKGROUND ================= -->

        <div class="devstyle-group">

            <div class="devstyle-group-title">
                Background
            </div>

            ${createColorField(
                "Background Color",
                "backgroundColor",
                rgbToHex(styles.backgroundColor)
            )}

        </div>


        <!-- ================= BORDER ================= -->

        <div class="devstyle-group">

            <div class="devstyle-group-title">
                Border
            </div>


            ${createNumberField(
                "Border Width",
                "borderWidth",
                parseFloat(styles.borderWidth)
            )}


            ${createNumberField(
                "Border Radius",
                "borderRadius",
                parseFloat(styles.borderRadius)
            )}


            ${createColorField(
                "Border Color",
                "borderColor",
                rgbToHex(styles.borderColor)
            )}


            <div class="devstyle-field">

                <label>
                    Border Style
                </label>

                <select
                    id="devstyle-border-style"
                >

                    <option value="none">
                        None
                    </option>

                    <option value="solid">
                        Solid
                    </option>

                    <option value="dashed">
                        Dashed
                    </option>

                    <option value="dotted">
                        Dotted
                    </option>

                    <option value="double">
                        Double
                    </option>

                </select>

            </div>

        </div>


        <!-- ================= SPACING ================= -->

        <div class="devstyle-group">

            <div class="devstyle-group-title">
                Spacing
            </div>


            ${createNumberField(
                "Padding",
                "padding",
                parseFloat(styles.padding)
            )}


            ${createNumberField(
                "Margin",
                "margin",
                parseFloat(styles.margin)
            )}

        </div>


        <!-- ================= COPY ================= -->

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


    document.body.appendChild(panel);

    setupControls(element);

}


// =====================================================
// NUMBER FIELD
// =====================================================

function createNumberField(
    label,
    property,
    value
) {

    return `

        <div class="devstyle-field">

            <label>
                ${label}
            </label>

            <div class="devstyle-input-row">

                <input
                    type="number"
                    value="${
                        isNaN(value)
                            ? 0
                            : value
                    }"
                    data-property="${property}"
                >

                <span class="devstyle-unit">
                    px
                </span>

            </div>

        </div>

    `;

}


// =====================================================
// COLOR FIELD
// =====================================================

function createColorField(
    label,
    property,
    value
) {

    return `

        <div class="devstyle-field">

            <label>
                ${label}
            </label>

            <div class="devstyle-input-row">

                <input
                    type="color"
                    data-color-property="${property}"
                    value="${
                        value || "#000000"
                    }"
                >

                <input
                    type="text"
                    data-color-text="${property}"
                    value="${
                        value || "#000000"
                    }"
                >

            </div>

        </div>

    `;

}


// =====================================================
// SETUP CONTROLS
// =====================================================

function setupControls(element) {


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


                // Position

                if (
                    property === "left" ||
                    property === "top"
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
                    property ===
                    "fontWeight"
                ) {

                    element.style[
                        property
                    ] = value;

                }

                else {

                    element.style[
                        property
                    ] = `${value}px`;

                }

            }
        );

    });


    // ==========================================
    // FONT FAMILY
    // ==========================================

    const fontFamily =
        document.getElementById(
            "devstyle-font-family"
        );


    fontFamily.value =
        getComputedStyle(
            element
        ).fontFamily
        .split(",")[0]
        .replace(/"/g, "")
        .trim();


    fontFamily.addEventListener(
        "change",
        () => {

            element.style.fontFamily =
                fontFamily.value;

        }
    );


    // ==========================================
    // FONT WEIGHT
    // ==========================================

    const fontWeight =
        document.getElementById(
            "devstyle-font-weight"
        );


    fontWeight.value =
        getComputedStyle(
            element
        ).fontWeight;


    fontWeight.addEventListener(
        "change",
        () => {

            element.style.fontWeight =
                fontWeight.value;

        }
    );


    // ==========================================
    // BORDER STYLE
    // ==========================================

    const borderStyle =
        document.getElementById(
            "devstyle-border-style"
        );


    borderStyle.value =
        getComputedStyle(
            element
        ).borderStyle;


    borderStyle.addEventListener(
        "change",
        () => {

            element.style.borderStyle =
                borderStyle.value;

        }
    );


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

                element.style[property] =
                    colorInput.value;

                textInput.value =
                    colorInput.value;

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


    // ==========================================
    // CLOSE
    // ==========================================

    document
        .getElementById("devstyle-close")
        .addEventListener(
            "click",
            removePanel
        );


    // ==========================================
    // COPY CSS
    // ==========================================

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