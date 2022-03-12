import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import ErrorPage from "./routes/ErrorPage";
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
