import instagramIcon from "../assets/instagram-white.svg";
import phoneIcon from "../assets/phone-white.svg";
import telegramIcon from "../assets/telegram-white.svg";

import { useDispatch, useSelector } from "react-redux";
import { fetchContact } from "../features/contacts";
import { RootState, AppDispatch } from "../store/store";
import { useEffect } from "react";

const Socials = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.contact);

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <div className="fixed md:top-[45%] top-[65%] right-0 z-50 bg-[#E8003D] rounded-l-[5px]">
      {data?.instagram && (
        <a
          href={data.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="block border-gray-100 group py-4 p-3"
        >
          <img
            src={instagramIcon}
            alt="Instagram"
            loading="lazy"
            className="w-[20px] h-[19px] group-hover:scale-110 transition-transform duration-200"
          />
        </a>
      )}
      {data?.phone_main && (
        <a
          href={`tel:${data.phone_main}`}
          className="block border-y border-[#FFFFFF99] py-4 p-3 group"
        >
          <img
            src={phoneIcon}
            alt="Phone"
            loading="lazy"
            className="w-[20px] h-[19px] group-hover:scale-110 transition-transform duration-200"
          />
        </a>
      )}
      {data?.telegram && (
        <a
          href={data.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="block py-4 p-3 group"
        >
          <img
            src={telegramIcon}
            alt="Telegram"
            loading="lazy"
            className="w-[20px] h-[19px] group-hover:scale-110 transition-transform duration-200"
          />
        </a>
      )}
    </div>
  );
};

export default Socials;