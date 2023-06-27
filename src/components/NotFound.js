import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page Not Found</p>
      <button onClick={() => nav("/")}>Go to Homepage</button>
    </div>
  );
};

export default NotFound;
