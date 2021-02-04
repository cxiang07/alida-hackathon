import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setStories } from "./redux/actions/storeAction";

function ReduxTest() {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <h1> Hello</h1>
      <h1>
        {stories[0].id}--{stories[0].date}
      </h1>
      <br></br>
      <button
        onClick={() =>
          dispatch(
            setStories([
              {
                id: 567,
                date: "2020-02-05",
                title: "set stories",
              },
            ])
          )
        }
      >
        hi
      </button>
    </div>
  );
}

export default ReduxTest;
