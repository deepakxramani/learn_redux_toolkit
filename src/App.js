import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./Components/Todo";
import { ShowToDo } from "./Components/ShowToDo";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Todo />} path="/todo" />
          <Route element={<ShowToDo />} path="/showtodo" />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
