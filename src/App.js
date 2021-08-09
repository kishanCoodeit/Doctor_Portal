import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import DashBoard from "./component/DashBoard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={DashBoard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
