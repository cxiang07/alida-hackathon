import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "../src/components/Login";
import { StoryListPage } from "./pages/storyListComponent";
import ReduxTest from "./ReduxTest";
import SelectedStory from "../src/components/SelectedStory";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/redux" exact component={ReduxTest} />
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/stories" exact component={StoryListPage} />
          <Route path="/stories/:id" exact component={SelectedStory} />
          {/* TODO: Add Routes
          <Route path='/upload' exact component={} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
