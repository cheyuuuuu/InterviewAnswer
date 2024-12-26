import { createContext, useState, useEffect, useContext } from "react";
import itemsData from "../items.json";
const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [result, setResult] = useState([]);
  const [category, setCategory] = useState([]);

  //第一次渲染取得所有類別
  useEffect(() => {
    const newCategory = getCategory();
    setCategory(newCategory.sort());
  }, []);

  //表單提交邏輯
  const onSubmit = (data) => {
    //檢查是否提交空表單 是的話回傳所有資料
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
  //判斷是否提交空值fun
  function checkEmpty(data) {
    let isEmpty = true;
    for (let item in data) {
      if (data[item] !== "") {
        isEmpty = false;
      }
    }
    return isEmpty;
  }
  //獲得所有種類fun
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
  //處理升序
  function upSort() {
    const sortedResult = [...result].sort((a, b) => a.price - b.price);
    setResult(sortedResult);
  }
  //處理降序
  function downSort() {
    const sortedResult = [...result].sort((a, b) => b.price - a.price);
    setResult(sortedResult);
  }

  return (
    <SearchContext.Provider
      value={{
        result,
        category,
        upSort,
        downSort,
        onSubmit,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
