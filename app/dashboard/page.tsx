"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
// SERVICE
import Loading from "@/components/loader/loader";
// TOAST
import Header from "@/components/header/header";
import { DataTable } from "@/components/table/table";
import Footer from "@/components/footer/footer";
import CreateUserModel from "@/components/Model";
import { useQuery } from "react-query";
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
import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const Dashboard = () => {
  const [openForm, setOpenForm] = useState(false);
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
              <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {}}>Deactivate</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const getUserAllList: any = useQuery(
    ["getUserAllList"],
    async () => {
      return await UserService.getUserAllList();
    },
    {
      onSuccess: () => {},
      onError: (err: any) => {
        console.log(err.response?.data || err);
      },
    }
  );

  console.log("getUserAllList", getUserAllList);

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
            />
          )}
        </div>
        {!getUserAllList?.isLoading ? (
          <div>
            <DataTable
              data={getUserAllList?.data?.data || []}
              columns={EmployeeColumns}
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
