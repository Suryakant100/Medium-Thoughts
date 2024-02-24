import { Link } from "react-router-dom";
import pagenotfound from "../imgs/404.png";
import fullLogo from "../imgs/full-logo.png";

const PageNotFound = () => {
  return (

    <section className="h-cover relative p-10 pt-1 flex flex-col items-center gap-20
    text-center">
        <img className="w-96 aspect-auto select-none border-2 border-grey object-cover rounded p-20 pt-16 " src={pagenotfound} alt="page not found" />
        <h1 className="font-medium text-4xl font-mono">Page not found</h1>
        <p className="text-dark-grey text-xl -mt-8">The page you are looking for does'nt exist. Please head back to <Link to={"/"} className="text-black underline">Home page</Link>.</p>

        <div className="mt-auto">
            <img className="h-8 object-contain mx-auto select-none" src={fullLogo} alt="Logo" />
            <p className="mt-5 text-dark-grey">Read millions of stories around the world.</p>
        </div>

    </section>
  );
};

export default PageNotFound;
