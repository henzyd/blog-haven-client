import { axiosInstance } from "~/lib/config/axios";

class BlogService {
  static createBlog = async (data: any) => {
    const { data: response } = await axiosInstance.postForm<Blog>(`/blog`, data);

    return response;
  };

  static getBlogs = async () => {
    const { data: response } = await axiosInstance.get<Blog[]>(`/blog`);

    return response;
  };

  static deleteBlog = async (id: string) => {
    const { data: response } = await axiosInstance.get<Blog>(`/blog/${id}`);

    return response;
  };
}

export default BlogService;
