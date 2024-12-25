import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../../components/Input";
import { Logo } from "../../components/Logo";
import { auth } from "../../services/firebaseConnection";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      if (!response.user) {
        alert("Usuário ou senha incorretos!");
      }

      await navigate("/admin", { replace: true });
    } catch (error) {
      console.log(error);
      alert("Usuário ou senha incorretos!");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Logo />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-xl px-2"
      >
        <Input
          placeholder="Digite o seu e-mail"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          placeholder="**********"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          className="text-lg font-medium text-white bg-blue-600 border-0 rounded h-9"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
