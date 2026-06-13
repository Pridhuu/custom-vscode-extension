const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Extension is Active');
	const disposable = vscode.commands.registerCommand('create-folder.createfolder',
		() => {
			const panel = vscode.window.createWebviewPanel(
				"folder-panel",
				"Advayam",
				vscode.ViewColumn.One,
				{
					enableScripts: true,
					localResourceRoots: [
						vscode.Uri.file(
							path.join(context.extensionPath, 'webview-ui', 'dist')
						)
					]
				}
			);

			panel.webview.html = getWebContent(panel.webview, context);

			panel.webview.onDidReceiveMessage(
				(message) => {
					switch(message.command) {
						case "create-project":
							if(message.type === "ESP32") {
								createESP32(message.name, message.desc, message.author, message.type, message.path);
							} else if(message.type === "Arduino") {
								createArduino(message.name, message.desc, message.author, message.type, message.path);
							} else if(message.type === "Node") {
								createNode(message.name, message.desc, message.author, message.type, message.path);
							} else if(message.type === "Python") {
								createPython(message.name, message.desc, message.author, message.type, message.path);
							} else {
								createReact(message.name, message.desc, message.author, message.type, message.path);
							}
							break;
						
						case "open-project":
							openFolder();
							break;

						case "create-folder":
							createFolder(panel);
							break;
							
					}
				}
			)
	});
	context.subscriptions.push(disposable);
}

/**
 * @param {vscode.WebviewPanel} panel
 */

async function createFolder(panel) {
	const requiredFolder = await vscode.window.showOpenDialog({
		canSelectFolders: true,
		canSelectFiles: false,
		canSelectMany: false,
		openLabel: "Select Folder"
	});

	if(requiredFolder) {
		const selectedFolder = requiredFolder[0].fsPath;
		panel.webview.postMessage({
			command: "folder-selected",
			path: `${selectedFolder}`
		});
									
	} else {
		console.log("Folder creation failed");
		return;
	}
}

/**
 * @param {string} project_name
 * @param {string} project_desc
 * @param {string} author_name
 * @param {string} project_type
 * @param {string} parent_path
 */

async function createESP32(project_name, project_desc, author_name, project_type, parent_path) {
	if(parent_path) {
		const projectPath = path.join(parent_path, `${project_name}`);
		fs.mkdirSync(projectPath,
			{recursive: true}
		);
		await vscode.commands.executeCommand(
			"vscode.openFolder",
			vscode.Uri.file(projectPath)
		);

		fs.mkdirSync(
			path.join(projectPath, "src"),
			{recursive: true}
		);

		fs.mkdirSync(
			path.join(projectPath, "include"),
			{recursive: true}
		);

		fs.mkdirSync(
			path.join(projectPath, "lib"),
			{recursive: true}
		);

		fs.writeFileSync(
			path.join(projectPath, "platformio.ini"),
			`[env:esp32dev]
			platform = espressif32
			board = esp32dev
			framework = arduino
			monitor_speed = 115200`
		);

		fs.writeFileSync(
			path.join(projectPath, "src", "main.cpp"),
			`#include <Arduino.h>

			void setup() {
				Serial.begin(115200);
				Serial.println("ESP32 Project Started");
			}

			void loop() {
				Serial.println("Hello ESP32");
				delay(1000);
			}`
		);

		fs.writeFileSync(
			path.join(projectPath, ".gitignore"),
			`.pio/
			.vscode/

			*.bin
			*.elf
			*.map`
		);

		fs.writeFileSync(
			path.join(projectPath, "README.md"),
			`# ${project_name}
			## Description

			${project_desc}

			## Author

			${author_name}

			## Project Type

			${project_type}
			`
		);

		fs.writeFileSync(
			path.join(projectPath, "include", ".gitkeep"),
			""
		);

		fs.writeFileSync(
			path.join(projectPath, "lib", ".gitkeep"),
			""
		);

	} else {
		console.log("File creation failed");
		return;
	}
}

/**
 * @param {string} project_name
 * @param {string} project_desc
 * @param {string} author_name
 * @param {string} project_type
 * @param {string} parent_path
 */

async function createArduino(project_name, project_desc, author_name, project_type, parent_path) {
	if(parent_path) {
		const projectPath = path.join(parent_path, `${project_name}`);

		fs.mkdirSync(projectPath,
			{recursive: true}
		);

		await vscode.commands.executeCommand(
			"vscode.openFolder",
			vscode.Uri.file(projectPath)
		);

		fs.mkdirSync(
			path.join(projectPath, "src"),
			{ recursive: true }
		);

		await vscode.commands.executeCommand(
			"vscode.openFolder",
			vscode.Uri.file(projectPath)
		);

		fs.writeFileSync(
			path.join(projectPath, "src", "main.ino"),
			`void setup() {
				Serial.begin(9600);
			}

			void loop() {
				Serial.println("Hello Arduino!");
				delay(1000);
			}`
		);

		fs.mkdirSync(
			path.join(projectPath, "docs"),
			{ recursive: true }
		);

		fs.writeFileSync(
			path.join(projectPath, "docs", ".gitkeep"),
			""
		);

		fs.writeFileSync(
			path.join(projectPath, "README.md"),
			`# ${project_name}
			## Description

			${project_desc}

			## Author

			${author_name}

			## Project Type

			${project_type}`
		);

		fs.writeFileSync(
			path.join(projectPath, ".gitignore"),
			`.pio/
			.vscode/

			*.bin
			*.elf
			*.map`
		);

	} else {
		console.log("File creation failed");
		return;
	}
}

