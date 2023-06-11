import logoFooter from "../../assets/logo.svg"

const Footer = () => {
    return (
        <div>
      <div>
        <footer className="footer p-10 bg-base-200 gird grid-cols-1 lg:grid-cols-2 justify-center  text-base-content">
          <div>
            <img
              className="w-32"
              src={logoFooter}
              alt=""
            />
            <p>
              <span className="text-xl font-semibold">Encore Music Academy</span>
              <br />Summer Musical School since 2010
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

      <div className="footer footer-center p-4 bg-base-200 border-t-2 border-gray-50 text-base-content">
        <div>
          <p className="text-base font-semibold">
            Copyright © 2023 - All right reserved by Encore Music Academy
          </p>
        </div>
      </div>
    </div>
    );
};

export default Footer;