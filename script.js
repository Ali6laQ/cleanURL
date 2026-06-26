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

cleanBtn.addEventListener('click', () => { // عند النقر على زر "نظف الرابط"
    let urlValue = linkInput.value.trim();
    const isInstagramNow = urlValue.includes("instagram.com");
    const isTikTokNow = urlValue.includes("tiktok.com");
    const cleanedLinkPlace = document.getElementById('cleanedLink');
    if(isInstagramNow || isTikTokNow) {
    cleanedLinkPlace.value = cleanLink(urlValue);
    myModal.classList.remove('hidden');
}
});

const copyBtn = document.getElementById('copyBtn');
copyBtn.addEventListener('click', async () => {
let linkToCopy = document.getElementById('cleanedLink').value;
try {
        await navigator.clipboard.writeText(linkToCopy);

        const originalText = copyBtn.innerText;
        
        copyBtn.innerText = "تم النسخ";

        copyBtn.classList.remove('bg-purple-100', 'text-purple-600','hover:bg-purple-200');
        copyBtn.classList.add('bg-green-500', 'text-white','hover:bg-green-600');

        setTimeout(() => {
            copyBtn.innerText = originalText;
            
            copyBtn.classList.remove('bg-green-500', 'text-white','hover:bg-green-600');
            copyBtn.classList.add('bg-purple-100', 'text-purple-600','hover:bg-purple-200');
        }, 1000);

    } catch (error) {
        console.log(error);
    }
});

const closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', () => {
    myModal.classList.add('hidden');
});