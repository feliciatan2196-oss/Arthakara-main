const BASE_URL = "/api";

/*
|--------------------------------------------------------------------------
| HELPER FETCH (BEST PRACTICE)
|--------------------------------------------------------------------------
*/
const fetcher = async (url) => {
  try {
    const res = await fetch(url);

    // ❌ HANDLE ERROR HTTP
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    return json.data; // 🔥 langsung ambil data
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

/*
|--------------------------------------------------------------------------
| GET ALL PRODUCTS
|--------------------------------------------------------------------------
*/
export const fetchProducts = async () => {
  const data = await fetcher(`${BASE_URL}/products`);

  return data || [];
};

/*
|--------------------------------------------------------------------------
| GET PRODUCT DETAIL
|--------------------------------------------------------------------------
*/
export const fetchProductDetail = async (id) => {
  const data = await fetcher(`${BASE_URL}/products/${id}`);

  return data; // object atau null
};