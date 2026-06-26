const linkInput = document.getElementById('linkInput');
linkInput.addEventListener('click', async () => {
    try {
        const copiedText = await navigator.clipboard.readText();
        const isInstagram = copiedText.includes("instagram.com");
        const isTikTok = copiedText.includes("tiktok.com");

        if (linkInput.value === '' && (isInstagram || isTikTok)) {
            linkInput.value = copiedText;
        }
        } catch (error) {
        console.log("تعذر الوصول للحافظة", error);
    }
});

function cleanLink(rawLink) {
    return rawLink.split('?')[0];
}

const myModal = document.getElementById('myModal');
const cleanBtn = document.getElementById('cleanBtn');

cleanBtn.addEventListener('click', () => {
    let urlValue = linkInput.value.trim();
    const isInstagramNow = urlValue.includes("instagram.com");
    const isTikTokNow = urlValue.includes("tiktok.com");
    const cleanedLinkPlace = document.getElementById('cleanedLink');
    if(isInstagramNow || isTikTokNow) {
    cleanedLinkPlace.value = cleanLink(urlValue);
    myModal.classList.remove('hidden');
}
});
