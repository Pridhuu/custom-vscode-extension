import vscode from "../vscode";
import "../styles/start.css";
import folderIcon from "../assets/folder-icon.svg";
import addIcon from "../assets/add-icon.svg";
import Logo from "../assets/advayam-icon.svg";

const setFolder = () => {
    vscode.postMessage({
        command: "open-project"
    });
}

function CreateProject({setCurrentPage}) {
    return <>
        <div className="parent">
            <div className="logo-holder">
                <img src={Logo} alt="" width="fill" height="fill"/>
            </div>
            <h1 className="advayam-heading">WELCOME TO ADVAYAM !</h1>
            <div className="first-container">
                <button className="create-open-button" onClick={() => {
                        setCurrentPage("project-wizard")
                    }
                }>
                    <img src={addIcon} alt="" width="24" height="24"/>
                    New Project</button>
                <button className="create-open-button" onClick={setFolder}>
                    <img src={folderIcon} alt="" width="24" height="24"/>
                    Open Project</button>
            </div>
        </div>
    </>
}

export default CreateProject;