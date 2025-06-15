"use strict";

// Treat html`...` as a normal template literal (no-op)
window.html = (strings, ...values) => String.raw({ raw: strings }, ...values);

customElements.define(
  "todays-date",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      const date = new Date();
      const formatter = new Intl.DateTimeFormat("ru-RU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // Format the date and apply transformations
      let formattedDate = formatter
        .format(date)
        .replace(" г.", "") // Remove г. suffix
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter

      this.innerHTML = html`<div>${formattedDate}</div>`;
    }
  }
);

customElements.define(
  "stock-widget",
  class extends HTMLElement {
    constructor() {
      super();
      this.Listings = [
        "ABC",
        "AET",
        "ALMS",
        "BRG",
        "CCA",
        "CLRE",
        "DARA",
        "DLV",
        "GLOH",
        "GSK",
        "HOLA",
        "HOLO",
        "INGS",
        "KETTU",
        "KKI",
        "KMEND",
        "KLVR",
        "MLINE",
        "OVET",
        "OWL",
        "PCO",
        "PETA",
        "PRL",
        "RICHI",
        "SDEK",
        "SMAK",
        "STBA",
        "STOER",
        "TRRA",
        "UAU",
        "UCM",
        "UNSTL",
        "UNY",
        "VBMP",
        "WLBR",
        "ZONA",
      ];
      this.currentIndex = 0;
      this.opacity = 1;
    }

    generateRandomValue() {
      return (Math.random() * 8 - 3).toFixed(2);
    }

    async updateDisplay() {
      const listing = this.Listings[this.currentIndex];
      const value = this.generateRandomValue();
      const isNegative = parseFloat(value) < 0;
      const color = isNegative ? "red" : "green";
      const arrow = isNegative ? "↓" : "↑";

      // Fade out
      this.style.transition = "opacity 0.25s";
      this.style.opacity = 0;

      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update content
      this.innerHTML = html`<span class="mr-2">${listing}</span>
        <span style="color: ${color}">${value}% ${arrow}</span>`;

      // Fade in
      this.style.opacity = 1;

      // Update index for next iteration
      this.currentIndex = (this.currentIndex + 1) % this.Listings.length;
    }

    connectedCallback() {
      this.updateDisplay();
      setInterval(() => this.updateDisplay(), 5000);
    }
  }
);
