import axios from "axios";

export async function getUserById(email) {
  try {
    const res = await axios.post("/api/get-user-by-id", {
      email,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}

export async function register(name, email, password) {
  try {
    const res = await axios.post("/api/register", {
      name,
      email,
      password,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}

export async function updateUser(email, data, type) {
  try {
    const res = await axios.post("/api/update-user", {
      email,
      data,
      type,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}

export async function forgetAuth(email) {
  try {
    const res = await axios.post("/api/forget-auth", {
      email,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}

export async function forgetReset(email, token, password) {
  try {
    const res = await axios.post("/api/forget-reset", {
      email,
      token,
      password,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}

export async function newPassword(email, existing_password, new_password) {
  try {
    const res = await axios.post("/api/new-password", {
      email,
      existing_password,
      new_password,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}

export async function deleteAccount(email) {
  try {
    const res = await axios.get(`/api/delete-account/${email}`, {
      email,
    });
    return res;
  } catch (error) {
    return error.message;
  }
}
