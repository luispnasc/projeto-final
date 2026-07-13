import "./Header.css";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo da Loja" />
        <h2>Nasc Imports</h2>
      </div>

      <nav>
        <ul>
          <li>Home</li>
          <li>Produtos</li>
          <li>Contato</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;