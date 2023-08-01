import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  ondeleteitem,
  ontoggleitem,
  clearlist,
}) {
  const [sortby, setsortby] = useState("input");
  let sortedItems;
  if (sortby === "input") sortedItems = items;
  if (sortby === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortby === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            ondeleteitem={ondeleteitem}
            ontoggleitem={ontoggleitem}
          />
          //                                       ----------->there would be a error in console if we dont use a unique  key here
        ))}
      </ul>
      <div classname="actions">
        <select value={sortby} onChange={(e) => setsortby(e.target.value)}>
          <option value="input">Sort by input Order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => clearlist(items)}>Clear List</button>
      </div>
    </div>
  );
}
