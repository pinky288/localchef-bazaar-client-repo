import React from "react";
import logoImg from "../../../assets/chefLogo.jpg";
import { SiX } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-[#8D0B41] text-white p-10 flex flex-col gap-10">
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
        
        <div className="flex flex-col items-start gap-3">
          <img src={logoImg} alt="Logo" className="w-24 h-24" />
          <p className="font-semibold text-lg">LocalChefBazaar</p>
          <p>Fresh, homemade meals from local chefs.</p>
        </div>

        <div>
          <h6 className="font-bold mb-2">Contact</h6>
          <p>Email: info@localchefbazaar.com</p>
          <p>Phone: +880 1234 567 890</p>
          <p>Address: House 12, Road 7, Mirpur DOHS, Dhaka</p>
        </div>

        <div>
          <h6 className="font-bold mb-2">Working Hours</h6>
          <p>Mon–Fri: 9am–6pm</p>
          <p>Sat: 10am–4pm</p>
          <p>Sun: Closed</p>
        </div>

        <div>
          <h6 className="font-bold mb-2">Social</h6>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-3 border border-white rounded-full hover:bg-white hover:text-[#8D0B41] transition"
              aria-label="X"
            >
              <SiX />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="p-3 border border-white rounded-full hover:bg-white hover:text-[#8D0B41] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="p-3 border border-white rounded-full hover:bg-white hover:text-[#8D0B41] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center border-t border-white pt-4">
        <p>© 2025 LocalChefBazaar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
