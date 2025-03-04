
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-trialos-neutral p-6">
      <div className="glass-panel rounded-2xl p-8 max-w-md w-full text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-trialos-blue/10 flex items-center justify-center mb-6">
          <AlertTriangle size={32} className="text-trialos-blue" />
        </div>
        <h1 className="text-4xl font-bold text-trialos-blue mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <button 
          onClick={() => navigate("/")}
          className="btn-primary rounded-lg py-3 px-6 flex items-center justify-center mx-auto"
        >
          <ArrowLeft size={18} className="mr-2" />
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
