import React from "react";
import { useSearch } from "../contexts/searchContext";
import { FixedSizeGrid as Grid } from "react-window";

import "./styles.css";

const GUTTER_SIZE = 5;
const COLUMN_WIDTH = 145;
const ROW_HEIGHT = 100;

function SearchResultMobile() {
  const { result } = useSearch();

  if (!result || result.length === 0) {
    return <div className="demo-box">沒有搜尋結果</div>;
  }
  const rowCount = Math.ceil(result.length / 2);
  const Cell = ({ columnIndex, rowIndex, style }) => {
    // 計算當前項目的索引
    const itemIndex = rowIndex * 2 + columnIndex;
    const item = result[itemIndex];
    // 如果沒有數據，返回空的div
    if (!item) return <div style={style} />;
    return (
      <div
        className="GridItem"
        style={{
          ...style,
          left: style.left + GUTTER_SIZE,
          top: style.top + GUTTER_SIZE,
          width: style.width - GUTTER_SIZE,
          height: style.height - GUTTER_SIZE,
        }}
      >
        <div className="card-box">
          <div className="card">
            <div className="table-item2" data-label="商品名稱">
              {item.name}
            </div>
            <div className="table-item2" data-label="類別">
              {item.category}
            </div>
            <div className="table-item2" data-label="價格">
              {item.price}
            </div>
            <div className="table-item2" data-label="庫存">
              {item.inStock ? "有" : "沒有"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="demo-box">
      <Grid
        className="Grid"
        columnCount={2}
        columnWidth={COLUMN_WIDTH}
        height={150}
        rowCount={rowCount}
        rowHeight={ROW_HEIGHT * 3 + GUTTER_SIZE}
        width={400}
      >
        {Cell}
      </Grid>
    </div>
  );
}

export default SearchResultMobile;
