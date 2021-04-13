import React from "react";

const HotelsContext = React.createContext();

export const useHotels = () => React.useContext(HotelsContext);

export default HotelsContext;
