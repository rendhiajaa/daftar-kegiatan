import { useState } from "react";

export default function App() {

  const [items, setItems] = useState([]);

  
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItem(id) {
    
    setItems((items) => items.filter((item) => item.id !== id));
  }


  function handleUpdateItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

 
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItem={handleRemoveItem}
        onUpdateItem={handleUpdateItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <h1> DOYAN JOKI 😁 </h1>
    </div>
  );
}

function Form({ onAddItems }) {
  const [userID, setUserID] = useState(""); // Ganti dari description menjadi userID
  const [selectedDay, setSelectedDay] = useState("Master / Star / 4.000");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!userID || !email || !password) return;

    const newItem = {
      description: userID,
      packed: false,
      day: selectedDay,
      email,
      password,
      id: Date.now(),
    };
    console.log(newItem);

    onAddItems(newItem);

    setUserID("");
    setEmail("");
    setPassword("");
  }

  const daysOfWeek = [
    "Master / Star / 4.000",
    "Gm / Star / 5.000",
    "Epic / Star / 6.000",
    "Legend / Star / 7.000",
    "Mythic / Star / 8.000",
    "Mythic Honor / Star / 9.000",
    "Mythic Glory / Star / 10.000",
  ];

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Masukkan Data Akun Kamu</h3>
      <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
      >
        {daysOfWeek.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="User ID / Nickname"
        value={userID}
        onChange={(e) => setUserID(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>✔️</button>
    </form>
  );
}


function PackingList({ items, onRemoveItem, onUpdateItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onRemoveItem={onRemoveItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem, onUpdateItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onUpdateItem(item.id)}
      />
      
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
      ( {item.day} )  {item.description} {item.userID} | {item.email} | {item.password}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}


function Stats({ items }) {
 
  if (!items.length)
    return (
      <p className="stats">
        <em> Joki yang harus dikerjakan </em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "YEYYYYY SEMUA JOKI MU SUDAH SELESAIII "
          : ` Kamu ada ${numItems} joki yg blm dikerjakan, dan yg sudah kamu kerjakan ${numPacked}
        joki (${percentage}%)`}
      </em>
    </footer>
  );
}
