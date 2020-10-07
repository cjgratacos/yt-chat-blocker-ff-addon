(function() {
    async function setup() {
         // Lets query the chat frame
        var yt_frame = document.querySelectorAll('ytd-live-chat-frame');
        // If something is found, lets remove it
        if(yt_frame.length) {
            await browser.storage.local.get('yt_chat_blocker')
                .then((res) => {
                    if (res.yt_chat_blocker) {
                        yt_frame.forEach(function(element){
                            // remove element
                            element.style.display = 'none';
                        });
                    }
            });
        }
    }

    async function handleChange(change) {
        if (change.yt_chat_blocker != undefined) {
            var value = change.yt_chat_blocker.newValue != undefined 
                && change.yt_chat_blocker.newValue != null ? 
                    change.yt_chat_blocker.newValue : 
                    !!change.yt_chat_blocker.oldValue;
            // Lets query the chat frame
            var yt_frame = document.querySelectorAll('ytd-live-chat-frame');
            // If something is found, lets remove it
            yt_frame.forEach(function(element){
                // removing element
                element.style.display = value ? 'none' : null;
            });
        }
    }

    var yt_chat_blocker = new MutationObserver(setup);

    yt_chat_blocker.observe(document.querySelector('body'), {
        childList: true,
        subtree: true,
    });

    browser.storage.onChanged.addListener(async (changes, areaName) => {
        if (areaName == 'local') {
            await handleChange(changes);
        }
    });
})();
