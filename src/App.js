import "./App.css";
import Database from "./Database";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <h1>Welcome to One Or all</h1>
      <p>the rules are as follows</p>

      <Router>
        <Route path="/gameBoard" component={Database} />
        <Link to="/gameBoard">
          {" "}
          <button>Ready</button>
        </Link>
      </Router>
    </div>
  );
}

export default App;
