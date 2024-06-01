import apiInstance from "..";

class UserServices {
  signUp = async (payload: any) => {
    return await apiInstance.post("/auth/signup", payload);
  };

  createUserDetails = async (payload: any) => {
    return await apiInstance.post("/user/create", payload);
  };

  createEditDetails = async (id: string, payload: any) => {
    return await apiInstance.patch(`/user/update/${id}`, payload);
  };

  deactiveUser = async (id: string) => {
    return await apiInstance.patch(`/user/remove/${id}`, {});
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

  getUserAllList = async () => {
    return await apiInstance.get("/user/listall");
  };
}

const UserService = new UserServices();

export default UserService;
