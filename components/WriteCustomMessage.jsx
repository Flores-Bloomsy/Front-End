import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { useFileUpload } from "@/hooks/useUploadImg";

import "quill/dist/quill.snow.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { addCustomMessageById } from "@/utils/apiCustomMessage";
import { useRouter } from "next/router";

// Carga dinámica de ReactQuill solo en el cliente
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function WriteCustomMessage({ open, handleClose }) {
  const [value, setValue] = useState("");
  console.log(value);
  const [imageAdded, setImageAdded] = useState(false);
  const fileInputRef = useRef(null);
  const { onFileInputChange, imageUrl, resetImageUrl, isUploadingFile } =
    useFileUpload();
  const router = useRouter();
  const { id } = router.query;
  const formats = ["header", "image", "color", "italic", "font"];

  const handleImageUpload = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  const modules = {
    toolbar: {
      container: [[{ header: [1] }], ["italic"], [{ color: [] }], ["image"]],
      handlers: {
        image: handleImageUpload, // Vincula un manejador personalizado para el botón de imagen
      },
    },
  };

  // Función para verificar si ya existe una imagen en el contenido
  function hasImageInContent(content) {
    const imageElements = content.match(/<img [^>]*src="[^"]+"[^>]*>/g);
    return imageElements && imageElements.length > 0;
  }

  // Inserta la imagen como HTML en el estado cuando se recibe la URL
  useEffect(() => {
    if (!imageUrl || imageAdded) return;

    if (!hasImageInContent(value)) {
      const imageHTML = `<img src="${imageUrl}" alt="Imagen subida" />`;
      console.log("11", imageHTML);
      setValue((prevValue) => `${prevValue}${imageHTML}`);
      setImageAdded(true);
    }
  }, [imageUrl, value]);

  // useEffect para detectar cuando el usuario borra la imagen
  useEffect(() => {
    if (!hasImageInContent(value)) {
      setImageAdded(false);
      resetImageUrl();
    }
  }, [value]);

  async function handleSendMessage() {
    const res = await addCustomMessageById(id, { customMessage: value });

    console.log("123123132", res);
    router.reload();
  }

  return (
    <Dialog
      width="lg"
      fullWidth
      open={open}
      onClose={handleClose}
      sx={{ padding: "20px" }}
    >
      <DialogTitle>
        <Typography variant="h5" gutterBottom>
          Mensaje Personalizado
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography align="right" color={imageAdded && "error"}>
          Elige una imagen especial.
        </Typography>
        <input
          disabled={isUploadingFile || imageAdded}
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={value}
          onChange={setValue}
          placeholder="Deja que tu mente guarde silencio y permite que hable tu corazón."
          style={{ height: "300px", overflowY: "auto" }}
        />
        {isUploadingFile && (
          <Typography color="error">Subiendo imagen...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSendMessage} variant="contained">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
