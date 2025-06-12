import("./editor/esphome-editor");

import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fireEvent } from "./util/fire-event";

@customElement("esphome-editor-wrapper")
class ESPHomeEditorWrapper extends LitElement {
  @property() filename: string = "";

  protected render() {
      return html`
        <style>
          esphome-editor {
            display: flex;
            flex-direction: column;
            flex: 1 0 auto;
          }
        </style>
        <esphome-editor
          @close=${this._handleEditorClose}
          fileName=${this.filename}
        ></esphome-editor>
      `;
  }

  createRenderRoot() {
    return this;
  }


  private _handleEditorClose() {
    fireEvent(this, "close-editor");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "esphome-editor-wrapper": ESPHomeEditorWrapper;
  }
}
