"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarProvider = void 0;
const vscode = require("vscode");
const getNonce_1 = require("./getNonce");
class SidebarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "onInfo": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showInformationMessage(data.value);
                    break;
                }
                case "onError": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
                case "goodMorning": {
                    console.log("Good Morning!");
                    this._view.webview.html = this._getGoodMorningHtml(this._view.webview);
                    break;
                }
                case "backToChatbot": {
                    console.log("Back to Chatbot");
                    this._view.webview.html = this._getHtmlForWebview(this._view.webview);
                    break;
                }
                case "goodNight": {
                    console.log("Good Night!");
                    this._view.webview.html = this._getGoodNightHtml(this._view.webview);
                    break;
                }
            }
        });
    }
    revive() {
        this._view = panel;
    }
    _getGoodNightHtml(webview) {
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "global.css"));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "page3.js"));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css"));
        return `<!DOCTYPE html>
                <html lang="en">
                <head>
                
                <link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${styleMainUri}" rel="stylesheet">
                <script >
                    const vscode = acquireVsCodeApi();
                </script>
                </head>
                <body>
                    <h1>Good Night!</h1>
                    <button id="BackToChatbot">Chat</button>
                    <button id="GoodMorning">Good Morning</button>
                    <script src="${scriptUri}">
                    const vscode = acquireVsCodeApi();
                </script>
                </body>
                </html>`;
    }
    _getGoodMorningHtml(webview) {
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "global.css"));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "page2.js"));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css"));
        return `<!DOCTYPE html>
                <html lang="en">
                <head>
                
                <link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${styleMainUri}" rel="stylesheet">
                <script >
                    const vscode = acquireVsCodeApi();
                </script>
                </head>
                <body>
                    <h1>Good Morning!</h1>
                    <button id="BackToChatbot">Chat</button>
                    <button id="GoodNight">Good Night</button>
                    <p id="display"></p>
                    <script src="${scriptUri}">
                    const vscode = acquireVsCodeApi();
                </script>
                </body>
                </html>`;
    }
    _getHtmlForWebview(webview) {
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "global.css"));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "main.js"));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css"));
        // Use a nonce to only allow a specific script to be run.
        const nonce = (0, getNonce_1.default)();
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${styleMainUri}" rel="stylesheet">
                <script >
                    const vscode = acquireVsCodeApi();
                </script>
            </head>
            <body>
                <h1>Chatbot</h1>
                <div id="app"></div>
                <input type="text" id="userInput" />
                <button id="Submit">Submit</button>
                <button id="GoodMorning">Good Morning</button>
                <button id="GoodNight">Good Night</button>
                <p id="display"></p>
                <script src="${scriptUri}"> 
                    const vscode = acquireVsCodeApi();
                
                </script>
            </body>
            </html>`;
    }
}
exports.SidebarProvider = SidebarProvider;
//# sourceMappingURL=SidebarProvider.js.map