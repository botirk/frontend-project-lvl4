import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const ChatGuard = ({ children }) => {
  const { username, token } = useSelector(state => state.auth);

  if (!username || !token) return <Navigate to={"/login"} />;
  return children;
}

export default ChatGuard;