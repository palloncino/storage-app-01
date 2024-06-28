import React, { useState, ChangeEvent } from "react";
import { ROUTES } from '../../constants/index.ts';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { dateText } from "../../utils/date-text.ts";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Pagination,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { isAdmin } from "../../utils/isWho.js";
import Highlight from "../HighlightText/index.js";
import { useAppState } from "../../state/stateContext.js";
import { ProductType } from "../../types/index.ts";

interface ProductListProps {
  products: ProductType[];
  handleDeleteProducts: (id: number) => void;
  search: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, handleDeleteProducts, search }) => {
  const { t } = useTranslation();
  const { user } = useAppState();
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof ProductType>("name");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleSortRequest = (column: keyof ProductType) => {
    const isAsc = orderBy === column && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    setOrderBy(column);
  };

  const sortedProducts = [...products].sort((a, b) => {
    let compare = 0;
    switch (orderBy) {
      case "name":
        compare = a.name.localeCompare(b.name);
        break;
      case "category":
        compare = a.category.localeCompare(b.category);
        break;
      case "price":
        compare = parseFloat(a.price) - parseFloat(b.price);
        break;
      case "createdAt":
        compare = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case "updatedAt":
        compare = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
      default:
        break;
    }
    return orderDirection === "asc" ? compare : -compare;
  });

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleRowClick = (productId: number) => {
    navigate(ROUTES(productId).productPage);
  };

  const currentPageProducts = sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div id="ProductList" className="product-list">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? orderDirection : "asc"}
                  onClick={() => handleSortRequest("id")}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">{t('Image')}</TableCell>
              <TableCell align="right">{t('Name')}</TableCell>
              <TableCell align="right">{t('Category')}</TableCell>
              <TableCell align="right">{t('Price')}</TableCell>
              <TableCell align="right">{t('DateCreated')}</TableCell>
              <TableCell align="right">{t('LastUpdate')}</TableCell>
              <TableCell align="right">{t('Actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageProducts.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                hover
                onClick={() => handleRowClick(product.id)}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="right">
                  {product.imgUrl ? (
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      style={{ width: "50px", height: "auto" }}
                    />
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell align="right">
                  <Highlight text={product.name} search={search} />
                </TableCell>
                <TableCell align="right">
                  <Highlight text={product.category} search={search} />
                </TableCell>
                <TableCell align="right">
                  {t('EUR')} {product.price}
                </TableCell>
                <TableCell align="right">
                  {product.createdAt ? dateText(product.createdAt) : ""}
                </TableCell>
                <TableCell align="right">
                  {product.updatedAt ? dateText(product.updatedAt) : ""}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    disabled={!isAdmin(user)}
                    aria-label="edit"
                    component={Link}
                    to={ROUTES(product.id).editProduct}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    disabled={!isAdmin(user)}
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProducts(product.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ padding: 2 }}>
        <Pagination
          component="div"
          count={Math.ceil(products.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </div>
  );
};

export default ProductList;
