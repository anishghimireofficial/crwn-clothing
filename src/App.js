import { Route, Routes } from "react-router-dom";

import Authencation from "./Pages/Authencation/Authencation";
import Navigation from "./components/navigation/navigation.component.jsx";
import Home from "./Pages/Homepage/Home";
import Shop from "./Pages/Shop/Shop";
import CheckOut from "./Pages/checkout/CheckOut";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="auth" element={<Authencation />} />
          <Route path="checkout" element={<CheckOut />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
