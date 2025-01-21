import { Dialog, DialogActions, DialogContent } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PrintQR({ open, onClose, qrCode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  function handleImageLoad() {
    setIsLoaded(true);
  }

  useEffect(() => {
    // Asegúrate de que solo se imprima después de que la imagen esté cargada
    if (isLoaded) {
      window.print();
    }
  }, [open, isLoaded]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Image
          src={qrCode}
          alt="QRCode"
          width={300}
          height={300}
          onLoad={handleImageLoad}
        />
      </DialogContent>
    </Dialog>
  );
}
