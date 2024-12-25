import { Link } from "react-router";

export function Logo() {
  return (
    <Link to="/">
      <h1 className="text-5xl font-bold text-white mb-7 mt-11">
        Dev
        <span className="text-transparent bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text">
          Link
        </span>
      </h1>
    </Link>
  );
}
