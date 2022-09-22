//move to short link

function moveToShortApp() {
    document.getElementById('shortening').scrollIntoView();
}

//hamburger nav toggle
var navToggle = false;
const mobileNavContainer = document.querySelector(".mobile-navbar-container");
const mobileNav = document.querySelector(".mobile-navbar");

window.onresize = function () {
    if (!navToggle || window.innerWidth > 768) {
        mobileNavContainer.style.display = "none";
        mobileNav.style.display = "none";
    }
    if (navToggle && window.innerWidth < 768) {
        mobileNavContainer.style.display = "block";
        mobileNav.style.display = "block";
    }
};

document.querySelector(".mobile-menu-icon").addEventListener("click", () => {
    if (!navToggle) {
        navToggle = true;
        mobileNavContainer.style.display = "block";
        mobileNav.style.display = "block";

    } else {
        navToggle = false;
        mobileNavContainer.style.display = "none";
        mobileNav.style.display = "none";
    }
});

//call API short link
document.querySelector(".shorten-btn").addEventListener("click", async () => {
    const shortenInput = document.querySelector(".shortening-input");
    const originalInput = shortenInput.value;
    const shortenAPI = `https://api.shrtco.de/v2/shorten?url=${originalInput}`;
    const error = document.querySelector(".error");

    try {
        const res = await fetch(shortenAPI)
        const shortenLink = await res.json();
        const result = shortenLink.result.full_short_link;

        addLinkItem(originalInput, result);

        shortenInput.style.border = "none";
        error.style.display = "none";

        shortenInput.value = "";
    } catch (err) {

        shortenInput.style.border = "3px solid #eb5858";
        error.style.display = "inline-block";

    }
});

function addLinkItem(original, shorten) {
    const shortenList = document.querySelector(".shorten-list");
    const listItem = document.createElement("li");
    const enteredLink = document.createElement("p");
    const copyDiv = document.createElement("div");
    const shortenLink = document.createElement("a");
    const copyBtn = document.createElement("button");

    listItem.classList.add("list-item");
    enteredLink.classList.add("entered-link");
    copyDiv.classList.add("copy-div");
    shortenLink.classList.add("shorten-link");
    copyBtn.classList.add("copy-btn");

    if (original.length > 65) {
        enteredLink.textContent = String(original).substring(0, 50) + "...";
    } else {
        enteredLink.textContent = String(original)
    }
    shortenLink.textContent = shorten;
    copyBtn.textContent = "Copy";
    shortenLink.setAttribute("href", original);

    shortenList.appendChild(listItem);
    listItem.appendChild(enteredLink);
    listItem.appendChild(copyDiv);
    copyDiv.appendChild(shortenLink);
    copyDiv.appendChild(copyBtn);

    copyBtn.addEventListener("click", (e) => {
        const copiedLink = e.target.previousElementSibling.textContent;

        navigator.clipboard.writeText(copiedLink);

        e.target.style.backgroundColor = "var(--Dark-Violet)";
        e.target.textContent = "Copied!";

        setTimeout(() => {
            e.target.style.backgroundColor = "var(--Cyan)";
            e.target.textContent = "Copy";
        }, 3000);
    });
}