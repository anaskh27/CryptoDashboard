export function CreditCard(props) {
  const { cardNumber = "1234 5678 9012 3456", cardOwner = "Anas Khan" } =
    props || {};

  return (
    <div className="relative w-[355px] h-[180px] rounded-[12px] p-6 flex flex-col justify-between bg-[url('/bg.png')] bg-cover bg-center text-white font-roboto">
      <img
        src="/chip.png"
        alt="Chip"
        className="absolute top-5 right-6 w-[53px] h-[34px]"
      />
      <div className="flex flex-col items-start">
        <div className="text-2xl text-[#181818] font-medium tracking-wider mt-14 font-courier">
          {props?.cardNumber}
        </div>
        <div className="text-lg mt-5 text-[#181818] text-grey  font-courier">
          {props?.cardOwner}
        </div>
      </div>
      <div className="flex justify-between font-courier ">
        <img
          className=" absolute w-[150px] h-[90px] left-2 top-0"
          src="/bank.png"
          alt="bank"
        />
        <img
          className=" absolute w-[65px] h-[22px] right-4 bottom-4"
          src="/visa.png"
          alt="visa"
        />
      </div>
    </div>
  );
}
export default CreditCard();
