
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
];


function showRandomQuote() {
  if (quotes.length === 0) {
      alert("No quotes available!");
      return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerText = `"${randomQuote.text}" - ${randomQuote.category}`;
}


function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (!quoteText || !quoteCategory) {
      alert("Please provide both a quote and a category.");
      return;
  }

  const newQuote = { text: quoteText, category: quoteCategory };
  quotes.push(newQuote);

  alert("Quote added successfully!");
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}


document.getElementById("newQuote").addEventListener("click", showRandomQuote);
