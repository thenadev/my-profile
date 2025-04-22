import ReactGA from "react-ga4";

interface GoogleEventParams {
  [key: string]: string | number | boolean;
}

export const sendGoogleEvent = (
  eventName: string,
  params?: GoogleEventParams
) => {
  try {
    ReactGA.event({
      category: "Website Calculator",
      action: eventName,
      ...params,
    });
    console.log("Sending Google event:", eventName, params);
  } catch (error) {
    console.error("Error sending Google event:", error);
  }
};
