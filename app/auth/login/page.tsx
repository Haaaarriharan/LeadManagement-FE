/********************************Import Components*************************************/
"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
/********************************Import Formik*************************************/
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import UserService from "@/app/axios/service/user.service";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  //VALIDATION SCHEMA
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik: any = useFormik({
    //INITIAL VALUES
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      loginUser(values);
    },
  });

  //  LOGIN STUFF
  const { mutate: loginUser, isLoading: loading } = useMutation<any>(
    async (data: any) => {
      return await UserService.login(data);
    },
    {
      onSuccess: (res: any) => {
        router.push("/dashboard");
        toast.success(`${res.message}`);
        localStorage.setItem("loggedUser", JSON.stringify(res.data));
        localStorage.setItem("ACCESS_TOKEN", res.token);
      },
      onError: (err: any) => {
        console.log(err.response?.data || err);
        toast.error(`${err.response?.data?.message}`);
      },
    }
  );

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p>Email</p>
              <Input
                id="email"
                name="email"
                placeholder="m@example.com"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className=" text-red-600 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="space-y-2">
              <p>Password</p>
              <Input
                id="password"
                name="password"
                type="text"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className=" text-red-600 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
              <main className="flex justify-between">
                <div></div>
                <div
                  onClick={() => {
                    router.push("/auth/signup");
                  }}
                  className="cursor-pointer"
                  style={{
                    color: "#1778F2",
                  }}
                >
                  signup ?
                </div>
              </main>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" type="submit">
              {loading ? "logging" : "Create User"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
