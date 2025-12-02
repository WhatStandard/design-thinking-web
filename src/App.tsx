import LandingPage from "./pages/LandingPage";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import CommunityHome from "./components/CommunityHome";
import QuizPage from "./components/QuizPage";
import KBOTeamsPage from "./components/KBOTeamsPage";
import LoginPage from "./components/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// [edit] 로그인 상태 확인 컴포넌트
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
    };
    
    checkLoginStatus();
    
    // 로그인 상태 변경 감지
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (isLoggedIn === null) {
    // 로딩 중
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-lg text-muted-foreground">로딩 중...</div>
    </div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* [edit] 로그인 페이지는 보호 없이 접근 가능 */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* [edit] 나머지 모든 페이지는 로그인 필요 */}
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><CommunityHome /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path="/kbo-teams" element={<ProtectedRoute><KBOTeamsPage /></ProtectedRoute>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
