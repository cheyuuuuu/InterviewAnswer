import "./App.css";
import SortBtn from "./components/sortBtn";
import SearchResult from "./components/searchResult";
import Form from "./components/form";

function App() {
  return (
    <div className="App">
      <Form></Form>

      <SortBtn></SortBtn>

      <SearchResult></SearchResult>
    </div>
  );
}

export default App;
