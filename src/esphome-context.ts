import {createContext} from '@lit/context';

export interface ESPHomeContext {
    version: string;
    docsLink: string;
    logoutUrl?: string;
}

export const esphomeContext = createContext<ESPHomeContext>('esphome-context');
