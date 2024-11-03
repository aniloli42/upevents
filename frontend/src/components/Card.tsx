import { THoliday } from "@/api/services";
import { FC } from "react";

type TCard = {
  holiday: THoliday;
};

const Card: FC<TCard> = ({ holiday }) => {
  return (
    <div className="py-4 px-6 bg-gray-200/20 backdrop-blur-lg rounded">
      <p className="text-white text-lg">{holiday.name}</p>
      <p className="text-white">
        {holiday.country.name} {holiday.date.iso}
      </p>
    </div>
  );
};

export default Card;
