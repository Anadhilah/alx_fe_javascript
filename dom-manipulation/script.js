
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you are busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
];


function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
  
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));

    
    quoteDisplay.innerHTML = `<p><strong>${randomQuote.category}:</strong> ${randomQuote.text}</p>`;
}


document.getElementById("newQuote").addEventListener("click", showRandomQuote);


function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();
    
    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    localStorage.setItem("quotes", JSON.stringify(quotes));

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("New quote added successfully!");
}


function exportToJsonFile() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(quotes));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "quotes.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor); 
}


function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) {
        alert("Please select a valid JSON file.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes = [...quotes, ...importedQuotes];
                localStorage.setItem("quotes", JSON.stringify(quotes));
                alert("Quotes imported successfully!");
            } else {
                alert("Invalid JSON file format. Please use an array of quotes.");
            }
        } catch (error) {
            alert("Error parsing JSON file. Please check the file format.");
        }
    };
    reader.readAsText(file);
}


document.getElementById("importQuotesFile").addEventListener("change", importFromJsonFile);
