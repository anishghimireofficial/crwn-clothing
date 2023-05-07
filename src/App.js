import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Homepage/Home";
import Shop from "./Pages/Shop/Shop";
import Navigation from "./components/navigation/navigation.component.jsx";
import SignIn from "./Pages/Sign-In/SignIn";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="signIn" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
