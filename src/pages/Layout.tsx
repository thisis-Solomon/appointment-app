import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <main className="container px-8 mx-auto font-thin _container">
        <Outlet />
      </main>
    </>
  );
}
