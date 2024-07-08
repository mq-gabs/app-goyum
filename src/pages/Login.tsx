import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useApi } from "../hooks/api";
import { useStore } from "../hooks/user";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fetch, loading] = useApi();
  const { saveCredentials } = useStore();
  const navitation = useNavigate();

  const handleSubmit = async () => {
    const response = await fetch({
      path: "/auth",
      method: "POST",
      body: {
        email,
        password,
      },
    });

    if (!response) return;

    saveCredentials(response);

    navitation("/");
  };

  return (
    <main className="grid place-items-center h-screen p-4 bg-backg">
      <div className="p-4 border rounded border-soft">
        <form className="flex flex-col gap-4">
          <Input
            id="email"
            label="Email"
            placeholder="exemplo@mail.com"
            value={email}
            onChange={(value: string) => setEmail(value)}
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(value: string) => setPassword(value)}
          />
          <div className="flex flex-col">
            <Button onClick={handleSubmit} disabled={loading}>
              <div className="flex gap-2 justify-center items-center">
                {loading && (
                  <div>
                    <Loading />
                  </div>
                )}
                Entrar
              </div>
            </Button>

            <p className="text-center text-soft">ou</p>

            <Link to="/registrar" className="text-center underline">
              Crie sua conta
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
