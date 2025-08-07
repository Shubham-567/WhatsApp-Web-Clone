import { useEffect } from "react";
import API from "./services/api";

const fetchChats = async () => {
  const res = await API.get("/conversations");
  console.log(res.data);
};

function App() {
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className='text-center text-5xl font-bold mt-20 text-txt-secondary'>
      Testing..
    </div>
  );
}

export default App;
