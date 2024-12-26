import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen text-white">
      <h1 className="mb-4 text-4xl font-bold">Página não encontrada!</h1>
      <p className="mb-4 italic text-1xl">
        Você caiu em uma página que não existe!
      </p>

      <Link className="px-4 py-1 rounded-md bg-gray-50/20" to="/">
        Voltar para a home
      </Link>
    </div>
  );
}
