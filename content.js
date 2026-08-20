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
// CREATE HIGHLIGHT BOX
// =====================================================

function createHighlight() {

    if (highlight) {
        return;
    }

    highlight =
        document.createElement("div");

    highlight.id =
        "devstyle-highlight";

    document.body.appendChild(highlight);

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


    // Don't highlight our own UI

    if (
        element === highlight ||
        panel?.contains(element)
    ) {
        return;
    }


    // Ignore HTML/body

    if (
        element === document.documentElement ||
        element === document.body
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
// CLICK ELEMENT
// =====================================================

function handleElementClick(event) {

    if (!inspecting) {
        return;
    }


    const element =
        event.target;


    // Don't select our panel

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


    // Stop website from receiving this click

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


    const styles =
        getComputedStyle(element);


    panel =
        document.createElement("div");


    panel.id =
        "devstyle-panel";


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

            ${element.id
                ? "#" + element.id
                : ""}

            ${element.className &&
              typeof element.className === "string"
                ? "." +
                  element.className
                    .trim()
                    .replace(/\s+/g, ".")
                : ""}

        </div>


        <!-- SIZE -->

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


        <!-- POSITION -->

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


        <!-- TYPOGRAPHY -->

        <div class="devstyle-group">

            <div class="devstyle-group-title">
                Typography
            </div>


            ${createNumberField(
                "Font Size",
                "fontSize",
                parseFloat(styles.fontSize)
            )}


            ${createNumberField(
                "Font Weight",
                "fontWeight",
                parseInt(styles.fontWeight)
            )}


            <div class="devstyle-field">

                <label>
                    Font Color
                </label>

                <div class="devstyle-input-row">

                    <input
                        type="color"
                        id="devstyle-color"
                        value="${rgbToHex(styles.color)}"
                    >

                    <input
                        type="text"
                        id="devstyle-color-text"
                        value="${rgbToHex(styles.color)}"
                    >

                </div>

            </div>

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


    document.body.appendChild(panel);


    setupControls(element);

}


// =====================================================
// CREATE NUMBER INPUT
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
                    value="${isNaN(value) ? 0 : value}"
                    data-property="${property}"
                >

                <input
                    type="text"
                    value="px"
                    disabled
                    style="
                        max-width:45px;
                        text-align:center;
                        opacity:.6;
                    "
                >

            </div>

        </div>

    `;

}


// =====================================================
// SETUP CONTROLS
// =====================================================

function setupControls(element) {


    // Number fields

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


                // Position properties

                if (
                    property === "left" ||
                    property === "top"
                ) {

                    // Make position usable

                    if (
                        getComputedStyle(
                            element
                        ).position === "static"
                    ) {

                        element.style.position =
                            "relative";

                    }

                }


                // Font weight doesn't use px

                if (
                    property === "fontWeight"
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


    // Color picker

    const colorInput =
        document.getElementById(
            "devstyle-color"
        );


    const colorText =
        document.getElementById(
            "devstyle-color-text"
        );


    colorInput.addEventListener(
        "input",
        () => {

            element.style.color =
                colorInput.value;

            colorText.value =
                colorInput.value;

        }
    );


    colorText.addEventListener(
        "input",
        () => {

            if (
                /^#[0-9A-F]{6}$/i.test(
                    colorText.value
                )
            ) {

                element.style.color =
                    colorText.value;

                colorInput.value =
                    colorText.value;

            }

        }
    );


    // Close

    document
        .getElementById("devstyle-close")
        .addEventListener(
            "click",
            () => {

                removePanel();

            }
        );


    // Copy

    document
        .getElementById("devstyle-copy")
        .addEventListener(
            "click",
            () => {

                copyChangedCSS(
                    element
                );

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