import React, { useState } from "react";
import { BiLogoSoundcloud } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";
import { Link, useNavigate } from "react-router-dom";
import vnpay from "../../assets/icons/vnpay.png";
import { vnpayPayment } from "../../apis/payment/vnpayPayment";
import Footer from "../../components/footer/Footer";

const PremiumPage = () => {
  const [bill, setBill] = useState(183500);
  const [billCycle, setBillCycle] = useState("Monthly");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  const handlePayment = async (e) => {
    e.preventDefault();

    const response = await vnpayPayment(183500);
    if (response.ok) {
      const data = await response.json();
      window.location.href = data.url;
      dispatch({
        type: "APPEND_NOTIFICATION",
        text: "Failed to process payment!",
        icon: "error",
      });
    }
  };

  return (
    <div className="w-full px-[5%]">
      <header className="w-full flex justify-between items-center mb-10">
        <Link to="/">
          <BiLogoSoundcloud className="text-[50px]" />{" "}
        </Link>
        <div className="flex items-center">
          <img
            src={user.avatarUrl}
            alt="user avatar"
            className="w-[25px] h-[25px] rounded-full"
          />
          <p className="text-xs ml-3">{user.username}</p>
        </div>
      </header>

      <form
        onSubmit={handlePayment}
        className="text-[13px] flex w-full justify-center"
      >
        <div className="w-[450px] mr-16">
          <h1 className="text-xl font-normal mb-6">1. Select billing cycle</h1>

          {/* monthly */}
          <div className="mb-5">
            <input
              checked
              type="radio"
              id="bill-monthly"
              name="bill"
              className="hidden peer"
              onClick={() => {
                setBillCycle("Monthly");
                setBill(183500);
              }}
            />
            <label
              className="px-5 py-3 cursor-pointer flex border border-[#999] w-full peer-checked:border-[#f50] hover:border-black rounded-[4px]"
              for="bill-monthly"
            >
              <div className="flex justify-center items-center">
                <div>
                  <h3 className="text-[16px] font-normal">Monthly billing</h3>
                  <p>₫183,500/month</p>
                </div>
              </div>
            </label>
          </div>

          {/* yearly */}
          <div className="mb-10">
            <input
              type="radio"
              id="bill-yearly"
              name="bill"
              className="hidden peer"
              onClick={() => {
                setBillCycle("Yearly");
                setBill(1140000);
              }}
            />
            <label
              className="px-5 py-3 cursor-pointer flex group border border-[#999] peer-checked:border-[#f50] hover:border-black w-full rounded-[4px] mb-3"
              for="bill-yearly"
            >
              <div className="flex items-center justify-between w-full">
                <div>
                  <h3 className="text-[16px] font-normal">Yearly billing</h3>
                  <p>₫1,140,000, that’s ₫95,000/month</p>
                </div>
                <p className="bg-[#999] uppercase h-fit ml-2 text-white text-[11px] rounded-sm px-1 peer-checked:group-[]:bg-[#dd3500] group-hover:bg-black ">
                  48% YEARLY DISCOUNT
                </p>
              </div>
            </label>
          </div>

          {/* payment detail and method */}
          <h1 className="text-xl font-normal text-black mb-6">
            2. Add payment details
          </h1>

          {/* vnpay */}
          <div className="mb-5">
            <input
              checked
              type="radio"
              id="method-vnpay"
              name="method"
              className="hidden peer"
            />
            <label
              className="px-5 py-3 cursor-pointer flex border border-[#999] w-full peer-checked:border-[#f50] hover:border-black rounded-[4px]"
              for="method"
            >
              <div className="flex justify-between items-center w-full">
                <h3 className="text-[16px] font-normal">VNPay</h3>
                <img src={vnpay} alt="vnpay logo" className="h-[25px]" />
              </div>
            </label>
          </div>
        </div>

        {/* review purchase */}
        <div className="w-[450px] text-[#666]">
          <h1 className="text-xl font-normal text-black mb-6">
            3. Review your purchase
          </h1>
          <div className="w-full bg-[#f3f3f3] p-5 mb-6">
            <div className="grid grid-cols-2 gap-3 mb-5 text-black font-normal text-sm [&>*:nth-child(even)]:text-right">
              <p className="text-xl">Total</p>
              <p className="text-xl">₫{bill}</p>
              <p>Billing cycle</p>
              <p>{billCycle}</p>
            </div>
            <p className="mb-5">
              Subscription will automatically renew at ₫183,500 every month,
              starting Sep 12, 2023, unless you cancel before the day of your
              next renewal in your subscription settings.
            </p>
            <p>All prices in VND</p>
          </div>

          {/* demo account */}
          <div className="w-full bg-[#f3f3f3] p-5 mb-6">
            <div className="grid grid-cols-2 gap-3 text-black text-xs [&>*:nth-child(even)]:text-right">
              <p className="font-normal text-sm">Sandbox demo account:</p>
              <p></p>
              <p>Number:</p>
              <p>9704198526191432198</p>
              <p>Name:</p>
              <p>NGUYEN VAN A</p>
              <p>Publish date:</p>
              <p>07/15</p>
              <p>OTP:</p>
              <p>123456</p>
            </div>
          </div>
          {/* purchase button */}
          <button
            className="bg-[#0070ba] w-full text-[16px] font-normal text-white rounded-sm py-3 mb-6"
            type="submit"
          >
            Continue
          </button>

          <p>
            By submitting your payment information and clicking Continue with
            PayPal you agree to the{" "}
            <span>
              <a className="cursor-pointer text-[#044dd2]">
                Terms of Use for Artist Subscriptions
              </a>
            </span>{" "}
            and{" "}
            <span>
              <a className="cursor-pointer text-[#044dd2]">Privacy Policy</a>
            </span>
          </p>
        </div>
      </form>

      <Footer className={"mt-10 border-t pt-5"} />
    </div>
  );
};

export default PremiumPage;
