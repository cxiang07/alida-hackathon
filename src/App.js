import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "../src/components/Login";
import { StoryListPage } from "./pages/storyListComponent";
import ReduxTest from "./ReduxTest";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/redux" exact component={ReduxTest} />
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/stories" exact component={StoryListPage} />
          {/* TODO: Add Routes
          <Route path='/stories' exact component={} />
          <Route path='/stories/:id' exact component={} />
          <Route path='/upload' exact component={} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
