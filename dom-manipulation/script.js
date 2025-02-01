
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
];

function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    
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

    
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("New quote added successfully!");
}
