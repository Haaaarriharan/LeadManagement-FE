"use client";
// import { useDispatch, useSelector } from "react-redux";
// COMPONENETS
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
// REDUX
// import { clearEmployeeData } from "@/redux/EmployeeReducer";
// import { clearuserData } from "@/redux/userReducer";
// import { RootState } from "@/redux/store";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  // const dispatch: any = useDispatch();
  // const { data }: any = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const userData: any = localStorage.getItem("loggedUser");
  const userDetails = JSON.parse(userData);

  console.log("datas", userDetails);

  return (
    <header
      className="bg-white text-black"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <p className="text-lg  font-medium">DASHBOARD</p>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className=" hover:bg-black select-none"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="https://github.com/shadcn.png"
                  width="32"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userDetails?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  // dispatch(clearuserData());
                  // dispatch(clearEmployeeData());
                  router.push("/");
                }}
                className=" bg-black hover:bg-red-600 hover:cursor-pointer text-white"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
