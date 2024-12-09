import axios from "axios";

const API_BASE_URL = "https://stageapi.monkcommerce.app/task/products/search";
const API_KEY = "72njgfa948d9aS7gs5";

export const fetchProducts = (search, page) =>
  axios.get(API_BASE_URL, {
    params: { search, page, limit: 10 },
    headers: { "x-api-key": API_KEY },
  });
