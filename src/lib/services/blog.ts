import { axiosInstance } from "~/lib/config/axios";

class BlogService {
  static createLocation = async (data: any) => {
    const { data: response } = await axiosInstance.postForm<Location>(
      `/api/admin/locations`,
      data
    );

    return response;
  };

  static getLocations = async () => {
    const { data: response } = await axiosInstance.get<Location[]>(
      `/api/admin/locations`
    );

    return response;
  };
}

export default BlogService;
