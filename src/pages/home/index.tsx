import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Social } from "../../components/Social";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-4">
      <h1 className="mt-20 text-3xl font-bold text-white md:text-4xl">
        Sujeito programador
      </h1>

      <span className="mt-3 mb-5 text-gray-50">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        <section className="w-full py-2 mb-4 transition-transform bg-white rounded-lg cursor-pointer select-none hover:scale-105">
          <a>
            <p className="text-base md:text-lg">Canal no YouTube</p>
          </a>
        </section>

        <footer className="flex justify-center gap-3 my-4">
          <Social url="https://facebook.com/guiireal">
            <FaFacebook size={35} color="#FFF" />
          </Social>
          <Social url="https://youtube.com/@devgui_">
            <FaYoutube size={35} color="#FFF" />
          </Social>
          <Social url="https://instagram.com/guiireal">
            <FaInstagram size={35} color="#FFF" />
          </Social>
        </footer>
      </main>
    </div>
  );
}
