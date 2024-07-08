import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="grid place-items-center h-screen">
      <div>
        <h1 className="text-3xl text-center font-bold text-prim mb-4">
          404 Not Found
        </h1>
        <p className="text-center mb-4">
          A página que você tentou acessar não existe
        </p>
        <div className="text-center">
          <Link to="/" className="underline text-soft hover:text-prim w-full">
            Voltar
          </Link>
        </div>
      </div>
    </main>
  );
}
