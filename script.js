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
