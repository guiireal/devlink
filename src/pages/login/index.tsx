import { FormEvent, useState } from "react";
import { Input } from "../../components/Input";
import { Logo } from "../../components/Logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    console.log({ email, password });
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
