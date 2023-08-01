import { useState } from "react";
import Logo from "./logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  function clearlist(items) {
    const confirmed = window.confirm(
      "Are you sure you wanrt to delete all the items?"
    );
    if (confirmed) setitems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleadditems} />
      <PackingList
        items={items}
        ondeleteitem={handledeleteitems}
        ontoggleitem={handletoggleitems}
        clearlist={clearlist}
      />
      <Stats items={items} />
    </div>
  );
}
