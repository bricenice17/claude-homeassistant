// Import LitElement base class and html helper function
import { LitElement, html } from 'https://unpkg.com/lit-element?module';

// Create a new custom element extending LitElement
class SimpleTestElement extends LitElement {
  // Method to handle configuration
  setConfig(config) {
    this.config = config;
  }

  // Render method to define the HTML content of the card
  render() {
    return html`<ha-card><p>Custom Element Loaded!</p></ha-card>`;
  }

  // Method to return the height of the card
  getCardSize() {
    return 1;
  }
}

// Register the custom element
customElements.define('simple-test-element', SimpleTestElement);
