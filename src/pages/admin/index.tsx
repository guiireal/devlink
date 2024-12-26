import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { db } from "../../services/firebaseConnection";

type Link = {
  id: string;
  name: string;
  url: string;
  textColor: string;
  backgroundColor: string;
};

export default function Admin() {
  const [linkName, setLinkName] = useState("");
  const [url, setUrl] = useState("");
  const [textColor, setTextColor] = useState("#121212");
  const [backgroundColor, setBackgroundColor] = useState("#f1f1f1");

  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");

    const queryRef = query(linksRef, orderBy("created_at", "asc"));

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      const list: Link[] = [];

      snapshot.forEach((doc) => {
        const docData = doc.data();

        list.push({
          id: doc.id,
          name: docData.name,
          url: docData.url,
          textColor: docData.text_color,
          backgroundColor: docData.background_color,
        });
      });

      setLinks(list);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!linkName || !url) {
      alert("Preencha todos os campos!");
      return;
    }

    await addDoc(collection(db, "links"), {
      name: linkName,
      url,
      text_color: textColor,
      background_color: backgroundColor,
      created_at: new Date(),
    });

    setLinkName("");
    setUrl("");
    setTextColor("#121212");
    setBackgroundColor("#f1f1f1");
  }

  async function handleDeleteLink(id: string) {
    const linkRef = doc(db, "links", id);

    await deleteDoc(linkRef);
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-2 pb-7">
      <Header />

      <form
        className="flex flex-col w-full max-w-xl mt-8 mb-3"
        onSubmit={handleSubmit}
      >
        <label className="my-2 font-medium text-white">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={linkName}
          onChange={(event) => setLinkName(event.target.value)}
        />

        <label className="my-2 font-medium text-white">URL do Link</label>
        <Input
          placeholder="Digite a URL..."
          type="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />

        <section className="flex gap-5 my-4">
          <div className="flex gap-2">
            <label className="my-2 font-medium text-white">Cor do link</label>
            <input
              type="color"
              value={textColor}
              onChange={(event) => setTextColor(event.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <label className="my-2 font-medium text-white">Fundo do link</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(event) => setBackgroundColor(event.target.value)}
            />
          </div>
        </section>

        {linkName && (
          <div className="flex flex-col items-center justify-center p-1 border rounded-md mb-7 border-gray-100/25">
            <label className="mt-2 mb-3 font-medium text-white">
              Veja como está ficando
            </label>
            <article
              className="flex flex-col items-center justify-between w-11/12 max-w-lg px-1 py-3 rounded bg-zinc-900"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor,
              }}
            >
              <p className="font-medium" style={{ color: textColor }}>
                {linkName}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className="flex items-center justify-center gap-4 font-medium text-white bg-blue-600 rounded-md h-9 mb-7"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="mb-4 text-2xl font-bold text-white">Meus links</h2>

      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl px-2 py-3 mb-2 rounded select-none"
          style={{
            backgroundColor: link.backgroundColor,
            color: link.textColor,
          }}
        >
          <p>{link.name}</p>
          <div>
            <button
              className="p-1 border border-dashed rounded bg-neutral-900"
              onClick={() => handleDeleteLink(link.id)}
            >
              <FiTrash size="18" color="#FFF" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
