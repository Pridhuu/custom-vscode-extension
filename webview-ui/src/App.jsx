import { useState } from 'react'
import CreateProject from './components/CreateProject';
import ProjectWizard from './components/ProjectWizard';
import "./App.css"

function App() {
	const [currentPage, setCurrentPage] = useState("start-page");
	return <>
		{ currentPage === "start-page" && (
			<CreateProject setCurrentPage = {setCurrentPage}/>
		)}

		{ currentPage === "project-wizard" && (
			<ProjectWizard setCurrentPage = {setCurrentPage}/>
		)}
	</>
}

export default App
