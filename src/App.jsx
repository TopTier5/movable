import { createBrowserRouter, RouterProvider } from "react-router";
import { useEffect } from "react";
import { VoiceProvider, useVoice } from "./components/VoiceContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import UserPage from "./pages/UserPage";
import Settings from "./pages/Settings";
import EditProfile from "./pages/EditProfile";

// Component that handles the global click listening for voice
const AppContent = () => {
  const { isVoiceEnabled, speakText } = useVoice();

  useEffect(() => {
    if (!isVoiceEnabled) return;

    const handleClick = (event) => {
      const element = event.target;
      const textContent = element.textContent || element.innerText;
      
      // Only read if there's meaningful text (more than just whitespace)
      if (textContent && textContent.trim().length > 0) {
        speakText(textContent.trim());
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isVoiceEnabled, speakText]);

  return <RouterProvider router={movAbleRouter} />;
};

const movAbleRouter = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/*', element: <NotFound /> },
  { path: '/userpage', element: <UserPage /> },
  { path: '/settings', element: <Settings /> },
  { path: '/editprofile', element: <EditProfile /> },
]);

function App() {
  return (
    <VoiceProvider>
      <AppContent />
    </VoiceProvider>
  );
}

export default App;