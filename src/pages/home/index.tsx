import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Social } from "../../components/Social";
import { db } from "../../services/firebaseConnection";

type Link = {
  id: string;
  name: string;
  url: string;
  textColor: string;
  backgroundColor: string;
};

type SocialLink = {
  facebook: string;
  instagram: string;
  youtube: string;
};

export default function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  const [socialLink, setSocialLink] = useState<SocialLink>();

  useEffect(() => {
    async function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created_at", "asc"));

      const docs = await getDocs(queryRef);

      const list: Link[] = [];

      docs.forEach((doc) => {
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
    }

    loadLinks();
  }, []);

  useEffect(() => {
    async function loadSocialLinks() {
      const docRef = doc(db, "social", "link");

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();
        setSocialLink({
          facebook: docData.facebook,
          instagram: docData.instagram,
          youtube: docData.youtube,
        });
      }
    }

    loadSocialLinks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full py-4">
      <h1 className="mt-20 text-3xl font-bold text-white md:text-4xl">
        Sujeito programador
      </h1>

      <span className="mt-3 mb-5 text-gray-50">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            className="w-full py-2 mb-4 transition-transform bg-white rounded-lg cursor-pointer select-none hover:scale-105"
            key={link.id}
            style={{
              backgroundColor: link.backgroundColor,
            }}
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <p
                className="text-base md:text-lg"
                style={{ color: link.textColor }}
              >
                {link.name}
              </p>
            </a>
          </section>
        ))}

        <footer className="flex justify-center gap-3 my-4">
          {socialLink && Object.keys(socialLink).length > 0 && (
            <>
              <Social url={socialLink.facebook}>
                <FaFacebook size={35} color="#FFF" />
              </Social>
              <Social url={socialLink.youtube}>
                <FaYoutube size={35} color="#FFF" />
              </Social>
              <Social url={socialLink.instagram}>
                <FaInstagram size={35} color="#FFF" />
              </Social>
            </>
          )}
        </footer>
      </main>
    </div>
  );
}
