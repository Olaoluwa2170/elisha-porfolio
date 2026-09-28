import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/hooks/useTheme";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// index.html ships static og:*/twitter:*/description tags so link-crawlers
// (which never run JS) get a correct preview for "/". Once React mounts,
// <SEO> (react-helmet-async) takes over managing those same tags per-route —
// this removes the original static ones so the two don't end up duplicated
// in the live DOM. Helmet's own tags carry data-rh and are never touched.
function useCleanupStaticMetaTags() {
  useEffect(() => {
    const selector = [
      'meta[property^="og:"]:not([data-rh])',
      'meta[name^="twitter:"]:not([data-rh])',
      'meta[name="description"]:not([data-rh])',
    ].join(", ");
    document.querySelectorAll(selector).forEach((el) => el.remove());
  }, []);
}

const App = () => {
  useCleanupStaticMetaTags();

  return (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
  );
};

export default App;
