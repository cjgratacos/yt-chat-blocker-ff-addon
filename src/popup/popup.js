(function() {
    async function setup() {
        // Setup first time local storage.
        await browser.storage.local.get('yt_chat_blocker')
            .then((res) => {
                var yt_chat_blocker = res.yt_chat_blocker != undefined ? res.yt_chat_blocker : true;
                return browser.storage.local.set({yt_chat_blocker: yt_chat_blocker});
            });
        // Set Checkbox status
        await browser.storage.local.get('yt_chat_blocker')
            .then((res) => {
                var checkbox = document.querySelector('#blocked');
                // Set value
                checkbox.checked = res.yt_chat_blocker;
                // Add Event listener
                checkbox.addEventListener('change', eventListener);
            });
    }

    async function eventListener() {
        var checkbox = document.querySelector('#blocked');
        await browser.storage.local.set({yt_chat_blocker: checkbox.checked});
    }

    document.addEventListener('DOMContentLoaded', setup);
})();
