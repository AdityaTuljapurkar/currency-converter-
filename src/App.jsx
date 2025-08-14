import { useState } from "react";
import Card from "./Components/Card";
import "./App.css";
import fetchCurrencyInfo from "./hooks/fetchCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { data: rates, loading } = fetchCurrencyInfo(from);

  const options = Object.keys(rates || {});

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(0);
  };

  const convert = () => {
    if (rates && rates[to]) {
      setConvertedAmount(amount * rates[to]);
    } else {
      setConvertedAmount(0);
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading currency data...</div>;
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundColor: "hsla(257, 36%, 22%, 1)",
        backgroundImage:
          "linear-gradient(135deg, hsla(257, 36%, 22%, 1) 20%, hsla(261, 84%, 45%, 1) 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-1">
            <Card
              label="from"
              selectCurrency={from}
              currencyDropdown={options} // ✅ correct prop name
              onCurrencyChange={setFrom}
              selectAmount={amount}
              onAmountChange={setAmount}
            />
          </div>

          <div className="relative w-full h-0.5">
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              onClick={swap}
            >
              swap
            </button>
          </div>

          <div className="w-full mt-1 mb-4">
            <Card
              label="to"
              selectCurrency={to}
              currencyDropdown={options} // ✅ correct prop name
              onCurrencyChange={setTo}
              selectAmount={convertedAmount}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
