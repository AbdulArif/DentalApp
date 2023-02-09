export interface Theme {
    name: string;
    properties: any;
}

export const light: Theme = {
    name: "light",
    properties: {
        "--default-light": "#FFFFFF",
        "--default-dark": "#000000",

        "--first": "#93DCD8",       // For Header
        "--second": "#7FCDC9",      // For Left Menubar
        "--third": "#EAEDED",       // For Left Iconbar
        "--fourth": "#D2D2D2",      // For Card, or simiar Items Background
        "--fifth": "#D6DBDF",       // Menu Item Lists (eg. sidebar menu item)
        "--sixth": "#EAEAEA",       // For Body Background
        "--seventh": "#FFFFFF",     // // For input fields
        "--text-color": "#000000",  // For Tet Color

        "--hover-background": "#a8acf6",

        "--default-shadow": "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        "--primary-shadow": "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",

        "--btn-background": "#242F9B",
        "--btn-color": "#FFFFFF"
    }
};

export const dark: Theme = {
    name: "dark",
    properties: {
        "--default-light": "#FFFFFF",
        "--default-dark": "#000000",

        "--first": "#595B83",       // For Header
        "--second": "#333456",      // For Left Iconbar
        "--third": "#4D5656",       // For Left Menubar
        "--fourth": "#4F4F6F",      // For Card, or simiar Items Background
        "--fifth": "#1B2631",       // Menu Item Lists (eg. sidebar menu item)
        "--sixth": "#060930",       // For Body Background
        "--seventh": "#6B6C96",     // For input fields
        "--text-color": "#FFFFFF",  // For Tet Color

        "--hover-background": "#696B93",

        "--default-shadow": "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        "--primary-shadow": "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",

        "--btn-background": "#0ccaee",
        "--btn-color": "#000000"
    }
};