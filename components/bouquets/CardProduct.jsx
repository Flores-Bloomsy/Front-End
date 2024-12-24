import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  Link,
  Typography,
} from "@mui/material";
import BtnShopingCart from "../BtnShoppingCart";

export default function CardProduct({ props }) {
  return (
    <Grid2 xs={12} sm={6} md={4} lg={4} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
      <Card
        sx={{
          borderRadius: "0 25px 0 0",
          boxShadow: 2,
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
        }}
      >
        <Link href={`bouquet/${props._id}`} underline="none">
          <CardActionArea>
            <CardMedia
              sx={{ borderRadius: "0 25px 0 25px" }}
              component="img"
              image={props.images[0]}
              alt={props.details.flowerType}
            ></CardMedia>
          </CardActionArea>
        </Link>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <Link href={`bouquet/${props._id}`} underline="none">
            <Typography
              sx={{
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              {props.name}
            </Typography>
          </Link>
          <Typography color="tertiary">{`$${props.price}`}</Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "center", mt: "auto" }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: " 25px 0 25px 0",
              width: "100%",
            }}
          >
            Comprar
          </Button>
          <BtnShopingCart
            productId={props._id}
            name={props.name}
            image={props.images[0]}
          />
        </CardActions>
      </Card>
    </Grid2>
  );
}
