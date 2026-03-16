import LoginForm from '../components/Login/LoginForm';

export default function LoginPage({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm onLogin={onLogin} />
    </div>
  );
}
