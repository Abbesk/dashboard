import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RandomExampleRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const examples = ["/example-page", "/example-board", "/example-form"];
    const randomIndex = Math.floor(Math.random() * examples.length);
    const target = examples[randomIndex];
    navigate(target, { replace: true });
  }, [navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-[#790022] rounded-full animate-spin"></div>
    </div>
  );
}

