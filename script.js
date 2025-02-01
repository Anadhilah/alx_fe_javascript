
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Success is not final; failure is not fatal: It is the courage to continue that counts.", category: "Motivation" },
  ];
  
 
  const lastViewedQuote = sessionStorage.getItem("lastQuote");
  if (lastViewedQuote) {
    document.getElementById("quoteDisplay").innerText = lastViewedQuote;
  }
  

  function showRandomQuote() {
    if (quotes.length === 0) {
      alert("No quotes available!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    document.getElementById("quoteDisplay").innerText = `"${randomQuote.text}" - ${randomQuote.category}`;
    sessionStorage.setItem("lastQuote", `"${randomQuote.text}" - ${randomQuote.category}`);
  }
  

  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.id = "addQuoteForm";
  

    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter a new quote";
    formContainer.appendChild(quoteInput);
  
 
    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";
    formContainer.appendChild(categoryInput);
  

    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.onclick = addQuote;
    formContainer.appendChild(addButton);
  
    document.body.appendChild(formContainer);
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
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }
  

  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "quotes.json";
    downloadLink.click();
  }
  

  function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes = quotes.concat(importedQuotes);
          localStorage.setItem("quotes", JSON.stringify(quotes));
          alert("Quotes imported successfully!");
        } else {
          alert("Invalid file format. Please upload a valid JSON file.");
        }
      } catch (err) {
        alert("Error reading file. Please ensure it contains valid JSON.");
      }
    };
    reader.readAsText(file);
  }
  

  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  

  const exportButton = document.createElement("button");
  exportButton.id = "exportQuotes";
  exportButton.textContent = "Export Quotes";
  exportButton.onclick = exportToJsonFile;
  document.body.appendChild(exportButton);
  

  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.id = "importQuotesFile";
  importInput.accept = ".json";
  importInput.addEventListener("change", importFromJsonFile);
  document.body.appendChild(importInput);  
  
  
  function updateQuoteDisplay() {
    const quoteList = document.getElementById("quoteList");
    quoteList.innerHTML = "";  // Clear current list
    quotes.forEach(quote => {
      const listItem = document.createElement("li");
      listItem.innerText = `"${quote.text}" - ${quote.category}`;
      quoteList.appendChild(listItem);
    });
  }
  
  
  createAddQuoteForm();
  