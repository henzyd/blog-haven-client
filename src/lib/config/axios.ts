import axios from "axios";
import { notifyError } from "~/lib/utils/toast";

export const axiosInstance = axios.create({
  headers: {
    common: {
      Accept: "application/json",
    },
    post: {
      "Content-Type": "application/json",
    },
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const message =
      error?.response?.data?.error || error?.message || "Network Error";

    const status = error?.response?.status as number | undefined;

    if (status && status?.toString().startsWith("5")) {
      return notifyError({ message: "An error occured, please try again" });
    }

    if (message === "Network Error") {
      return notifyError({
        message: "Unstable network",
        description:
          "We are experiencing connection issues. Please check your network.",
      });
    }

    return Promise.reject(error);
  }
);
