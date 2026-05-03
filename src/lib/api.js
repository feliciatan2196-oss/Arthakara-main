const BASE_URL = "/api";

export const registerUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    return { status: res.status, data: responseData };
  } catch (error) {
    return {
      status: 500,
      data: { error: error.message || "Terjadi kesalahan" },
    };
  }
};

export const loginUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();
    return { status: res.status, data: responseData };
  } catch (error) {
    return {
      status: 500,
      data: { error: error.message || "Terjadi kesalahan" },
    };
  }
};

export const updateUserProfile = async (userId, updateData) => {
  try {
    const res = await fetch(`${BASE_URL}/profile/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        ...updateData,
      }),
    });

    const responseData = await res.json();
    return { status: res.status, data: responseData };
  } catch (error) {
    return {
      status: 500,
      data: { error: error.message || "Terjadi kesalahan" },
    };
  }
};

export const getUser = async (token) => {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};