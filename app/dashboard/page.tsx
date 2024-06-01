"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { EmployeeType } from "@/global";
import { PlusIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
//REDUX
// import { useDispatch, useSelector } from "react-redux";
// import { setEmployee } from "../redux/EmployeeReducer";
// import { RootState } from "@/redux/store";
// FORMIK
import { useFormik } from "formik";
import * as yup from "yup";
// SERVICE
// import employeeAPI from "@/service/service";
import Loading from "@/components/loader/loader";
// TOAST
import { toast } from "sonner";
import Header from "@/components/header/header";
import { DataTable } from "@/components/table/table";
import Footer from "@/components/footer/footer";
import { useQuery } from "react-query";
import CustomSelect from "@/components/Select";
import UserService from "../axios/service/user.service";

const Dashboard = () => {
  const [openForm, setOpenForm] = useState(false);
  const [employeeList, setEmployeeList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(false);

  //   businessName: { type: String, required: true },
  //     email: { type: String, required: true },
  //     phoneNumber: { type: String, required: true },
  //     userTypeId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "UserType",
  //       required: true,
  //     },
  //     productId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Product",
  //       required: true,
  //     },
  //     sourceId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Source",
  //       required: true,
  //     },
  //     isActive: { type: Boolean, default: true },
  //     createdAt: { type: Number, default: Date.now()
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

  const formik = useFormik({
    enableReinitialize: true,
    //INITIAL VALUES
    initialValues: {
      businessName: "",
      email: "",
      phoneNumber: "",
      userTypeId: "",
      productId: "",
      sourceId: "",
    },
    validationSchema: validationSchema,
    //SUBMITTING THE FORM
    onSubmit: async (values) => {
      try {
        setOpenForm(false);
      } catch (e) {
        console.log(e);
      }
      formik.resetForm();
    },
  });

  const getSourceList = useQuery(
    ["getSourceList"],
    async () => {
      return await UserService.getSourceList();
    },
    {
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
      onSuccess: () => {},
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  //TABLE DATA INITIALIZATION
  const EmployeeColumns: ColumnDef<any>[] = [
    {
      accessorKey: "businessName",
      header: "Business Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("businessName")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: () => {
        return <p>Email</p>;
      },
      cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: () => <div className="text-left">Phone Number</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row.getValue("phoneNumber")}
          </div>
        );
      },
    },
    {
      accessorKey: "userTypeId",
      header: () => <div className="text-left">User</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.getValue("User")}</div>
        );
      },
    },
    {
      accessorKey: "productId",
      header: () => <div className="text-left">Product</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.getValue("Product")}</div>
        );
      },
    },
    {
      accessorKey: "sourceId",
      header: () => <div className="text-left">Address</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.getValue("Source")}</div>
        );
      },
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-left">Actions</div>,
      cell: ({ row }: any) => {
        return (
          <Button
            variant="default"
            onClick={() => {
              setOpenForm(true);
              formik.setValues({
                ...row.original,
              });
              setType(true);
            }}
            disabled={employeeList?.includes(row?.original?.uniqueId)}
          >
            Update
          </Button>
        );
      },
    },
  ];

  //CLOSE MODEL FUNCTION
  const handleClose = () => {
    formik.resetForm();
    setOpenForm(false);
    setType(false);
  };

  return (
    <div className=" flex flex-col justify-between h-[100vh]">
      <Header />
      <div className="container overflow-scroll flex-grow no-scrollbar">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">LIST OF USERS</p>
          <Dialog open={true}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setOpenForm(true);
                }}
                className="mt-4 gap-3"
                variant={"default"}
              >
                <PlusIcon />
                Add Users
              </Button>
            </DialogTrigger>
            <DialogContent className="h-[90vh] overflow-y-scroll">
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
                    {formik.touched.businessName &&
                    formik.errors.businessName ? (
                      <span className="text-red-500 text-sm">
                        {formik.errors.businessName}
                      </span>
                    ) : null}
                  </div>
                  <div className="items-center gap-4">
                    <p className="text-sm font-semibold pb-1">Email</p>
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
                    <p className="text-sm font-semibold pb-1">Department</p>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
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
                      options={[]}
                      styles={""}
                      customOnChange={() => {}}
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
                      options={[]}
                      styles={""}
                      customOnChange={() => {}}
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
                      options={[]}
                      styles={""}
                      customOnChange={() => {}}
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
                  <Button type="submit">
                    {" "}
                    {type ? "Update Employee" : "Create Employee"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {!loading ? (
          <div>
            <DataTable data={[]} columns={EmployeeColumns} />
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center">
            <Loading />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
