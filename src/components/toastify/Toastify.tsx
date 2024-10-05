import { toast } from "react-toastify";

export const success_toast = (message: string) => {
  return toast.success(message, { theme: "light", autoClose: 2000 });
};

export const error_toast = (message: string) => {
  return toast.error(message, { theme: "light", autoClose: 2000 });
};
