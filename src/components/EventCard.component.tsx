import { Card, Typography, Space, Divider } from "antd";
import { EventResponse } from "../interface/EventResponse.interface";
const { Text } = Typography;

const EventCardComponent = ({
  event,
  handleClick,
}: {
  event: EventResponse;
  handleClick: Function;
}) => {
  const formattedDate = new Date(event.date).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div
      onClick={() => {
        handleClick(event);
      }}
      className=" cursor-pointer"
    >
      <Card
        className="event-card"
        title={event.title}
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Space direction="vertical" size="small">
          <Text style={{ color: "#333", fontSize: "16px" }}>
            {event.description}
          </Text>
          <Divider style={{ borderColor: "#1890ff" }} />
          <Space direction="horizontal">
            <Text strong style={{ color: "#1890ff" }}>
              Date & Time:
            </Text>
            <Text style={{ color: "#333" }}>
              {formattedDate} at {event.time}
            </Text>
          </Space>
          <Space direction="horizontal">
            <Text strong style={{ color: "#1890ff" }}>
              Location:
            </Text>
            <Text style={{ color: "#333" }}>{event.location}</Text>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default EventCardComponent;
