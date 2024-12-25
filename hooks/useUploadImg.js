import { useState, useEffect } from "react";
import Uppy from "@uppy/core";
import Transloadit from "@uppy/transloadit";

// Custom Hook para manejo de subida de archivos
export function useFileUpload() {
  const [uppy, setUppy] = useState(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  // Función que se ejecuta al completar la subida
  const onCompleteUploadFiles = (assembly) => {
    const image = assembly.results?.resize_and_convert[0].ssl_url; // URL de la imagen subida
    console.log(assembly);

    setImageUrl(image); // Guardamos la URL de la imagen
    setIsUploadingFile(false); // Actualizamos el estado para indicar que terminó la carga
  };

  // Función que maneja el cambio de archivo en el input
  const onFileInputChange = (event) => {
    const file = Array.from(event.target.files)[0] || null; // Tomamos el archivo seleccionado

    if (file) {
      setIsUploadingFile(true); // Indicamos que la carga del archivo ha comenzado

      uppy.reset(); // Limpiamos la instancia de uppy
      uppy.addFile({
        // Agregamos el archivo a la instancia de uppy
        name: file.name,
        type: file.type,
        data: file,
      });

      uppy.upload(); // Iniciamos la carga del archivo
    }
  };

  useEffect(() => {
    // Usamos useEffect para configurar el dashboard de Uppy solo en el cliente
    const uppyInstance = new Uppy({
      restrictions: {
        maxNumberOfFiles: 1, // Limitamos a un solo archivo por carga
      },
    })
      .use(Transloadit, {
        params: {
          auth: { key: process.env.NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY },
          template_id: process.env.NEXT_PUBLIC_TRANSLOADIT_TEMPLATE_ID,
        },
        waitForEncoding: true, // Esperamos la codificación para obtener la URL del archivo
      })
      .on("transloadit:complete", onCompleteUploadFiles); // Llamamos a la función cuando la carga termina

    setUppy(uppyInstance); // Guardamos la instancia de uppy en el estado
  }, []);

  function resetImageUrl() {
    setImageUrl(null);
  }

  return {
    isUploadingFile,
    imageUrl,
    onFileInputChange,
    resetImageUrl,
  };
}
