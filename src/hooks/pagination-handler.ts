import { useEffect, useState } from "react";
import { IInvoice } from "../@types";

const usePaginationHandler = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [dataSrc, setDataSrc] = useState<IInvoice[]>([]);

  const [currentItems, setCurrentItems] = useState<IInvoice[]>([]);

  useEffect(() => {
    const newTotalPages = Math.ceil(dataSrc.length / itemsPerPage) || 1;
    setTotalPages(newTotalPages);
    setCurrentPage((prevPage) => Math.min(prevPage, newTotalPages));
  }, [dataSrc.length, itemsPerPage]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(dataSrc.slice(indexOfFirstItem, indexOfLastItem));
  }, [dataSrc, currentPage, itemsPerPage]);

  return {
    currentPage,
    currentItems,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    setTotalPages,
    setCurrentItems,
    setDataSrc,
  };
};

export default usePaginationHandler;
