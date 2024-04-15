import axios from "axios";
import { useEffect, useState } from "react";
import { EventResponse } from "../interface/EventResponse.interface";
import EventCardComponent from "../components/EventCard.component";
import { Input, DatePicker, DatePickerProps, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { uiPaths } from "../paths/uiPaths";
import { useDispatch } from "react-redux";
import { removeEvent, addEvent } from "../redux/EventSlice";

const Home = () => {
  const [selectedEvent, setSelectedEvent] = useState<string>("All Events");
  const [eventList, setEventList] = useState<EventResponse[]>([]);
  const [eventListApi, setEventListApi] = useState<EventResponse[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [locations, setLocations] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const eventType: string[] = [
    "All Events",
    "Meetups",
    "Workshops",
    "Communit Gathering",
  ];
  const { Option } = Select;

  const handleClick = (type: string) => {
    if (type === "All Events") {
      setEventList(eventListApi);
    } else {
      let arr = eventListApi.filter((item) => item.type === type);
      setEventList(arr);
    }
    setSelectedEvent(type);
  };

  const handleSearch = (searchStr: string) => {
    setSearchText(searchStr);
    let arr = eventListApi.filter((item) =>
      item.title.toLowerCase().includes(searchStr.toLowerCase())
    );
    setEventList(arr);
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("/api/events"); // Fetching data from MirageJS server
        console.log(response.data.events);

        setEventList(response.data.events);
        setEventListApi(response.data.events);
        let tempLoc: string[] = [];
        response.data.events.map((event: EventResponse) => {
          tempLoc.push(event.location);
        });
        setLocations(tempLoc);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchEvents();
    dispatch(removeEvent());
  }, []);

  const handleDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    let arr: EventResponse[] = [];
    eventListApi.map((item) => {
      let parts = (dateString as string).split("-");
      let month = "";
      if (parts[1].length === 2) {
        month = parts[1][1];
      }
      let date = month + "/" + parts[2] + "/" + parts[0];
      if (date === new Date(item.date).toLocaleDateString()) arr.push(item);
    });
    setEventList(arr);
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    let arr = eventListApi.filter((item) => item.location === value);
    setEventList(arr);
  };

  useEffect(() => {
    if (selectedDate) {
      console.log(selectedDate?.toUTCString());
    }
  }, [selectedDate]);

  const handleCardClick = (event: EventResponse) => {
    dispatch(addEvent(event));
    navigate(uiPaths.Details);
    console.log("hhhhhh");
  };
  return (
    <div className=" mt-[94px] flex justify-center items-center">
      <div className="flex flex-col justify-center gap-10  p-4 items-start w-auto mt-6 lg:w-3/4 lg:mt-10 md:w-3/4 md:mt-10">
        <div className="flex flex-col gap-6">
          <h1 className=" text-xl lg:text-3xl font-semibold text-black w-full \">
            Discover Local Events in your city: Your Gateway to Community
            Gatherings
          </h1>
          <p className=" text-sm lg:text-[18px] font-normal font-EBG text-black w-full">
            Welcome to Event Planner, your go-to destination for discovering and
            participating in exciting local events right here in our city!
            Whether you're looking for meetups, workshops, or community
            gatherings, we've got you covered. Start planning your next
            adventure in today!
          </p>
        </div>
        <div className="flex flex-row justify-between items-center gap-5 flex-wrap mt-10 w-full">
          <div className="flex flex-row gap-5 flex-wrap">
            {eventType.map((event) => {
              return (
                <p
                  onClick={() => {
                    handleClick(event);
                  }}
                  key={event}
                  className={`text-base text-gray-800 font-medium cursor-pointer ${
                    selectedEvent === event && " border-black border-b-2 pb-2"
                  }`}
                >
                  {event}
                </p>
              );
            })}
          </div>
          <div className=" bg-gray-200 text-black border-black border-1 rounded-md shadow focus:outline-none">
            <Input
              placeholder="Search"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ padding: "8px 12px ", width: "240px" }}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center gap-5 flex-wrap mt-10 w-full">
          <div className="flex flex-col lg:flex-row md:flex-row gap-4 ">
            <DatePicker
              placeholder="Select Date"
              onChange={handleDate}
              style={{ marginTop: "16px" }}
            />
            <Select
              placeholder="Select Location"
              value={selectedLocation}
              onChange={handleLocationChange}
              style={{ marginTop: "16px", width: 200 }}
            >
              {locations?.length > 0 &&
                locations?.map((location) => {
                  return (
                    <Option key={location} value={location}>
                      {location}
                    </Option>
                  );
                })}
            </Select>
            <Button
              style={{ marginTop: "16px" }}
              onClick={() => {
                setSelectedLocation("All");
                setEventList(eventListApi);
              }}
            >
              {" "}
              Clear
            </Button>
          </div>
          <Button
            style={{ marginTop: "16px", width: 150, height: 50 }}
            onClick={() => {
              navigate(uiPaths.EventDetails);
              dispatch(removeEvent());
            }}
          >
            {" "}
            Add New
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-2 w-full">
          {eventList.length > 0 &&
            eventList.map((eventItem) => (
              // <div id={event.id.toString()}>{JSON.stringify(event)}</div>
              <EventCardComponent
                key={eventItem.title}
                event={eventItem}
                handleClick={handleCardClick}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
