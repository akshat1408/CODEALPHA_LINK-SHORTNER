const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(`Cannot find the element ${selector}`);
};

const form = selectElement("form");
const input = selectElement("input");
const result = selectElement(".result");
const hamburger = selectElement(".hamburger");
const navMenu = selectElement(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = input.value;

    shortenUrl(url);
});

async function shortenUrl(url) {
    try {
        const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
        const data = await res.json();
        const newUrl = document.createElement("div");
        newUrl.classList.add("item");
        const rr = data.result.short_link;
        newUrl.innerHTML = `
   <p> ${data.result.short_link}</p><br>
   <button class="newUrl-btn inline-flex text-white bg-yellow-600  text-center border-0 py-1 px-4 text-base focus:outline-none hover:bg-opacity-0 rounded " >Copy</button>
   `;
        result.prepend(newUrl);
        const copyBtn = result.querySelector(".newUrl-btn");
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(rr);
            alert("Copied the text: " + rr);
        });
        input.value = "";
    } catch (err) {
        console.log(err);
    }
}
