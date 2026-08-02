import { Link } from "react-router-dom";
import {
  FaMoon,
  FaShoppingCart,
  FaSun,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

import logo from "../assets/logo.png";
import "../styles/Header.css";

function Header() {
  const { quantidadeTotal } = useCart();
  const { tema, alternarTema } = useTheme();

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="NasC Imports" />
        </Link>
      </div>

      <div className="header-brand">
        <h2>NasC Imports</h2>
      </div>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/">Produtos</Link>

        <Link
          to="/cart"
          className="cart-link"
          aria-label={`Carrinho com ${quantidadeTotal} itens`}
        >
          <FaShoppingCart className="cart-icon" />

          <span className="cart-count">
            {quantidadeTotal}
          </span>
        </Link>

        <button
          type="button"
          className="theme-toggle"
          onClick={alternarTema}
          aria-label={
            tema === "dark"
              ? "Ativar modo claro"
              : "Ativar modo escuro"
          }
          title={
            tema === "dark"
              ? "Ativar modo claro"
              : "Ativar modo escuro"
          }
        >
          {tema === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </nav>
    </header>
  );
}

export default Header;