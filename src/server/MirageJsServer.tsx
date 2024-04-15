// In a separate file like mirageServer.js
import { createServer, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      event: Model,
    },

    seeds(server) {
      server.create("event", {
        title: "Sample Event 1",
        description: "This is a sample event",
        date: "2024-04-15",
        time: "10:00 AM",
        location: "Sample Location",
        type: "Sample Type",
      } as any);
      server.create("event", {
        title: "Event 2",
        description: "Description for Event 2",
        date: "2024-04-15T14:30:00Z",
        time: "14:15",
        location: "Auditorium B",
        type: "Meetups",
      } as any);
      server.create("event", {
        title: "Event 3",
        description: "Description for Event 3",
        date: "2024-04-15T14:30:00Z",
        time: "11:00",
        location: "Meeting Room C",
        type: "Workshops",
      } as any);
      server.create("event", {
        title: "Event 4",
        description: "Description for Event 4",
        date: "2024-04-15T14:30:00Z",
        time: "16:45",
        location: "Function Hall D",
        type: "Communit Gathering",
      } as any);
      server.create("event", {
        id: 5,
        title: "Event 5",
        description: "Description for Event 5",
        date: "2024-04-15T14:30:00Z",
        time: "10:00",
        location: "Conference Room A",
        type: "Communit Gathering",
      } as any);
    },

    routes() {
      this.namespace = "api";

      this.get("/events", (schema) => {
        return schema.all("event");
      });

      this.post("/events", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.create("event", attrs);
      });
    },
  });

  return server;
}
