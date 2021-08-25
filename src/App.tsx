import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import DashBoardPage from "./view/dashboard";
import Test from "./view/test";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard" component={DashBoardPage}/>
        <Route path="/test" component={Test}/>
        <Route path="/">
          <div className="App">
            <header className="App-header">
              <div>
                <Link to="/dashboard">dashboard</Link>
                <Link to="/test">test</Link>
              </div>
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
