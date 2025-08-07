import ChatWindow from "../components/ChatWindow";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div className='h-screen flex flex-col md:flex-row'>
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default Home;
