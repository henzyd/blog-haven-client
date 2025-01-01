import { axiosInstance } from "~/lib/config/axios";

class BlogService {
  static createBlog = async (data: any) => {
    const { data: response } = await axiosInstance.postForm<Blog>(`/api/admin/locations`, data);

    return response;
  };

  static getBlogs = async () => {
    const { data: response } = await axiosInstance.get<Blog[]>(`/api/admin/locations`);

    return response;
  };
}

export default BlogService;
