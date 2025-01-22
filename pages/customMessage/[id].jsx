import { getCustomMessageById } from "@/utils/apiCustomMessage";
import { Container, Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CustomMessagePage() {
  const [customMessage, setCustomMessage] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  console.log("id", id);

  useEffect(() => {
    async function getMessage() {
      if (!id) {
        console.log("ID aún no está disponible");
        return;
      }
      const message = await getCustomMessageById(id);
      setCustomMessage(message);
    }
    getMessage();
  }, [id]);
  console.log("customMessage", customMessage);

  return (
    <Container
      maxWidth
      sx={{
        position: "relative",
        height: "calc(100vh - 120px)",
        display: "flex",
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
      <Box
        sx={{
          zIndex: 1,
        }}
        dangerouslySetInnerHTML={{ __html: customMessage }}
      />
    </Container>
  );
}
