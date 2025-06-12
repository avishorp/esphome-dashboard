import "./devices/devices-list";
import "./components/esphome-header-menu";
import "./components/esphome-fab";
import { LitElement, html } from "lit";
import { consume } from "@lit/context";
import { customElement, state } from "lit/decorators.js";
import { ESPHomeContext, esphomeContext } from "./esphome-context";


@customElement("esphome-main")
class ESPHomeMainView extends LitElement {

  @consume({ context: esphomeContext, subscribe: false }) esphomeContext!: ESPHomeContext;

  @state() private showDiscoveredDevices = false;

  protected render() {
    return html`
      <header class="esphome-header">
        <img src="static/images/logo-text.svg" alt="ESPHome Logo" />
        <div class="flex"></div>
        <esphome-header-menu
          .logoutUrl=${this.esphomeContext.logoutUrl}
          .showDiscoveredDevices=${this.showDiscoveredDevices}
          @toggle-discovered-devices=${this._toggleDiscoveredDevices}
        ></esphome-header-menu>
      </header>

      <main>
        <esphome-devices-list
          .showDiscoveredDevices=${this.showDiscoveredDevices}
          @toggle-discovered-devices=${this._toggleDiscoveredDevices}
        ></esphome-devices-list>
      </main>

      <esphome-fab></esphome-fab>

      <footer class="page-footer">
        <div>
          ESPHome by Open Home Foundation |
          <a href="https://esphome.io/guides/supporters.html" target="_blank"
            >Fund&nbsp;development</a
          >
          |
          <a href=${this.esphomeContext.docsLink} target="_blank" rel="noreferrer"
            >${this.esphomeContext.version} Documentation</a
          >
        </div>
      </footer>
    `;
  }
  createRenderRoot() {
    return this;
  }

  private _toggleDiscoveredDevices() {
    this.showDiscoveredDevices = !this.showDiscoveredDevices;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "esphome-main": ESPHomeMainView;
  }
}
