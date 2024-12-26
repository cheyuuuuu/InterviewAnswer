import { useSearch } from "../contexts/searchContext";

function SortBtn() {
  const { upSort, downSort } = useSearch();
  return (
    <div className="sortBox">
      <label>價格排序</label>
      <button onClick={upSort}>升序</button>
      <button onClick={downSort}>降序</button>
    </div>
  );
}

export default SortBtn;
