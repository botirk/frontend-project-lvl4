import Chat from "../components/chat";
import ChatGuard from "../components/chatGuard";




const Index = () => {
  return <ChatGuard>
    <Chat />
  </ChatGuard>;
}

export default Index;