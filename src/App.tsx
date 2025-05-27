import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvitePage from "./pages/InvitePage";
import AlbumPage from "./pages/AlbumPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invite/:inviteCode" element={<InvitePage />} />
        <Route path="*" element={<AlbumPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
