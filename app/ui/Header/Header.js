import { playfairDisplay } from "../fonts";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Acme Media</h1>
      <nav className={`${playfairDisplay.className} nav`}>
        <ul className="nav__list">
            <li className="nav__item">Home</li>
            <li className="nav__item">Account</li>
        </ul>
      </nav>
    </header>
  );
}
