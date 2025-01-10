import {
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
import BtnComprarCart from "./BtnComprarCart";
import Image from "next/image";

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
            <Image
              src={props.images[0]}
              alt={props.details.flowerType}
              width={250}
              height={200}
              style={{
                borderRadius: "0 25px 0 25px",
                objectFit: "cover",
                width: "100%",
                overflow: "hidden",
              }}
            />
          </CardActionArea>
        </Link>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            padding: "0.5rem",
          }}
        >
          <Link href={`bouquet/${props._id}`} underline="none">
            <Typography
              sx={{
                fontSize: "1rem",
                textAlign: "start",
              }}
            >
              {props.name}
            </Typography>
          </Link>
          <Typography
            color="tertiary"
            sx={{ fontSize: "1rem", mb: 0 }}
          >{`$${props.price}`}</Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "center", mt: "auto" }}
        >
          <BtnComprarCart
            productId={props._id}
            name={props.name}
            image={props.images[0]}
            texto={"comprar"}
            sx={{ borderRadius: " 25px 0 25px 0", width: "100%" }}
          />
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
