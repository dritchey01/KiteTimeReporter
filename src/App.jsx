import "./styles/base/index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import AllRoutes from "./Routers/routes";

const App = () => {
  const users = [
    "Dj Ritchey",
    "Andy Greenhaw",
    "Fethi Akcay",
    "Mahesh Chandana",
  ];

  return (
    <Router>
      <Header />
      <AllRoutes users={users} />
    </Router>
  );
};

export default App;
