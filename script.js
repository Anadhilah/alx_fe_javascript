
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
];


function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}


function showRandomQuote() {
  if (quotes.length === 0) {
      alert("No quotes available!");
      return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  document.getElementById("quoteDisplay").innerText = `"${randomQuote.text}" - ${randomQuote.category}`;


  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}


window.onload = function () {
  const lastQuote = JSON.parse(sessionStorage.getItem("lastViewedQuote"));
  if (lastQuote) {
      document.getElementById("quoteDisplay").innerText = `"${lastQuote.text}" - ${lastQuote.category}`;
  }
};


function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (!quoteText || !quoteCategory) {
      alert("Please provide both a quote and a category.");
      return;
  }

  const newQuote = { text: quoteText, category: quoteCategory };
  quotes.push(newQuote);
  saveQuotes();

  alert("Quote added successfully!");
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}


function exportToJson() {
  const jsonData = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
      try {
          const importedQuotes = JSON.parse(event.target.result);
          if (!Array.isArray(importedQuotes)) {
              alert("Invalid JSON format!");
              return;
          }
          quotes.push(...importedQuotes);
          saveQuotes();
          alert("Quotes imported successfully!");
      } catch (error) {
          alert("Error parsing JSON file!");
      }
  };
  fileReader.readAsText(event.target.files[0]);
}


document.getElementById("newQuote").addEventListener("click", showRandomQuote);
