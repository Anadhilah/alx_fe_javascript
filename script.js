const API_URL = "https://jsonplaceholder.typicode.com/posts";


let quotes = JSON.parse(localStorage.getItem("quotes")) || [];


function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}


async function fetchServerQuotes() {
    try {
        const response = await fetch(API_URL);
        const serverQuotes = await response.json();

        if (!Array.isArray(serverQuotes)) return;

        let newQuotesAdded = false;
        serverQuotes.forEach(serverQuote => {
            const existsLocally = quotes.some(q => q.text === serverQuote.title);
            if (!existsLocally) {
                quotes.push({ text: serverQuote.title, category: "General" }); 
                newQuotesAdded = true;
            }
        });

        if (newQuotesAdded) {
            saveQuotes();
            populateCategories();
            showNotification("New quotes synced from the server!");
        }
    } catch (error) {
        console.error("Error fetching server quotes:", error);
    }
}


async function syncLocalQuotes() {
    try {
        const unsyncedQuotes = quotes.filter(q => !q.synced);
        for (const quote of unsyncedQuotes) {
            const response = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify({ title: quote.text, category: quote.category }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                quote.synced = true; 
            }
        }
        saveQuotes();
    } catch (error) {
        console.error("Error syncing local quotes:", error);
    }
}


function showNotification(message) {
    const notification = document.createElement("div");
    notification.innerText = message;
    notification.style.position = "fixed";
    notification.style.bottom = "10px";
    notification.style.right = "10px";
    notification.style.backgroundColor = "lightblue";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}


function showRandomQuote() {
    if (quotes.length === 0) {
        alert("No quotes available!");
        return;
    }
    filterQuotes();
}


function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (!quoteText || !quoteCategory) {
        alert("Please provide both a quote and a category.");
        return;
    }

    const newQuote = { text: quoteText, category: quoteCategory, synced: false };
    quotes.push(newQuote);
    saveQuotes();

    showNotification("Quote added locally! Syncing with the server...");
    syncLocalQuotes(); 
}


setInterval(fetchServerQuotes, 30000);
setInterval(syncLocalQuotes, 30000);


window.onload = function () {
    fetchServerQuotes();
    populateCategories();
    showRandomQuote();
};
