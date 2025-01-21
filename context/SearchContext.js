import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQueryContext, setSearchQueryContext] = useState("");

  return (
    <SearchContext.Provider
      value={{ searchQueryContext, setSearchQueryContext }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
