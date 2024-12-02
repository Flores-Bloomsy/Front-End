import { Box } from "@mui/material";
import Image from "next/image";

function ImageContainer({ height = 628, image }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <Image
        src={image}
        alt="Flores"
        width={500}
        height={height}
        style={{
          borderTopRightRadius: "16px",
          borderBottomRightRadius: "16px",
          objectFit: "cover",
        }}
      />
    </Box>
  );
}

export default ImageContainer;
