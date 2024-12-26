import { FixedSizeList as List } from "react-window";
import { useSearch } from "../contexts/searchContext";
function SerchResult() {
  const { result } = useSearch();
  const Row = ({ index, style }) => {
    const item = result[index];
    return (
      <div className="table-row-box" style={style}>
        <div className="tableRow">
          <div className="tableItem" data-label="商品名稱">
            {item.name}
          </div>
          <div className="tableItem" data-label="類別">
            {item.category}
          </div>
          <div className="tableItem" data-label="價格">
            {item.price}
          </div>
          <div className="tableItem" data-label="庫存">
            {item.inStock ? "有" : "沒有"}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="tableBox">
        <table>
          <thead>
            <tr>
              <th>商品名稱</th>
              <th>類別</th>
              <th>價格</th>
              <th>有庫存</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tableBodyBox">
        <List
          height={400}
          itemCount={result.length} // 告訴 react-window 總共有多少項
          itemSize={35} // 寬度小於一定值時，增加高度
          width="100%"
        >
          {Row}
        </List>
      </div>
    </div>
  );
}
export default SerchResult;
