
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Suggestions from "./pages/Suggestions";
import Kanban from "./pages/Kanban";
import SubmitFeedback from "./pages/SubmitFeedback";
import SuggestionDetail from "./pages/SuggestionDetail";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/suggestions" element={<Layout><Suggestions /></Layout>} />
          <Route path="/suggestions/:id" element={<Layout><SuggestionDetail /></Layout>} />
          <Route path="/kanban" element={<Layout><Kanban /></Layout>} />
          <Route path="/submit" element={<Layout><SubmitFeedback /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
