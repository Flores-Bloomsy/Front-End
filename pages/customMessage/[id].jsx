import { getAllOrders, getCustomMessageById } from "@/utils/apiCustomMessage";
import { Container, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CustomMessagePage({ customMessage }) {
  return (
    <Container
      maxWidth
      sx={{
        position: "relative",
        minHeight: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(/bgCustomMessage.webp)",
          backgroundSize: "100px 100px",
          backgroundPosition: "20% 75%",
          opacity: 0.1,
          zIndex: -1,
        }}
      />
      <Typography align="center" sx={{ fontSize: "2rem" }}>
        <Typography variant="span" color="primary.main">
          de{" "}
        </Typography>{" "}
        {customMessage?.sender}
      </Typography>
      <Typography sx={{ fontSize: "2rem" }}>
        <Typography variant="span" color="primary.main">
          para{" "}
        </Typography>
        {customMessage?.receiver}
      </Typography>
      <Box
        sx={{
          zIndex: 1,
          maxWidth: "100%",
          padding: "16px",
          "& img": {
            maxWidth: "100%",
            margin: "0 auto",
          },
        }}
        dangerouslySetInnerHTML={{ __html: customMessage?.message }}
      />
    </Container>
  );
}

export async function getStaticPaths() {
  const orderId = await getAllOrders();
  const paths = orderId.map((order) => ({
    params: {
      id: order._id.toString(),
    },
  }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const customMessage = await getCustomMessageById(id);

  return {
    props: { customMessage },
  };
}
