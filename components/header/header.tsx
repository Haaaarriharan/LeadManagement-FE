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

const Header = () => {
  // const dispatch: any = useDispatch();
  // const { data }: any = useSelector((state: RootState) => state.user);

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
                {/* <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="https://as1.ftcdn.net/v2/jpg/05/86/52/38/1000_F_586523892_tNPOUFiFbyvPqmdFUV1rZ9pDura6AbGA.jpg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                /> */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hari</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  // dispatch(clearuserData());
                  // dispatch(clearEmployeeData());
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
