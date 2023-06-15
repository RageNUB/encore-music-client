import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logoFooter from "../../assets/logo.svg";

const Footer = () => {
  return (
    <div>
      <div>
        <footer className="footer p-10 bg-base-100 gird grid-cols-1 lg:grid-cols-2 justify-center  text-base-content">
          <div>
            <img className="w-32" src={logoFooter} alt="" />
            <p>
              <span className="text-xl font-semibold">
                Encore Music Academy
              </span>
              <br />
              Summer Musical School since 2010
            </p>
          </div>
          <div>
            <span className="footer-title">Address</span>
            <a className="link link-hover">Mirpur-10, Dhaka, Bangladesh</a>
            <a className="link link-hover">
              Email: <span className="font-medium">encoremusic@gmail.com</span>
            </a>
            <a className="link link-hover">
              Mobile: <span>+880-1700011100</span>
            </a>
          </div>
        </footer>
      </div>

      <footer className="footer items-center p-4 bg-base-100 border-t-2 border-gray-50 text-base-content">
        <div className="items-center grid-flow-col">
          <p>© 2023 Encore Music Academy - @Jubaidul Islam Rimon</p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            className="text-2xl"
            href="https://www.facebook.com/jubaidul.islamrimon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF></FaFacebookF>
          </a>
          <a
            className="text-2xl"
            href="https://www.instagram.com/j_i_rimon/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram></FaInstagram>{" "}
          </a>
          <a
            className="text-2xl"
            href="https://www.linkedin.com/in/jirimon39/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn></FaLinkedinIn>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
