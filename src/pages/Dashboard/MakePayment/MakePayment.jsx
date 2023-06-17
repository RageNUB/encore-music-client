import { useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { FaDollarSign, FaUserGraduate } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const MakePayment = () => {
  const loaderdata = useLoaderData();
  const { class_name, image, price, instructor_name } = loaderdata;
  const total = parseFloat(price);

  const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK_key);
  return (
    <div className="w-full">
        <Helmet>
        <title>Encore Music Academy | Payment</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center mb-8">
        Make Your Payment for <span className="text-primary">{class_name}</span>
      </h1>
      <div className="flex justify-center mt-5">
        <div
          className={`card card-compact w-96 lg:w-[30rem] shadow-xl mb-8 bg-base-200`}
        >
          <figure>
            <img className="h-60 w-full" src={image} alt={class_name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{class_name}</h2>
            <p className="flex items-center gap-2 font-medium text-md">
              <span className="flex items-center gap-2 font-bold">
                <FaUserGraduate></FaUserGraduate>Instructor :
              </span>{" "}
              {instructor_name}
            </p>
            <p className="flex items-center gap-2 font-medium text-md">
              <span className="flex items-center gap-2 font-bold">
                <FaDollarSign></FaDollarSign> Price :
              </span>{" "}
              ${total}
            </p>
            <div className="mt-5">
              <Elements stripe={stripePromise}>
                <CheckoutForm price={total} data={loaderdata}></CheckoutForm>
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
