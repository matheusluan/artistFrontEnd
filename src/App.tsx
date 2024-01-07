import { BrowserRouter as Router } from "react-router-dom"
import { GlobalStyles } from "./styles/GlobalStyles"
import { Routes } from "./routes/routes"

export function App() {
  return (
    <Router>
      <Routes />
      <GlobalStyles />
    </Router>
  )

}