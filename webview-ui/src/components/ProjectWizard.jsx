import { useState } from "react";
import { useEffect } from "react";
import vscode from "../vscode";
import folderIcon from "../assets/folder-icon.svg"
import "../styles/wizard.css"
import Logo from "../assets/advayam-icon.svg"

function ProjectWizard({setCurrentPage}) {
    const [projectName, setName] = useState("");
    const [projectDescription, setDescription] = useState("");
    const [authorName, setAuthor] = useState("");
    const [projectType, setType] = useState("");
    const [currentLocation, setLocation] = useState("");

    const setMessage = () => {
        vscode.postMessage({
            command: "create-project",
            name: `${projectName}`,
            desc: `${projectDescription}`,
            author: `${authorName}`,
            type: `${projectType}`,
            path: `${currentLocation}`
        });
    }

    const requiredPath = () => {
        vscode.postMessage({
            command: "create-folder"
        });
    }

    useEffect(() => {
        const handler = (e) => {
            const message = e.data;

            if (message.command === "folder-selected") {
                setLocation(message.path);
            }
        };

        window.addEventListener("message", handler);

        return () => {
            window.removeEventListener("message", handler);
        };
    }, []);

    return <>
        <div className="second-container">
            <div className="wizard-logo-holder">
                <img src={Logo} alt="" width="fill" height="fill"/>
            </div>
            <h1 className="advayam-heading">PROJECT WIZARD</h1>
            <div className="input-container">
                <input type="text"
                    className="input"
                    placeholder="Project Name*"
                    required
                    value={projectName}
                    onChange={(e) => {
                            setName(e.target.value);
                        }}
                />

                <input type="text"
                    className="input"
                    placeholder="Project Description*"
                    required
                    value={projectDescription}
                    onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                />

                <input type="text"
                    className="input"
                    placeholder="Author Name*"
                    required
                    value={authorName}
                    onChange={(e) => {
                            setAuthor(e.target.value);
                        }}
                />

                <select
                    className="input"
                    value={projectType}
                    onChange={(e) => {
                        setType(e.target.value)
                    }}>
                        <option value="" disabled>Select Project Type</option>
                        <option value="ESP32">ESP32</option>
                        <option value="Arduino">Arduino</option>
                        <option value="React">React</option>
                        <option value="Node">Node</option>
                        <option value="Python">Python</option>
                </select>
                <div className="loc-container">
                    <input
                        className="loc-input"
                        type="text"
                        value={currentLocation}
                        placeholder="Select Location"
                        readOnly
                    />
                    <button className="loc-button" onClick={requiredPath}>
                        <img src={folderIcon} alt="" width="24" height="24"/>
                    </button>
                </div>
            </div>
            <div className="cta-button">
                <button className="back-button" onClick={
                    () => {
                        setCurrentPage("start-page")
                    }
                }>Back</button>
                <button className="create-button" onClick={setMessage}>Create</button>
            </div>
        </div>
    </>
}

export default ProjectWizard;