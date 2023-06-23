import "./App.css";

const Person = (props) => {
  return (
    <>
      <h1>Name: {props.name} </h1>
      <h1>Last Name: {props.lastName} </h1>
      <h1>Age: {props.age} </h1>
    </>
  );
};

const App = () => {
  const name = "John";
  const isNameShowing = true;
  return (
    <div className="App">
      <Person name={"John"} lastName={"Doe"} age={25} />
      <Person name={"Fahim"} lastName={"Amin"} age={24} />
    </div>
  );
};

export default App;
