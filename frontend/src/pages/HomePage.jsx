import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {applicationTitle} from "../config/ApplicationTitle";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-[#790022] mb-8">{applicationTitle}</h1>
      <button
        onClick={() => navigate("/example")}
        className="px-8 py-4 bg-[#790022] hover:bg-[#9b0034] text-white font-semibold text-lg rounded-md shadow-lg transition cursor-pointer"
      >
        Voir un example
      </button>
    </div>
  );
}
