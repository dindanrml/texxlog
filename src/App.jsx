import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import Homepage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import DetailPage from "./pages/DetailPage";

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
