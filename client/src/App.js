// import logo from './logo.svg';
import './App.css';

import { Route, Switch } from "react-router-dom";

import Authors from "./views/Authors";
import NewAuthor from "./views/NewAuthor";
import EditAuthor from "./views/EditAuthor";
import NotFound from "./views/NotFound";

function App() {
  return (
    <div>
      <h1>Favorite authors</h1>
      <Switch>
        <Route exact path="/">
          <Authors />
        </Route>

        <Route exact path="/new">
          <NewAuthor />
        </Route>

        <Route exact path="/edit/:id">
          <EditAuthor />
        </Route>

        <Route component={NotFound} />

      </Switch>
    </div>
  );
}

export default App;
