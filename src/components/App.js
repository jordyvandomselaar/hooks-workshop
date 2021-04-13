import styled, { createGlobalStyle } from "styled-components";
import { Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Hotels from "./Hotels/Hotels";
import Detail from "./Detail/Detail";
import Form from "./Form/Form";
import HotelsContext from "../contexts/HotelsContext";
import React, { useMemo } from "react";
import DetailsContext from "../contexts/DetailsContext";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

const App = () => {
  const [hotels, setHotels] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [details, setDetails] = React.useState({});

  const detailsProviderData = useMemo(() => {
    return {
      details,
      setDetails
    };
  }, [details, setDetails]);

  React.useEffect(() => {
    window
      .fetch(
        "https://my-json-server.typicode.com/royderks/react-context-hooks-workshop/hotels"
      )
      .then((response) => response.json())
      .then((json) => {
        setHotels(json);
        setLoading(false);
        setError(false);
      });
  }, []);

  const hotelData = useMemo(() => {
    return {
      hotels,
      loading,
      error
    };
  }, [hotels, loading, error]);

  return (
    <>
      <GlobalStyle />
      <HotelsContext.Provider value={hotelData}>
        <DetailsContext.Provider value={detailsProviderData}>
          <AppWrapper>
            <Header />
            <Switch>
              <Route exact path="/" component={Hotels} />
              <Route path="/hotel/:id/new" component={Form} />
              <Route path="/hotel/:id" component={Detail} />
            </Switch>
          </AppWrapper>
        </DetailsContext.Provider>
      </HotelsContext.Provider>
    </>
  );
};

export default App;
