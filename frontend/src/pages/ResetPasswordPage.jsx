import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {apiLink} from '../config/ApiLink';

export default function ResetPasswordPage() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${apiLink}/reset-password-confirm/${uidb64}/${token}/`,
        { new_password: password }
      );
      toast.success("Mot de passe réinitialisé avec succès !");
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.detail || err.response?.data?.error || 
        "Erreur lors de la réinitialisation du mot de passe"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Réinitialiser le mot de passe</h2>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#790022] text-white py-2 rounded transition-colors duration-300
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#5e001b] cursor-pointer'}
          `}
        >
          {loading ? 'Chargement...' : 'Réinitialiser'}
        </button>
      </form>
    </div>
  );
}
