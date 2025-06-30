import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Navigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/loading/Loading";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const PaymentFrom = () => {
  const stripe = useStripe();
  const Elements = useElements();
  const { parcelId } = useParams();
  //   console.log(parcelId);
  const { user } = useAuth();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return <Loading />;
  }

  //   console.log(parcelInfo);
  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;
  //   console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !Elements) {
      return;
    }
    const card = Elements.getElement(CardElement);
    if (!card) {
      return;
    }

    // validated the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      //   console.log(paymentMethod);
      // create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });

      //   step-3: confirm payment
      const clientSecret = res.data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: Elements.getElement(CardElement), // ✅ This is where you pass the card
          billing_details: {
            name: user?.displayName, // Optional: you can make this dynamic
            email: user?.email,
          },
        },
      });
      if (error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setError("");
        console.log("✅ Payment Successful");
        console.log(result);
        // step-4: mark parcel paid also payment history
        const paymentData = {
          parcelId,
          email: user?.email,
          amount,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
        };
        const paymentRes = await axiosSecure.post("payments", paymentData);
        if (paymentRes.data.insertedId) {
          // ✅ Show success toast with transaction ID
          toast.success(`✅ Payment Successful!`);

          // ✅ Redirect after 3 seconds
          setTimeout(() => {
            Navigate("/dashboard/my-parcels");
          }, 3000);
        }
      }
      // console.log(res);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-2xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Complete Payment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded">
        <div className="border p-4 rounded-md shadow-sm">
          <CardElement className="text-gray-700" />
        </div>
        <button
          className="bg-blue-500 text-white w-full py-2 px-4 font-bold rounded"
          type="submit"
          disabled={!stripe}
        >
          PAY $ {amount}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentFrom;
