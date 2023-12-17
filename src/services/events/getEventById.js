import eventData from "../../data/events.json" assert { type: "json" };

getEventById = id => {
  return eventData.events.find(event => event.id === id);
};

export default getEventById;
