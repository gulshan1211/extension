import * as vscode from "vscode";
import getNonce from "./getNonce";

export class SidebarProvider implements vscode.WebviewViewProvider {
    _view?: vscode.WebviewView;
    _doc?: vscode.TextDocument;

    constructor(private readonly _extensionUri: vscode.Uri) { }

    public resolveWebviewView(webviewView: vscode.WebviewView) {
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

    public revive() {
        this._view = panel;
    }
    private _getGoodNightHtml(webview: vscode.Webview) {
        const styleVSCodeUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "global.css")
        );
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "page3.js")
        );
        
        const styleMainUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css")
        );
        return `<!DOCTYPE html>
                <html lang="en">
                <head>
                
                <link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${styleMainUri}" rel="stylesheet">
                <script >
                    
                </script>
                </head>
                <body>
                    <h1>Good Night!</h1>
                    <button id="BackToChatbot">Chat</button>
                    <button id="GoodMorning">Good Morning</button>
                    <script src="${scriptUri}">
                   
                </script>
                </body>
                </html>`;
    }
    private _getGoodMorningHtml(webview: vscode.Webview) {
        const styleVSCodeUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "global.css")
        );
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "page2.js")
        );
        
        const styleMainUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css")
        );
        return `<!DOCTYPE html>
                <html lang="en">
                <head>
                
                <link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${styleMainUri}" rel="stylesheet">
              
                </head>
                <body>
                    <h1>Good Morning!</h1>
                    <button id="BackToChatbot">Chat</button>
                    <button id="GoodNight">Good Night</button>
                    <p id="display"></p>
                    <script src="${scriptUri}">
                   
                </script>
                </body>
                </html>`;
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        const styleVSCodeUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "global.css")
        );
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "main.js")
        );
        
        const styleMainUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css")
        );

        // Use a nonce to only allow a specific script to be run.
        const nonce = getNonce();

        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${styleMainUri}" rel="stylesheet">
                
            </head>
            <body>
                <h1>Chatbot</h1>
                <div id="app"></div>
                <input type="text" id="userInput" />
                <button id="Submit">Submit</button>
                <button id="GoodMorning">Good Morning</button>
                <button id="GoodNight">Good Night</button>
                <p id="display">welcome to the chatbot</p>
                <script src="${scriptUri}"> 
                    
                
                </script>
            </body>
            </html>`;
    }
}
