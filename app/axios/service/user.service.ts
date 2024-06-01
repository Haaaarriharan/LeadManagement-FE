import apiInstance from "..";

class UserServices {
  signUp = async (payload: any) => {
    return await apiInstance.post("/auth/signup", payload);
  };

  getSourceList = async () => {
    return await apiInstance.get("/source/list");
  };

  getProductList = async () => {
    return await apiInstance.get("/product/list");
  };

  getUserTypeList = async () => {
    return await apiInstance.get("/usertype/list");
  };
}

const UserService = new UserServices();

export default UserService;
