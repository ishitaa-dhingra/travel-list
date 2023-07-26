const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
  { id: 4, description: "Laptop", quantity: 1, packed: true },
];
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
function Logo() {
  return <h1>🌴Far Away🏝️</h1>;
}
function Form() {
  function handlesubmit(e) {
    e.preventDefault();
    //----------------------------------------------->to prevent reload
  }
  return (
    <form className="add-form" onSubmit={handlesubmit}>
      <h3>What do you need for your 😎Trip?</h3>
      <select>
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
      <input type="text" placeholder="Items...."></input>
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
          //                                       ----------->there would be a error in console if we dont use a unique  key here
        ))}
      </ul>
    </div>
  );
}
function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
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
