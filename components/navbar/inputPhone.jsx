import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSearch } from "@/context/SearchContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

// Función para manejar el debounce
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function InputPhone({ onSearch }) {
  const { searchQuery, setSearchQueryContext } = useSearch(); // Obtenemos el contexto
  const [redirected, setRedirected] = useState(false);

  const { register, watch } = useForm({
    defaultValues: {
      search: searchQuery,
    },
  });
  const searchQueryValue = watch("search", searchQuery);

  const debouncedSearchQuery = useDebounce(searchQueryValue, 500);

  useEffect(() => {
    if (debouncedSearchQuery) {
      onSearch(debouncedSearchQuery || "");
      setSearchQueryContext(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, onSearch, setSearchQueryContext]);

  useEffect(() => {
    const path = window.location.pathname;

    if (path === "/card-filter") {
      localStorage.removeItem("redirected");
    }
  }, []);

  useEffect(() => {
    if (
      debouncedSearchQuery &&
      !redirected &&
      !localStorage.getItem("redirected") &&
      window.location.pathname !== "/card-filter"
    ) {
      setRedirected(true);
      localStorage.setItem("redirected", "true"); // Marcamos que ya se ha redirigido
      window.location.href = `/card-filter`;
    }
  }, [debouncedSearchQuery, redirected]);
  return (
    <form>
      <TextField
        variant="outlined"
        placeholder="Buscar productos..."
        size="small"
        sx={{
          display: { md: "none" },
          flexGrow: 1,
          mx: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
            borderRadius: 5,
          },
        }}
        {...register("search")}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
