import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="container px-8 mx-auto py-4 _container">
      <nav className="flex justify-between items-center">
        <div>
          <img src="/logo.png" alt="Schedulify" className="h-28 object-cover" />
        </div>
        <nav>
          <ul className="flex gap-10 text-xl items-center">
            <li>
              <Link to="login">Login</Link>
            </li>
            <li className="border px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 ease-linear duration-100 transition-colors text-white font-semibold">
              <Link to="signup">Signup</Link>
            </li>
          </ul>
        </nav>
      </nav>
    </div>
  );
};

export default NavBar;
