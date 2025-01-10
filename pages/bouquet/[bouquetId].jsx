import ProductInfo from "@/components/bouquets/ProductInfo";
import ProductPurcheaseSection from "@/components/bouquets/ProductPurchaseSection";
import { getAllProduct, getProductById } from "@/utils/apiProduct";
import { CardMedia, Container } from "@mui/material";

export default function BouquetDetail({ bouquet }) {
  //console.log(bouquet);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        my: 4,
      }}
    >
      <ProductInfo props={bouquet} />
      <CardMedia
        component="img"
        alt={bouquet.name}
        src={bouquet.images[0]}
        title={bouquet.name}
        sx={{
          minWidth: { sx: "auto", md: "22.5rem" },
          maxHeight: { sx: "auto", md: "30rem" },
          objectFit: "cover",
        }}
      />
      <ProductPurcheaseSection props={bouquet} />
    </Container>
  );
}

export async function getStaticPaths() {
  const Bouquets = await getAllProduct();

  const paths = Bouquets.map((bouquet) => ({
    params: {
      bouquetId: bouquet._id.toString(),
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { bouquetId } = params;

  const bouquet = await getProductById(bouquetId);
  if (!bouquet) return { notFound: true };

  return {
    props: {
      bouquet,
    },
    revalidate: 600,
  };
}
