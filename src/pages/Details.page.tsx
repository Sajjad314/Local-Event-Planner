import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const DetailsPage = () => {
  const { date, description, location, time, title, type } = useSelector(
    (state: RootState) => state.event
  );
  return (
    <div className=" mt-[94px] flex justify-center items-center">
      <div className="flex flex-col justify-center gap-10  p-4 items-center w-auto mt-6 lg:w-3/4 lg:mt-10 md:w-3/4 md:mt-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center justify-center px-5 py-8 gap-6">
          <div className="px-6">
            <div className="font-bold text-xl mb-2">{title}</div>
          </div>
          <div className=" text-sm font-semibold text-center text-gray-500">
            Description : {description}
          </div>
          <div className=" text-sm text-center font-semibold text-black">
            Date : {new Date(date).toLocaleDateString()}
          </div>
          <div className=" text-sm text-center font-semibold text-black">
            Time : {time}
          </div>
          <div className=" text-sm text-center font-semibold text-black">
            Location : {location}
          </div>
          <div className=" text-sm text-center font-semibold text-black">
            Event Type : {type}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
