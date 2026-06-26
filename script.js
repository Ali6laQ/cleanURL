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

    if(isTikTokNow) {
        insureTiktokLinkesLong(urlValue).then(longLink => {
            cleanedLinkPlace.value = cleanLink(longLink);
            myModal.classList.remove('hidden');
        }).catch(error => {
            console.log(error);
        });
    }
    else if(isInstagramNow) {
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

async function insureTiktokLinkesLong(rawLink) {
    if (rawLink.includes("vt.tiktok.com") || rawLink.includes("vm.tiktok.com")) {
        try {
            let response = await fetch(`https://unshorten.me/s/${rawLink}`);
            let longLink = await response.text(); 
            return longLink; 
            
        } catch (error) {
            console.log("تعذر فك الرابط! ❌");
            throw error;
        }
    }
    return rawLink;
}