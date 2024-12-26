import "./App.css";
import SortBtn from "./components/sortBtn";
import SearchResult from "./components/searchResult";
import Form from "./components/form";
import SearchResultMobile from "./components/searchResultMobile";

function App() {
  return (
    <div className="App">
      <Form></Form>

      <SortBtn></SortBtn>

      <SearchResult></SearchResult>
      <SearchResultMobile></SearchResultMobile>
    </div>
  );
}

export default App;
