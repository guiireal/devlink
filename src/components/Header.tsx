import { signOut } from "firebase/auth";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router";
import { auth } from "../services/firebaseConnection";

export function Header() {
  async function handleLogout() {
    await signOut(auth);
    localStorage.removeItem("@devlink:user");
  }

  return (
    <header className="w-full max-w-2xl px-1 mt-4">
      <nav className="flex items-center justify-between w-full h-12 px-3 bg-white rounded-md">
        <div className="flex gap-4 font-medium">
          <Link to="/">Home</Link>
          <Link to="/admin">Links</Link>
          <Link to="/networks">Redes sociais</Link>
        </div>
        <button onClick={handleLogout}>
          <BiLogOut size="28" color="#db2629" />
        </button>
      </nav>
    </header>
  );
}
