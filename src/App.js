import { useState } from "react";

export default function App() {
  const [items, setitems] = useState([]);

  function handleadditems(item) {
    setitems((items) => [...items, item]);
  }

  function handledeleteitems(id) {
    setitems((items) => items.filter((item) => item.id !== id));
  }
  //---------------------------------------------->lifting up state

  function handletoggleitems(id) {
    setitems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleadditems} />
      <PackingList
        items={items}
        ondeleteitem={handledeleteitems}
        ontoggleitem={handletoggleitems}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away🏝️</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function handlesubmit(e) {
    e.preventDefault();
    //----------------------------------------------->to prevent reload
    if (!description) {
      return;
    }
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);
    setDescription("");
    setquantity(1);
  }
  return (
    <form className="add-form" onSubmit={handlesubmit}>
      <h3>What do you need for your 😎Trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setquantity(Number(e.target.value))}
      >
        {/* ----------------------------------------------->>>>>>> setquantity value is in string thus converted */}
        {
          /* <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>-------------->not used */

          Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))
        }
      </select>
      <input
        type="text"
        placeholder="Items...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        // --------------------------------------------------here e.target is the input element and .value is for value entered  ----------------->and e.target.value is always a string
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, ondeleteitem, ontoggleitem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            ondeleteitem={ondeleteitem}
            ontoggleitem={ontoggleitem}
          />
          //                                       ----------->there would be a error in console if we dont use a unique  key here
        ))}
      </ul>
    </div>
  );
}

function Item({ item, ondeleteitem, ontoggleitem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => ontoggleitem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => ondeleteitem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer>
      <em>You have X items on your list,and you already packed X(X%)</em>
    </footer>
  );
}

//  controlled ElementInternals
//  ------define
//  ----take value
//  ----update   onchange
