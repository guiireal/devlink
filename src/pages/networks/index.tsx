import { doc, setDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { db } from "../../services/firebaseConnection";

export default function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await setDoc(doc(db, "social", "link"), {
      facebook,
      instagram,
      youtube,
    });
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-2 pb-7">
      <Header />

      <h1 className="mt-8 mb-4 text-2xl font-medium text-white">
        Minhas redes sociais
      </h1>

      <form className="flex flex-col w-full max-w-xl" onSubmit={handleSubmit}>
        <label className="my-2 font-medium text-white">Link do Facebook</label>
        <Input
          placeholder="Digite a URL do Facebook..."
          value={facebook}
          onChange={(event) => setFacebook(event.target.value)}
        />
        <label className="my-2 font-medium text-white">Link do Instagram</label>
        <Input
          placeholder="Digite a URL do Instagram..."
          value={instagram}
          onChange={(event) => setInstagram(event.target.value)}
        />
        <label className="my-2 font-medium text-white">Link do YouTube</label>
        <Input
          placeholder="Digite a URL do YouTube..."
          value={youtube}
          onChange={(event) => setYoutube(event.target.value)}
        />
        <button
          type="submit"
          className="flex items-center justify-center font-medium text-white bg-blue-600 rounded-md h-9 mb-7"
        >
          Salvar links
        </button>
      </form>
    </div>
  );
}