/**
 * @param {string} project_name
 * @param {string} project_desc
 * @param {string} author_name
 * @param {string} project_type
 * @param {string} parent_path
 */

async function createReact(project_name, project_desc, author_name, project_type, parent_path) {
	if(parent_path) {
		const projectPath = path.join(parent_path, `${project_name}`);

		fs.mkdirSync(projectPath,
			{recursive: true}
		);
		
		await vscode.commands.executeCommand(
			"vscode.openFolder",
			vscode.Uri.file(projectPath)
		);

		fs.mkdirSync(
			path.join(projectPath, "public"),
			{ recursive: true }
		);

		await vscode.commands.executeCommand(
			"vscode.openFolder",
			vscode.Uri.file(projectPath)
		);

		fs.writeFileSync(
			path.join(projectPath, "public", ".gitkeep"),
			""
		);

		fs.mkdirSync(
			path.join(projectPath, "src"),
			{ recursive: true }
		);

		fs.writeFileSync(
			path.join(projectPath, "src", "App.jsx"),
			`import { useState } from 'react'
			
			function App() {
			return <>
				
			</>
			}

			export default App`
		);

		fs.writeFileSync(
			path.join(projectPath, "src", "main.jsx"),
			`import { StrictMode } from 'react'
			import { createRoot } from 'react-dom/client'
			import App from './App.jsx'

			createRoot(document.getElementById('root')).render(
			<StrictMode>
				<App />
			</StrictMode>,
			)`
		);

		fs.writeFileSync(
			path.join(projectPath, "src", "App.css"),
			`. body {
				margin: 0;
			}`
		);

		fs.writeFileSync(
			path.join(projectPath, "index.html"),
			`<!doctype html>
			<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>webview-ui</title>
			</head>
			<body>
				<div id="root"></div>
				<script type="module" src="/src/main.jsx"></script>
			</body>
			</html>`
		);

		fs.writeFileSync(
			path.join(projectPath, "package.json"),
			`{
				"name": "webview-ui",
				"private": true,
				"version": "0.0.0",
				"type": "module",
				"scripts": {
					"dev": "vite",
					"build": "vite build",
					"lint": "eslint .",
					"preview": "vite preview"
				},
				"dependencies": {
					"react": "^19.2.6",
					"react-dom": "^19.2.6"
				},
				"devDependencies": {
					"@eslint/js": "^10.0.1",
					"@types/react": "^19.2.14",
					"@types/react-dom": "^19.2.3",
					"@vitejs/plugin-react": "^6.0.1",
					"eslint": "^10.3.0",
					"eslint-plugin-react-hooks": "^7.1.1",
					"eslint-plugin-react-refresh": "^0.5.2",
					"globals": "^17.6.0",
					"vite": "^8.0.12"
				}
			}`
		);

		fs.writeFileSync(
			path.join(projectPath, "vite.config.js"),
			`import { defineConfig } from "vite";
			import react from "@vitejs/plugin-react";

			export default defineConfig({
				plugins: [ react() ],
				base: "./"
			});`
		);

		fs.writeFileSync(
			path.join(projectPath, "README.md"),
			`# ${project_name}
			## Description

			${project_desc}

			## Author

			${author_name}

			## Project Type

			${project_type}`
		);

		fs.writeFileSync(
			path.join(projectPath, ".gitignore"),
			`# Logs
			logs
			*.log
			npm-debug.log*
			yarn-debug.log*
			yarn-error.log*
			pnpm-debug.log*
			lerna-debug.log*

			node_modules
			dist
			dist-ssr
			*.local

			# Editor directories and files
			.vscode/*
			!.vscode/extensions.json
			.idea
			.DS_Store
			*.suo
			*.ntvs*
			*.njsproj
			*.sln
			*.sw?`
		);

	} else {
		console.log("Folder creation failed");
		return
	}
}

/**
 * @param {string} project_name
 * @param {string} project_desc
 * @param {string} author_name
 * @param {string} project_type
 * @param {string} parent_path
 */

