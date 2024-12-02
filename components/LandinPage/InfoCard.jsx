import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material";

export default function InfoCard({ img, text }) {
  return (
    <Grid2 xs={12} md={6} lg={4} size={{ xs: 12, md: 6, lg: 4 }}>
      <Card sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <CardMedia
          component="img"
          image={img}
          sx={{
            width: "100%",
            height: "210px",
            objectFit: "contain",
          }}
        />
        <CardContent>
          <Typography variant="h6">{text}</Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
}
