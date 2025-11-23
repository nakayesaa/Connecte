import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Discover from "./pages/Discover";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import SeePost from "./pages/Post";
import Test from "./pages/Test";
import { Toaster } from "./components/ui/toaster";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/" element={<Landing />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Post" element={<SeePost />} />
        <Route path="/Post" element={<SeePost />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
      <Toaster></Toaster>
    </BrowserRouter>
  </QueryClientProvider>
);
export default App;
