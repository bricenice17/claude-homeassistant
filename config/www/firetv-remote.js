// Import LitElement and html helper
import { LitElement, html, css } from 'https://unpkg.com/lit-element?module';

class FireTVRemote extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
        background-color: rgba(50, 50, 50, 0.8);
        border-radius: 12px;
      }
      .button {
        display: inline-block;
        width: 60px;
        height: 60px;
        margin: 5px;
        border-radius: 8px;
        background-color: #333;
        color: #fff;
        text-align: center;
        line-height: 60px;
        font-size: 18px;
        cursor: pointer;
        user-select: none;
      }
      .button:active {
        background-color: #555;
      }
      .control-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        justify-items: center;
        align-items: center;
      }
    `;
  }

  setConfig(config) {
    this.config = config;
  }

  render() {
    return html`
      <ha-card>
        <div class="control-grid">
          <div></div>
          <div class="button" @click="${() => this.sendCommand('DPAD_UP')}">▲</div>
          <div></div>
          <div class="button" @click="${() => this.sendCommand('DPAD_LEFT')}">◀</div>
          <div class="button" @click="${() => this.sendCommand('DPAD_CENTER')}">⏺</div>
          <div class="button" @click="${() => this.sendCommand('DPAD_RIGHT')}">▶</div>
          <div></div>
          <div class="button" @click="${() => this.sendCommand('DPAD_DOWN')}">▼</div>
          <div></div>
        </div>
        <div class="button" @click="${() => this.sendCommand('BACK')}">Back</div>
        <div class="button" @click="${() => this.sendCommand('HOME')}">Home</div>
        <div class="button" @click="${() => this.sendCommand('POWER')}">Power</div>
      </ha-card>
    `;
  }

  sendCommand(command) {
    // Define the ADB command mappings
    const adbCommands = {
      'DPAD_UP': 'input keyevent KEYCODE_DPAD_UP',
      'DPAD_DOWN': 'input keyevent KEYCODE_DPAD_DOWN',
      'DPAD_LEFT': 'input keyevent KEYCODE_DPAD_LEFT',
      'DPAD_RIGHT': 'input keyevent KEYCODE_DPAD_RIGHT',
      'DPAD_CENTER': 'input keyevent KEYCODE_DPAD_CENTER',
      'BACK': 'input keyevent KEYCODE_BACK',
      'HOME': 'input keyevent KEYCODE_HOME',
      'POWER': 'input keyevent KEYCODE_POWER'
    };

    // Execute the ADB command using Home Assistant service
    const adbCommand = adbCommands[command];
    if (adbCommand) {
      this.dispatchEvent(new CustomEvent('hass-service-call', {
        detail: {
          domain: 'androidtv',
          service: 'adb_command',
          service_data: {
            entity_id: this.config.entity, // Make sure to set the entity ID in your YAML
            command: adbCommand
          }
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  getCardSize() {
    return 3; // Adjust the size as needed
  }
}

customElements.define('firetv-remote', FireTVRemote);
