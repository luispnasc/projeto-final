import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();

function carregarTemaSalvo() {
  return localStorage.getItem("nasc-imports-tema") || "dark";
}

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(carregarTemaSalvo);

  function alternarTema() {
    setTema((temaAtual) =>
      temaAtual === "dark" ? "light" : "dark"
    );
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);

    localStorage.setItem("nasc-imports-tema", tema);
  }, [tema]);

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const contexto = useContext(ThemeContext);

  if (!contexto) {
    throw new Error(
      "useTheme deve ser utilizado dentro de ThemeProvider"
    );
  }

  return contexto;
}