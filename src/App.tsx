import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import MessageCreatePage from "./pages/MessageCreatePage";
import MessageListPage from "./pages/MessageListPage";
import CategoryCreatePage from "./pages/CategoryCreatePage";
import CategoryListPage from "./pages/CategoryListPage";
import TransactionCreatePage from "./pages/TransactionCreatePage";
import TransactionListPage from "./pages/TransactionListPage";
import TransactionVisualization from "./pages/TransactionVisualization";
import TransactionFileUpload from "./pages/TransactionFileUpload";
import Navbar from "./components/Navbar";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/message/create" element={<MessageCreatePage />} />
            <Route path="/message/list" element={<MessageListPage />} />
            <Route path="/category/create" element={<CategoryCreatePage />} />
            <Route path="/category/list" element={<CategoryListPage />} />
            <Route
              path="/transaction/create"
              element={<TransactionCreatePage />}
            />
            <Route path="/transaction/list" element={<TransactionListPage />} />
            <Route
              path="/transaction/visualize"
              element={<TransactionVisualization />}
            />
            <Route path="/" element={<Navigate to="/message/list" />} />
            <Route
              path="/transaction/upload"
              element={<TransactionFileUpload />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
