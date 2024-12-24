import "./App.css";
import { useState, useEffect } from "react";
import itemsData from "./items.json";
import { useForm } from "react-hook-form";
import { FixedSizeList as List } from "react-window";

function App() {
  const [result, setResult] = useState([]);
  const [category, setCategory] = useState([]);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const isEmpty = checkEmpty(data);

    if (isEmpty) {
      setResult(itemsData);
      return;
    }

    const filteredItems = itemsData.filter((item) => {
      // 處理名稱搜尋
      let matchName = true;
      if (data.name) {
        matchName = item.name.includes(data.name);
      }
      // 處理多選類別

      let matchCategory = true;
      if (data.category && data.category.length > 0) {
        matchCategory = data.category.includes(item.category);
      }
      // 處理價格範圍
      let matchPrice = true;
      if (data.minPrice) {
        matchPrice = item.price >= Number(data.minPrice);
      }
      if (data.maxPrice) {
        matchPrice = matchPrice && item.price <= Number(data.maxPrice);
      }

      // 處理存貨狀態
      let matchStock = true;
      if (data.inStock !== "") {
        matchStock = item.inStock === (data.inStock === "true");
      }

      return matchName && matchCategory && matchPrice && matchStock;
    });

    setResult(filteredItems);
  };

  //第一次渲染，取得商品類別
  useEffect(() => {
    const newCategory = getCategory();
    setCategory(newCategory.sort());
  }, []);
  //追蹤result 有更新就印出
  useEffect(() => {
    console.log("result 更新了");
  }, [result]);

  //檢查是否提交空表單
  function checkEmpty(data) {
    let isEmpty = true;
    for (let item in data) {
      if (data[item] !== "") {
        console.log("進入判斷");
        isEmpty = false;
      }
    }
    return isEmpty;
  }

  // 取得所有商品類別
  function getCategory() {
    const tempCategory = [];
    for (let i = 0; i < itemsData.length; i++) {
      let have = false;
      for (let j = 0; j < tempCategory.length; j++) {
        if (itemsData[i].category === tempCategory[j]) {
          have = true;
          break;
        }
      }
      if (!have) {
        tempCategory.push(itemsData[i].category);
      }
    }
    return tempCategory;
  }

  function upSort() {
    console.log("進入升序");
    const sortedResult = [...result].sort((a, b) => a.price - b.price);
    setResult(sortedResult);
    console.log("升序完成");
  }
  function downSort() {
    console.log("進入降序");
    const sortedResult = [...result].sort((a, b) => b.price - a.price);
    setResult(sortedResult);
    console.log("降序完成");
  }
  //使用react-window套件實現局部顯示
  const Row = ({ index, style }) => {
    const item = result[index];
    return (
      <div style={style} className="tableRow">
        <div className="tableItem">{item.name}</div>
        <div className="tableItem">{item.category}</div>
        <div className="tableItem">{item.price}</div>
        <div className="tableItem">{item.inStock ? "有" : "沒有"}</div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="formBox">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="name">名 稱 </label>
          <input
            type="text"
            {...register("name")}
            placeholder="請輸入名稱"
            className="formInput"
          />
          <br />
          <label className="formLabel">選擇類別</label>
          {category.map((item) => (
            <div key={item} style={{ display: "inline-block" }}>
              <input type="checkbox" value={item} {...register("category")} />
              <label key={`label-${item}`} className="categoryLabel">
                {item}
              </label>
            </div>
          ))}
          <br />
          <label className="formLabel">價格範圍</label>
          <input
            type="number"
            {...register("minPrice")}
            placeholder="最低價格"
            className="formInput"
          />
          <span> ~ </span>
          <input
            type="number"
            {...register("maxPrice")}
            placeholder="最高價格"
            className="formInput"
          />
          <br />
          <label className="formLabel">存貨狀態</label>
          <select type="inStock" {...register("inStock")}>
            <option value="" hidden>
              請選擇存貨狀態
            </option>
            <option value="">全顯示</option>
            <option value="true">有存貨</option>
            <option value="false">無存貨</option>
          </select>
          <br />
          <div className="formButton">
            <button type="submit">搜尋</button>
          </div>
        </form>
      </div>
      <div className="sortBox">
        <label>價格排序</label>
        <button onClick={upSort}>升序</button>
        <button onClick={downSort}>降序</button>
      </div>
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
          itemSize={35} // 每項高度
          width="100%"
        >
          {Row}
        </List>
      </div>
    </div>
  );
}

export default App;
