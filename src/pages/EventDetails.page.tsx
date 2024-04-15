import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Button,
  DatePickerProps,
} from "antd";
import { useState } from "react";
import axios from "axios";

const EventDetailsPage = () => {
  const [form] = Form.useForm();
  const [date, setDate] = useState<string>("");

  const onFinish = (values: any) => {
    const eventData = {
      title: values.title,
      description: values.description,
      date: date,
      time: values.time.format("HH:mm"),
      location: values.location,
      type: values.type,
    };
    console.log(eventData);

    axios
      .post("/api/events", eventData)
      .then((response) => {
        form.resetFields();
        console.log("Event created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      });
  };

  const handleDate: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    let parts = (dateString as string).split("-");
    let month = "";
    if (parts[1].length === 2) {
      month = parts[1][1];
    }
    let dateText = month + "/" + parts[2] + "/" + parts[0];
    setDate(dateText);
  };
  return (
    <div className=" mt-[94px] flex justify-center items-center">
      <div className="flex flex-col justify-center gap-10  p-4 items-center w-auto mt-6 lg:w-3/4 lg:mt-10 md:w-3/4 md:mt-10">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className=" w-2/3 flex-col items-center"
        >
          <div className=" grid grid-cols-2 w-full gap-5">
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please enter the description" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select the date" }]}
            >
              <DatePicker className="w-full" onChange={handleDate} />
            </Form.Item>
            <Form.Item
              label="Time"
              name="time"
              rules={[{ required: true, message: "Please select the time" }]}
            >
              <TimePicker format="HH:mm" className=" w-full" />
            </Form.Item>
            <Form.Item
              label="Location"
              name="location"
              rules={[
                { required: true, message: "Please select the location" },
              ]}
            >
              <Select>
                <Select.Option value="Conference Room A">
                  Conference Room A
                </Select.Option>
                <Select.Option value="Auditorium B">Auditorium B</Select.Option>
                <Select.Option value="Meeting Room C">
                  Meeting Room C
                </Select.Option>
                <Select.Option value="Function Hall D">
                  Function Hall D
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please select the type" }]}
            >
              <Select>
                <Select.Option value="Meetups">Meeting</Select.Option>
                <Select.Option value="Conference">
                  Communit Gathering
                </Select.Option>
                <Select.Option value="Workshop">Workshop</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item className=" w-full flex flex-row justify-center items-center">
            <Button type="primary" htmlType="submit">
              Create Event
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EventDetailsPage;
