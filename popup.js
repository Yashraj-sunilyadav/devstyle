const inspectButton =
    document.getElementById("inspectBtn");


inspectButton.addEventListener(
    "click",
    async () => {

        const [tab] =
            await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

        if (!tab || !tab.id) {
            return;
        }

        try {

            await chrome.tabs.sendMessage(
                tab.id,
                {
                    type: "START_INSPECT"
                }
            );

            window.close();

        } catch (error) {

            console.error(
                "Could not start inspector:",
                error
            );

        }

    }
);