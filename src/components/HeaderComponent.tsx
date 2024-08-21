import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const navigator = useNavigate();
  function home() {
    console.log("home --->");
    navigator("/");
  }
  return (
    // <div className="container">
    <nav className="navbar fixed-top navbar-dark bg-dark">
      <div className="container-fluid">
        <button type="button" className="btn btn-primary" onClick={home}>
          home
        </button>
        <a className="navbar-brand" href="/">
          Navbar
        </a>
      </div>
    </nav>
    // </div>
  );
};

export default HeaderComponent;
