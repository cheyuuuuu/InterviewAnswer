import { useForm } from "react-hook-form";
import { useSearch } from "../contexts/searchContext";

function Form() {
  const { register, handleSubmit } = useForm();
  const { onSubmit, category } = useSearch();
  return (
    <div className="form-box">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="name">名 稱 </label>
        <input
          type="text"
          {...register("name")}
          placeholder="請輸入名稱"
          className="form-input"
        />
        <br />
        <label className="form-label">選擇類別</label>
        {category.map((item) => (
          <div key={item} style={{ display: "inline-block" }}>
            <input type="checkbox" value={item} {...register("category")} />
            <label key={`label-${item}`} className="category-label">
              {item}
            </label>
          </div>
        ))}
        <br />
        <label className="form-label">價格範圍</label>
        <input
          type="number"
          {...register("minPrice")}
          placeholder="最低價格"
          className="form-input"
        />
        <span> ~ </span>
        <input
          type="number"
          {...register("maxPrice")}
          placeholder="最高價格"
          className="form-input"
        />
        <br />
        <label className="form-label">存貨狀態</label>
        <select type="inStock" {...register("inStock")}>
          <option value="" hidden>
            請選擇存貨狀態
          </option>
          <option value="">全顯示</option>
          <option value="true">有存貨</option>
          <option value="false">無存貨</option>
        </select>
        <br />
        <div className="form-button">
          <button type="submit">搜尋</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
