import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const nav = useNavigate();

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
          <p
            onClick={() => nav(-1)}
            className="underline text-soft hover:text-prim w-full"
          >
            Voltar
          </p>
        </div>
      </div>
    </main>
  );
}
