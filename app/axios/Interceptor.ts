export const requestInterceptor = async (config: any) => {
  try {
    let token = localStorage.getItem("ACCESS_TOKEN");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    return config;
  }
};

export const responseInterceptor = (response: any) => {
  return response.data;
};
