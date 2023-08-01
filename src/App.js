import { useState } from "react";

export default function App() {
  const [items, setitems] = useState([]);
  // const numItems = items.length;--------------------->we would not calculate here and pass is as props to stats because we have to calculate three values then we have to pass three values that does not makes sense

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
      <Stats items={items} />
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

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your Packing List💼</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything !Ready to go✈️"
          : `You have ${numItems} items on your list,and you already packed
        ${numPacked}(${percentage}%) items`}
      </em>
    </footer>
  );
}

//  controlled ElementInternals
//  ------define
//  ----take value
//  ----update   onchange
