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

// export const errorInterceptor = async (error: any) => {
//   if (
//     error?.response?.data?.statusCode === 401 &&
//     error?.response?.data?.message === "Unauthorized"
//   ) {
//     const res: any = await TokenService.accesTokenReferesh();
//     setLocalStorageItem("ACCESS_TOKEN", res?.data?.token?.access_token);
//     error.config.headers.Authorization = `Bearer ${res?.data?.token?.access_token}`;
//     return axios.request(error.config);
//   } else {
//     throw error;
//   }
// };
