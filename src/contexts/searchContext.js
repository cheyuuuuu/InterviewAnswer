import { createContext, useState, useEffect, useContext } from "react";
import itemsData from "../items.json";
const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [result, setResult] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const newCategory = getCategory();
    setCategory(newCategory.sort());
  }, []);

  const onSubmit = (data) => {
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
