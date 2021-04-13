import React from "react";
import styled from "styled-components";
import SubHeader from "../Header/SubHeader";
import HotelItem from "../Hotels/HotelItem";
import ReviewItem from "./ReviewItem";
import { useDetails } from "../../contexts/DetailsContext";

const ReviewsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`;

const Alert = styled.span`
  width: 100%;
  text-align: center;
`;

const Detail = ({ match, history }) => {
  const { details: hotel, reviews, loading, error } = useDetails(
    match.params.id
  ) ?? {
    loading: true, // If we don't have any data yet, it's loading
    error: false // If there is no data yet, there's also no error yet =)
  }; // Last minute changing code to make it work! Go JordY!!
  // Hahahah, it works now! If you go to a detail, then back to
  // the overview and back into the detail again it should load instantly
  // Yeaaah Cool!!

  // We accidentally did 10th last bonus :') instead of going 4-5-6...sorry...bad influence
  // And using codbox to chat!! :)))
  // Def :P There's actually a chat box on the left
  return !loading && !error ? (
    <>
      {history && hotel && (
        <SubHeader
          goBack={() => history.goBack()}
          title={hotel.title}
          openForm={() => history.push(`${match.url}/new`)}
        />
      )}
      <HotelItem data={hotel} />

      <h3>Reviews:</h3>
      <ReviewsWrapper>
        {reviews &&
          reviews.map((review) => <ReviewItem key={review.id} data={review} />)}
      </ReviewsWrapper>
    </>
  ) : (
    <Alert>{loading ? "Loading..." : error}</Alert>
  );
};

export default Detail;
