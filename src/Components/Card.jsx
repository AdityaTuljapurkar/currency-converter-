import { useId } from "react";

function Card({
  label,
  selectCurrency = "inr",
  onCurrencyChange,
  currencyDropdown = [], // ✅ correct spelling
  selectAmount,
  className = "",
  onAmountChange,
}) {
  const amountInputId = useId();

  return (
    <div className={`Card-BG ${className} bg-[#2e234b] flex gap-4 p-4`}>
      {/* LEFT: Amount input */}
      <div className="amountBox w-1/2 flex flex-col rounded-2xl shadow-md p-4 bg-[#372b57]">
        <div className="flex justify-between">
          <label htmlFor={amountInputId} className="text-xl m-2 p-2 text-white">
            {label}
          </label>
          <span className="text-xl m-2 p-2 text-white">{selectAmount}</span>
        </div>
        <input
          id={amountInputId}
          type="text"
          value={selectAmount}
          onChange={(e) => {
            const val = Number(e.target.value);
            onAmountChange && onAmountChange(isNaN(val) ? 0 : val);
          }}
          className="w-full bg-amber-50/10 border-b border-gray-50 text-white focus:outline-none px-2"
        />
      </div>

      {/* RIGHT: Currency dropdown */}
      <div className="amountBox w-1/2 flex flex-col rounded-2xl shadow-md p-4 bg-[#372b57]">
        <label htmlFor="currency" className="text-xl m-2 p-2 text-white">
          Currency
        </label>
        <div className="flex justify-between items-center">
          <select
            id="currency"
            value={selectCurrency}
            onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
            className="w-1/2 bg-amber-50/10 border-b border-gray-50 text-black text-xl focus:outline-none px-2"
          >
            {currencyDropdown.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
          <div className="text-2xl text-white">{selectCurrency.toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
