import { useTranslation } from "react-i18next";
import { FaFilter, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function ExampleBoard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const rows = [
    { id: 1, username: "jdoe", last_name: "Doe", first_name: "John", email: "jdoe@example.com", service: "IT", active: true },
    { id: 2, username: "asmith", last_name: "Smith", first_name: "Anna", email: "asmith@example.com", service: "HR", active: false },
    { id: 3, username: "bmartin", last_name: "Martin", first_name: "Bob", email: "bmartin@example.com", service: "Finance", active: true }
  ];
  const goHome = () => navigate("/home");
  return (
    <div className="min-h-screen p-10 bg-gradient-to-b from-gray-50 to-gray-200">
      <ToastContainer />

      <h1 className="text-4xl font-extrabold text-[#790022] text-center mb-12">
        {t("exampleBoardTitle")}
      </h1>

      <div className="max-w-6xl mx-auto overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow text-sm bg-white overflow-hidden">
          <thead className="bg-[#790022] text-white">
            <tr>
              <th className="p-3 text-left">{t("username")}</th>
              <th className="p-3 text-left">{t("lastName")}</th>
              <th className="p-3 text-left">{t("firstName")}</th>
              <th className="p-3 text-left">{t("Email")}</th>
              <th className="p-3 text-left">{t("service")}</th>
              <th className="p-3 text-center">{t("active")}</th>
              <th className="p-3 text-center">{t("actions")}</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r, index) => (
              <tr
                key={r.id}
                className={`transition hover:bg-gray-100 ${index % 2 === 1 ? "bg-gray-50" : ""}`}
              >
                <td className="p-3">{r.username}</td>
                <td className="p-3">{r.last_name}</td>
                <td className="p-3">{r.first_name}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">{r.service}</td>
                <td className="p-3 text-center">
                  <input type="checkbox" checked={r.active} readOnly className="cursor-not-allowed" />
                </td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 cursor-pointer" title={t("edit")}>
                      <FaEdit />
                    </button>
                    <button className="bg-red-600 text-white p-2 rounded hover:bg-red-700 cursor-pointer" title={t("delete")}>
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    <div className="flex items-center flex-col justify-center mt-4">
        <button
        onClick={goHome}
        className="px-10 py-3.5 rounded-full bg-[#790022] text-white font-semibold text-base shadow-md hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
        >
            {t("backHome")}
        </button>
    </div>
    </div>
  );
}
