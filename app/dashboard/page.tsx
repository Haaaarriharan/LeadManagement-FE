"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
// SERVICE
import Loading from "@/components/loader/loader";
// COMPONENTS
import Header from "@/components/header/header";
import { DataTable } from "@/components/table/table";
import Footer from "@/components/footer/footer";
import CreateUserModel from "@/components/Model";
import { useMutation, useQuery } from "react-query";
import UserService from "../axios/service/user.service";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { DotsHorizontalIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import CustomSelect from "@/components/Select";
import { RefreshCcw } from "lucide-react";

const Dashboard = () => {
  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [EditDatas, setEditDatas] = useState<any>({});
  const [setdropdown, setNewDropDown] = useState<any>([]);
  const [search, searchDatas] = useState<any>({
    serachField: "",
    dropdownSearchFieldName: "",
    dropdownSearchFieldValue: "",
  });

  //TABLE DATA INITIALIZATION
  const EmployeeColumns: ColumnDef<any>[] = [
    {
      accessorKey: "businessName",
      header: () => {
        return <p className="text-left font-bold">Business Name</p>;
      },
      cell: ({ row }) => (
        <div className="capitalize text-left font-medium">
          {row.getValue("businessName")}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: () => {
        return <p className="text-left font-bold">Email</p>;
      },
      cell: ({ row }) => (
        <div className="text-left font-medium">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: () => <div className="text-left font-bold">Phone Number</div>,
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
      header: () => <div className="text-left font-bold">User</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row?.original?.userTypeId?.type}
          </div>
        );
      },
    },
    {
      accessorKey: "productId",
      header: () => <div className="text-left font-bold">Product</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row?.original?.productId?.name}
          </div>
        );
      },
    },
    {
      accessorKey: "sourceId",
      header: () => <div className="text-left font-bold">Source</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row?.original?.sourceId?.name}
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: () => <div className="text-left font-bold">Status</div>,
      cell: ({ row }) => (
        <div className="flex justify-start" onClick={() => {}}>
          {row.original?.isActive ? (
            <Badge variant={"secondary"} className="py-1.5 px-7">
              Active
            </Badge>
          ) : (
            <Badge variant={"outline"} className="py-1.5 px-6 bg-red-300">
              InActive
            </Badge>
          )}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-left font-bold">Actions</div>,
      cell: ({ row }: any) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted ml-4"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <Card>
                        <p className=" bg-white-400 text-black px-3 rounded-lg py-1">
                          Actions
                        </p>
                      </Card>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setOpenForm(true);
                  setIsEdit(true);
                  setEditDatas(row?.original);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  deleteUserDetails(row?.original);
                }}
              >
                {row?.original?.isActive ? "Deactivate" : "Active"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // ALL USER LIST....
  const getUserAllList: any = useQuery(
    ["getUserAllListss", search.serachField, search.dropdownSearchFieldValue],
    async () => {
      let payload: any = {
        $or: [
          {
            businessName: {
              $regex: search?.serachField || "",
              $options: "i",
            },
          },
          {
            phoneNumber: {
              $regex: search?.serachField || "",
              $options: "i",
            },
          },
          {
            email: {
              $regex: search?.serachField || "",
              $options: "i",
            },
          },
        ],
      };
      if (
        search.dropdownSearchFieldName !== "" &&
        search.dropdownSearchFieldValue !== ""
      ) {
        payload[search.dropdownSearchFieldName] =
          search.dropdownSearchFieldValue;
      }
      return await UserService.getUserAllList(payload);
    },
    {
      onSuccess: () => {},
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  // DELETE USER LIST
  const { mutate: deleteUserDetails, isLoading: updateloading } =
    useMutation<any>(
      async (data: any) => {
        let newPayload = {
          isActive: !data?.isActive,
        };
        return await UserService.deactiveUser(data?._id, newPayload);
      },
      {
        onSuccess: (res: any) => {
          getUserAllList.refetch();
          toast.success(`${res.message}`);
        },
        onError: (err: any) => {
          console.log(err.response?.data || err);
          toast.error(`${err.message}`);
        },
      }
    );

  // CUSTOM FILTER
  const filterList = [
    { value: "userTypeId", label: "User" },
    { value: "productId", label: "Product" },
    { value: "sourceId", label: "Source" },
  ];

  // SEARCH WITH TYPES
  const UserType = async () => {
    let res;
    if (search?.dropdownSearchFieldName === "userTypeId") {
      res = await UserService.getUserTypeList();
    } else if (search?.dropdownSearchFieldName === "productId") {
      res = await UserService.getProductList();
    } else {
      res = await UserService.getSourceList();
    }
    try {
      if (search?.dropdownSearchFieldName === "userTypeId") {
        console.log("res", res);

        let newVal =
          res?.data?.map((d: any) => {
            return { value: d?._id, label: d?.type };
          }) || [];
        setNewDropDown(newVal);
        return;
      }

      let newVal1 =
        res?.data?.map((d: any) => {
          return { value: d?._id, label: d?.name };
        }) || [];
      setNewDropDown(newVal1);
    } catch (err) {
      console.log("erri", err);
    }
  };
  useEffect(() => {
    if (search?.dropdownSearchFieldName !== "") {
      UserType();
    }
  }, [search?.dropdownSearchFieldName]);

  // RESET
  const handleResetFilter = () => {
    searchDatas({
      serachField: "",
      dropdownSearchFieldName: "",
      dropdownSearchFieldValue: "",
    });
  };

  return (
    <div className=" flex flex-col justify-between h-[100vh]">
      <Header />
      <div className="container overflow-scroll flex-grow no-scrollbar">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">LIST OF USERS</p>
          <Dialog>
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
          </Dialog>
          {openForm && (
            <CreateUserModel
              openForm={openForm}
              setOpenForm={setOpenForm}
              getUserAllList={getUserAllList}
              EditDatas={EditDatas}
              setEditDatas={setEditDatas}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
            />
          )}
        </div>
        <div className="flex mb-3">
          <Input
            placeholder="Filter name, email , phone no..."
            value={search.serachField}
            onChange={(event) => {
              searchDatas({ ...search, serachField: event.target.value });
            }}
            className="w-[300px] mr-2"
          />

          <CustomSelect
            placeholder={"select header"}
            options={filterList}
            styles={"w-[160px]  mr-2"}
            customOnChange={(e: any) => {
              // formik.setFieldValue("userTypeId", e);
              searchDatas({
                ...search,
                dropdownSearchFieldName: e,
                dropdownSearchFieldValue: "",
              });
            }}
            value={search?.dropdownSearchFieldName}
          />
          <CustomSelect
            placeholder={"select options"}
            options={setdropdown}
            styles={"w-[160px] mr-2"}
            customOnChange={(e: any) => {
              // formik.setFieldValue("userTypeId", e);
              searchDatas({ ...search, dropdownSearchFieldValue: e });
            }}
            value={search?.dropdownSearchFieldValue}
          />
          <RefreshCcw
            className="w-5 h-5 text-gray-400 hover:text-black hover:cursor-pointer mt-2"
            onClick={() => {
              handleResetFilter();
            }}
          />
        </div>
        {!getUserAllList?.isLoading ? (
          <div>
            <DataTable
              data={getUserAllList?.data?.data || []}
              columns={EmployeeColumns}
              searchDatas={searchDatas}
              search={search}
            />
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
