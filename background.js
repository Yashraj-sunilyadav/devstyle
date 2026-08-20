chrome.commands.onCommand.addListener(async (command) => {

    if (command !== "start-inspector") {
        return;
    }

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    if (!tab || !tab.id) {
        return;
    }

    try {

        await chrome.tabs.sendMessage(tab.id, {
            type: "START_INSPECT"
        });

    } catch (error) {

        console.error(
            "DevStyle shortcut error:",
            error
        );

    }

});