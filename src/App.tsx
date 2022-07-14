import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import DashBoardPage from "./view/dashboard";
import Test from "./view/test";
import DefaultContainer from './view/defaultContainer';
import './App.css';
import { curry } from "./utils/curry";

function add(one: number, two: number, three: number) {
  return one + two + three;
}

function App() {
  const curryAdd = curry(add);
  const curry10Add = curryAdd(10);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard" component={DashBoardPage}/>
        <Route path="/test" component={Test}/>
        <Route path='/default' component={DefaultContainer as any}/>
        <Route path="/">
          <div className="App">
            <header className="App-header">
              <div>
                <Link className="link" to="/dashboard">dashboard</Link>
                <Link className="link" to="/test">test</Link>
                <Link className="link" to="/default">类组件</Link>
              </div>
              <div style={{height: '100%'}}>
                <p>柯里化</p>
                <p>{`curryAdd(1,2)(3):`}{curryAdd(1, 2)(3)}</p>
                <p>{`curryAdd(1)(3)(5):`}{curryAdd(1)(3)(5)}</p>
                <p>{`curryAdd(1,3,5):`}{curryAdd(1, 3, 5)}</p>
                <p>{`curry10Add(1):`}{curry10Add(1,2)}</p>
              </div>
            </header>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
