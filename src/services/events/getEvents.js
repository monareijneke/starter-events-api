import eventsData from "../../data/events.json" assert { type: "json" };

const getEvents = () => {
  return eventsData.events;
};

export default getEvents;
