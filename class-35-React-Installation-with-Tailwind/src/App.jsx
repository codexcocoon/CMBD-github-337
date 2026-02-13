const App = () => {
  const msg = "Hello world";
  const btnStyle = {
    border: "2px solid white",
    color: "white",
    padding: "15px 40px",
    borderRadius: "16px/50%",
    cursor: "pointer",
  };
  return (
    <div>
      <h1 class="text-4xl mb-3 ">{msg}</h1>
      <button class="bg-amber-500 hover:bg-amber-300" style={btnStyle}>Click</button>
    </div>
  );
};

export default App;