async function createPython(project_name, project_desc, author_name, project_type, parent_path) {
	if(parent_path) {
		const projectPath = path.join(parent_path, `${project_name}`);

		fs.mkdirSync(projectPath,
			{recursive: true}
		);
		
		await vscode.commands.executeCommand(
			"vscode.openFolder",
			vscode.Uri.file(projectPath)
		);

		fs.mkdirSync(
			path.join(projectPath, "src"),
			{ recursive: true }
		);

		await vscode.commands.executeCommand(
			"vscode.openFolder",
			vscode.Uri.file(projectPath)
		);

		fs.writeFileSync(
			path.join(projectPath, "src", "main.py"),
			`def main():
				print("Hello Python!")

			if __name__ == "__main__":
				main()`
		);

		fs.mkdirSync(
			path.join(projectPath, "tests"),
			{ recursive: true }
		);

		fs.writeFileSync(
			path.join(projectPath, "tests", ".gitkeep"),
			""
		);

		fs.writeFileSync(
			path.join(projectPath, "requirements.txt"),
			`# Add dependencies here`
		);

		fs.writeFileSync(
			path.join(projectPath, "README.md"),
			`# ${project_name}
			## Description

			${project_desc}

			## Author

			${author_name}

			## Project Type

			${project_type}`
		);

		fs.writeFileSync(
			path.join(projectPath, ".gitignore"),
			`__pycache__/
			*.py[cod]

			venv/
			.venv/

			.env

			.vscode/
			.idea/

			build/
			dist/
			*.egg-info/`
		);

		fs.writeFileSync(
			path.join(projectPath, "venv_setup.md"),
			`python -m venv venv

			# Windows
			venv\Scripts\activate

			# Linux/Mac
			source venv/bin/activate

			pip install -r requirements.txt`
		);

	} else {
		console.log("Folder creation failed");
		return;
	}
}

/**
 * @param {string} project_name
 * @param {string} project_desc
 * @param {string} author_name
 * @param {string} project_type
 * @param {string} parent_path
 */

async function createNode(project_name, project_desc, author_name, project_type, parent_path) {
	if(parent_path) {
		const projectPath = path.join(parent_path, `${project_name}`);

		fs.mkdirSync(projectPath,
			{recursive: true}
		);
		
		await vscode.commands.executeCommand(
			"vscode.openFolder",
			vscode.Uri.file(projectPath)
		);

		fs.mkdirSync(
			path.join(projectPath, "src"),
			{ recursive: true }
		);

		fs.writeFileSync(
			path.join(projectPath, "src", "app.js"),
			`const express = require("express");

			const app = express();

			app.get("/", (req, res) => {
				res.send("Hello Node.js!");
			});

			app.listen(3000, () => {
				console.log("Server running on port 3000");
			});`
		);

		fs.mkdirSync(
			path.join(projectPath, "src", "routes"),
			{ recursive: true }
		);


		fs.writeFileSync(
			path.join(projectPath, "src", "routes", ".gitkeep"),
			""
		);

		fs.writeFileSync(
			path.join(projectPath, ".env"),
			"PORT=3000"
		);

		fs.writeFileSync(
			path.join(projectPath, "package.json"),
			`{
				"name": "project-name",
				"version": "1.0.0",
				"main": "src/app.js",
				"scripts": {
					"start": "node src/app.js"
				},
				"dependencies": {
					"express": "^5.0.0"
				}
			}`
		);

		fs.writeFileSync(
			path.join(projectPath, "README.md"),
			`# ${project_name}
			## Description

			${project_desc}

			## Author

			${author_name}

			## Project Type

			${project_type}`
		);

		fs.writeFileSync(
			path.join(projectPath, ".gitignore"),
			`node_modules/

			.env

			dist/
			build/

			.vscode/
			.idea/

			*.log`
		);


	} else {
		console.log("Folder creation failed");
		return;
	}
}

async function openFolder() {
	const requireFolder = await vscode.window.showOpenDialog({
		canSelectFiles: false,
		canSelectFolders: true,
		canSelectMany: false,
		openLabel: "Select Folder"
	});

	if(requireFolder) {
		await vscode.commands.executeCommand(
			"vscode.openFolder",
			requireFolder[0]
		);
	} else {
		console.log("Folder opening failed");
		return;
	}

}

function deactivate() {
	console.log("Extension Stopped!!");
}

/**
* @param {vscode.ExtensionContext} context
* @param {vscode.Webview} webview
* @returns {string}
*/

function getWebContent(webview, context) {
	const distPath = path.join(context.extensionPath, 'webview-ui', 'dist');
	let html = fs.readFileSync(
		path.join(distPath, "index.html"),
		"utf-8"
	)

	html = html.replace(
		/src="\.\/assets\/(.*?)"/g, (_, file) => {
			const uri = webview.asWebviewUri(
				vscode.Uri.file(path.join(distPath, "assets", file))
			);
			return `src="${uri}"`
		}
	)

	html = html.replace(
		/href="\.\/assets\/(.*?)"/g, (_, file) => {
			const uri = webview.asWebviewUri(
				vscode.Uri.file(path.join(distPath, "assets", file))
			);
			return `href="${uri}"`
		}
	)

	return html;
}

module.exports = {
	activate,
	deactivate
}
