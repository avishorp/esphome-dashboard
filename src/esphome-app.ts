import "./esphome-context";
import "./devices/devices-list";
import "./esphome-main";
import "./editor-wrapper";
import { ESPHomeContext, esphomeContext } from "./esphome-context";

import { LitElement, html, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { provide } from "@lit/context";
import { Router } from '@vaadin/router';


@customElement("esphome-app")
class ESPHomeApp extends LitElement {
  @property() version = "unknown";

  @property() docsLink = "";

  @property() logoutUrl?: string;

  @provide({context: esphomeContext})
  esphomeContext: ESPHomeContext;

  constructor() {
    super();
    this.esphomeContext = {
      version: this.version,
      docsLink: this.docsLink,
      logoutUrl: this.logoutUrl,
    };
  }

  protected render() {
    return html`<div id="outlet" style="height: 100vh; position: relative;"></div>`
  }

  protected firstUpdated(changedProps: PropertyValues): void {
    super.firstUpdated(changedProps);

    const outlet = this.renderRoot.querySelector("#outlet");
    const router = new Router(outlet);
    router.setRoutes([
        { path: '/', component: 'esphome-main' },
        {
            path: '/editor/:filename', action: async (context) => {
                const editFilename = context.params.filename;
                const el = document.createElement('esphome-editor-wrapper');
                if (editFilename) {
                    el.setAttribute('filename', editFilename.toString());
                }
                return el;
            }
        }
    ]);

    document.addEventListener<any>("edit-file", (ev: CustomEvent) => {
      const filename = ev.detail;
      Router.go(`${window.basePath}editor/${filename}`);
    });

    document.addEventListener("close-editor", () => {
      Router.go(window.basePath);
    });

  }

  createRenderRoot() {
    return this;
  }


}

declare global {
  interface HTMLElementTagNameMap {
    "esphome-app": ESPHomeApp;
  }
}
