import { useState } from "react";
export default function Form({ onAddItems }) {
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
