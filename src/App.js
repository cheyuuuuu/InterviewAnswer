import "./App.css";
import SortBtn from "./components/sortBtn";
import SearchResult from "./components/searchResult";
import Form from "./components/form";
import Demo from "./components/demo";

function App() {
  return (
    <div className="App">
      <Form></Form>

      <SortBtn></SortBtn>

      <SearchResult></SearchResult>
      <Demo></Demo>
    </div>
  );
}

export default App;
