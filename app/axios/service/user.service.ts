import apiInstance from "..";

class UserServices {
  signUp = async (payload: any) => {
    return await apiInstance.post("/register", payload);
  };

  login = async (payload: any) => {
    return await apiInstance.post("/login", payload);
  };

  createUserDetails = async (payload: any) => {
    return await apiInstance.post("/user/create", payload);
  };

  editUserDetails = async (id: string, payload: any) => {
    return await apiInstance.patch(`/user/update/${id}`, payload);
  };

  deactiveUser = async (id: string, payload: any) => {
    return await apiInstance.patch(`/user/remove/${id}`, payload);
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

  getUserAllList = async (payload: any) => {
    return await apiInstance.post("/user/listall", payload);
  };
}

const UserService = new UserServices();

export default UserService;
