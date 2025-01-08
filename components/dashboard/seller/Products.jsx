import { useEffect, useState } from "react";
import Link from "next/link";

import { getSellerProducts } from "@/utils/apiSeller";
import ProductsMenu from "./ProductsMenu";

import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const open = Boolean(anchorEl);

  //se ejecuta del lado del cliente para hacer una peticion a mi api
  useEffect(() => {
    getSellerProducts()
      .then((response) => setProducts(response))
      .catch((error) => console.log(error));
  }, []);

  //funcion para activar el menu y vincular ese menu a un producto
  function handleMenuOpen(event, product) {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  }

  //funcion para cerrar el menu
  function handleMenuClose() {
    setAnchorEl(null);
    setSelectedProduct(null);
  }

  return (
    <Stack component="main" sx={{ width: "100%", height: "100%" }} spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="h1"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <LocalOfferRoundedIcon color="primary" sx={{ fontSize: "2rem" }} />
          Productos
        </Typography>
        <Link href="/dashboard/addProduct" passHref>
          <Button startIcon={<AddIcon />} variant="contained" color="primary">
            Agregar Producto
          </Button>
        </Link>
      </Stack>
      <TableContainer
        sx={{
          backgroundColor: "#fff",
          borderRadius: "0.5rem",
          boxShadow: 2,
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Inventario</TableCell>
              <TableCell>Tipos de Flor</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell align="center">Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <Box
                    component="img"
                    src={product.images[0]}
                    sx={{ width: "3rem", height: "3rem", objectFit: "cover" }}
                  />
                  <Typography>{product.name}</Typography>
                </TableCell>
                <TableCell>{`${product.stock} Pzs`}</TableCell>
                <TableCell>
                  {product.details.flowerType.map((type) => (
                    <Chip key={type} label={type} color="secondary" />
                  ))}
                </TableCell>
                <TableCell>{`$ ${product.price}`}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleMenuOpen(e, product)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ProductsMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        product={selectedProduct}
      />
    </Stack>
  );
}
