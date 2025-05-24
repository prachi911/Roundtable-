
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MotionAnalysis from "./pages/MotionAnalysis";
import SpeechGenerator from "./pages/SpeechGenerator";
import ResearchAssistant from "./pages/ResearchAssistant";
import JudgeFeedback from "./pages/JudgeFeedback";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import PracticeArena from "./pages/PracticeArena";
import About from "./pages/About";
import Formats from "./pages/Formats";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/motion-analysis" element={<MotionAnalysis />} />
          <Route path="/speech-generator" element={<SpeechGenerator />} />
          <Route path="/research" element={<ResearchAssistant />} />
          <Route path="/judging" element={<JudgeFeedback />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
          <Route path="/practice" element={<PracticeArena />} />
          <Route path="/about" element={<About />} />
          <Route path="/formats" element={<Formats />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
