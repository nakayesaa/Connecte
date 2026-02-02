import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Discover from "./pages/Discover";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import SeePost from "./pages/Post";
import Test from "./pages/Test";
import { Toaster } from "./components/ui/toaster";
import Authentication from "./pages/Authentication";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/discover" element={<Discover />} />
        <Route path="/" element={<Landing />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Post" element={<SeePost />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/Authentication" element={<Authentication />} />
      </Routes>
      <Toaster></Toaster>
    </BrowserRouter>
  </QueryClientProvider>
);
export default App;
