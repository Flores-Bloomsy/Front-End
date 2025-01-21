import theme from "@/theme";
import { Box, Typography } from "@mui/material";

function Title({ title, subtitle, sx }) {
  return (
    <Box sx={{ marginTop: 3, ...sx }}>
      <Typography
        variant="h1"
        sx={{
          fontFamily: "Lora, serif",
          fontSize: {
            xs: "1.50rem",
            md: "2.25rem",
          },
          fontWeight: 600,
          my: "1rem",
          ...sx,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h4"
          sx={{
            fontSize: "1.25rem",
            mb: "2rem",
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

export default Title;
