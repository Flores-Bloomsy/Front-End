import React from "react";
import { Controller } from "react-hook-form";
import { TextField, FormHelperText, Box } from "@mui/material";

const InputField = ({
  name,
  control,
  errors,
  isSubmitted,
  rules,
  label,
  type = "text",
  bgColor = "F6F9FF",
}) => {
  return (
    <Box>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextField
              {...field}
              label={label}
              type={type}
              variant="filled"
              error={isSubmitted && !!errors[name]}
              fullWidth
              sx={{
                backgroundColor: "#F6F9FF",
              }}
            />
            {isSubmitted && error && (
              <FormHelperText
                error
                sx={{
                  width: "100%",
                  backgroundColor: "#FFB8A7",
                  marginTop: "0",
                }}
              >
                {error.message}
              </FormHelperText>
            )}
          </>
        )}
      />
    </Box>
  );
};

export default InputField;
