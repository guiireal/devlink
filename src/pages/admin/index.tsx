import { useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

export default function Admin() {
  const [link, setLink] = useState("");
  const [url, setUrl] = useState("");
  const [textColor, setTextColor] = useState("#121212");
  const [backgroundColor, setBackgroundColor] = useState("#f1f1f1");

  return (
    <div className="flex flex-col items-center min-h-screen px-2 pb-7">
      <Header />

      <form className="flex flex-col w-full max-w-xl mt-8 mb-3">
        <label className="my-2 font-medium text-white">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={link}
          onChange={(event) => setLink(event.target.value)}
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
              Canal do YouTube
            </p>
          </article>
        </div>
      </form>
    </div>
  );
}
