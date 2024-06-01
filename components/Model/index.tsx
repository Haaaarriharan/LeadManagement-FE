"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "react-query";
import UserService from "@/app/axios/service/user.service";
// FORMIK
import { useFormik } from "formik";
import * as yup from "yup";
import CustomSelect from "../Select";

function CreateUserModel({
  openForm,
  setOpenForm,
  getUserAllList,
  EditDatas,
  setEditDatas,
  setIsEdit,
  isEdit,
}: any) {
  const [type, setType] = useState(false);

  //VALIDATION SCHEMA
  const validationSchema = yup.object({
    businessName: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .matches(/^(\+?\d{1,4}|\d{1,4})?\s?\d{10}$/, "Phone number is not valid")
      .required("Phone number is required"),
    userTypeId: yup.string().required("Usertype is required"),
    productId: yup.string().required("Product is required"),
    sourceId: yup.string().required("Source is required"),
  });

  const formik: any = useFormik({
    enableReinitialize: true,
    //INITIAL VALUES
    initialValues: {
      businessName: isEdit ? EditDatas?.businessName : "",
      email: isEdit ? EditDatas?.email : "",
      phoneNumber: isEdit ? EditDatas?.phoneNumber : "",
      userTypeId: isEdit ? EditDatas?.userTypeId._id : "",
      productId: isEdit ? EditDatas?.productId._id : "",
      sourceId: isEdit ? EditDatas?.sourceId._id : "",
    },
    validationSchema: validationSchema,
    //SUBMITTING THE FORM
    onSubmit: async (values: any) => {
      isEdit ? updateUserDetails(values) : createUserDetails(values);
      setOpenForm(false);
      formik.resetForm();
    },
  });

  const getSourceList = useQuery(
    ["getSourceList"],
    async () => {
      return await UserService.getSourceList();
    },
    {
      enabled: openForm, // conditionally enable the query

      onSuccess: () => {},
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  const getProductList = useQuery(
    ["getProductList"],
    async () => {
      return await UserService.getProductList();
    },
    {
      enabled: openForm, // conditionally enable the query

      onSuccess: () => {},
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  const getUserTypeList = useQuery(
    ["getUserTypeList"],
    async () => {
      return await UserService.getUserTypeList();
    },
    {
      enabled: openForm, // conditionally enable the query

      onSuccess: () => {},
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );
  const { mutate: createUserDetails, isLoading: createloading } =
    useMutation<any>(
      async (payloadData: any) => {
        return await UserService.createUserDetails(payloadData);
      },
      {
        onSuccess: (res: any) => {
          getUserAllList.refetch();
        },
        onError: (err: any) => {
          console.log(err.response?.data || err);
        },
      }
    );

  const { mutate: updateUserDetails, isLoading: updateloading } =
    useMutation<any>(
      async (payloadData: any) => {
        return await UserService.editUserDetails(EditDatas?._id, payloadData);
      },
      {
        onSuccess: (res: any) => {
          getUserAllList.refetch();
        },
        onError: (err: any) => {
          console.log(err.response?.data || err);
        },
      }
    );

  //CLOSE MODEL FUNCTION
  const handleClose = () => {
    formik.resetForm();
    setOpenForm(false);
    setType(false);
  };
  return (
    <Dialog
      open={openForm}
      onOpenChange={() => {
        setOpenForm(false);
      }}
    >
      <DialogContent
        className="h-[90vh] overflow-y-scroll"
        onCloseAutoFocus={() => {
          setOpenForm(false);
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4 py-4">
            <p className="text-lg font-bold text-center">
              {type ? "Update" : "Add"} User Detail's
            </p>
            <div className="items-center gap-4">
              <p className="text-sm font-semibold pb-1">Name</p>
              <Input
                id="businessName"
                name="businessName"
                placeholder="Enter business name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.businessName}
              />
              {formik.touched.businessName && formik.errors.businessName ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.businessName}
                </span>
              ) : null}
            </div>
            <div className="items-center gap-4">
              <p className="text-sm font-semibold pb-1">Email Address</p>
              <Input
                id="email"
                name="email"
                placeholder="Enter Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.email}
                </span>
              ) : null}
            </div>
            <div className="items-center gap-4">
              <p className="text-sm font-semibold pb-1">Phone Number</p>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                placeholder="Enter Phone Number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.phoneNumber}
                </span>
              ) : null}
            </div>
            <div className="items-center gap-4">
              <p className="text-sm font-semibold pb-1">Usertype</p>
              <CustomSelect
                placeholder={"select one"}
                options={
                  getUserTypeList?.data?.data?.map((d: any) => {
                    return { value: d?._id, label: d?.type };
                  }) || []
                }
                styles={""}
                customOnChange={(e: any) => {
                  formik.setFieldValue("userTypeId", e);
                }}
                value={formik.values.userTypeId}
              />

              {formik.touched.userTypeId && formik.errors.userTypeId ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.userTypeId}
                </span>
              ) : null}
            </div>
            <div className="items-center gap-4">
              <p className="text-sm font-semibold pb-1">Product</p>
              <CustomSelect
                placeholder={"select one"}
                options={
                  getProductList?.data?.data?.map((d: any) => {
                    return { value: d?._id, label: d?.name };
                  }) || []
                }
                styles={""}
                customOnChange={(e: any) => {
                  formik.setFieldValue("productId", e);
                }}
                value={formik.values.productId}
              />
              {formik.touched.productId && formik.errors.productId ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.productId}
                </span>
              ) : null}
            </div>
            <div className="items-center gap-4">
              <p className="text-sm font-semibold pb-1">Source</p>
              <CustomSelect
                placeholder={"select one"}
                options={
                  getSourceList?.data?.data?.map((d: any) => {
                    return { value: d?._id, label: d?.name };
                  }) || []
                }
                styles={""}
                customOnChange={(e: any) => {
                  formik.setFieldValue("sourceId", e);
                }}
                value={formik.values.sourceId}
              />
              {formik.touched.sourceId && formik.errors.sourceId ? (
                <span className="text-red-500 text-sm">
                  {formik.errors.sourceId}
                </span>
              ) : null}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => handleClose()} variant="ghost">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                !formik.values.businessName ||
                !formik.values.email ||
                !formik.values.phoneNumber ||
                !formik.values.productId ||
                !formik.values.sourceId ||
                !formik.values.userTypeId
              }
            >
              {" "}
              {isEdit
                ? updateloading
                  ? "loading"
                  : "Update Employee"
                : createloading
                ? "loading"
                : "Create Employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateUserModel;
