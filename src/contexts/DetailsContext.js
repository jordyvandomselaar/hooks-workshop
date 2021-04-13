import React from "react";

const DetailsContext = React.createContext();

export const useDetails = (hotelId) => {
  const { details, setDetails } = React.useContext(DetailsContext);

  React.useEffect(() => {
    const urlHotel = `https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${hotelId}`;
    const hotelDetailsPromise = window
      .fetch(urlHotel)
      .then((response) => response.json());

    const urlReviews = `https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels/${hotelId}/reviews`;
    const hotelReviewsPromise = window
      .fetch(urlReviews)
      .then((response) => response.json());

    Promise.all([hotelDetailsPromise, hotelReviewsPromise])
      .then(([details, reviews]) => {
        setDetails((prevState) => {
          return {
            ...prevState,
            [hotelId]: {
              details: details,
              reviews: reviews
            }
          };
        });
      })
      .catch((error) => {
        setDetails((prevState) => {
          return {
            ...prevState,
            [hotelId]: {
              error: error
            }
          };
        });
      });
  }, [hotelId, setDetails]);

  return details[hotelId];
};

export default DetailsContext;
