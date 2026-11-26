import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Feed } from "./Pages/Feed.tsx";
import { Login } from "./Pages/Login.tsx";
import { Profile } from "./Pages/Profile.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
