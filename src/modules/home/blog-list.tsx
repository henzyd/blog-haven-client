import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { GoKebabHorizontal } from "react-icons/go";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import BlogService from "~/lib/services/blog";
import { notifyError, notifySuccess } from "~/lib/utils/toast";
import { queryClient } from "~/providers/tanstack-query";

export default function BlogList() {
  const [openMenu, setOpenMenu] = useState(false);

  const { data: blogs } = useQuery(
    {
      queryKey: ["blogs"],
      queryFn: BlogService.getBlogs,
    },
    queryClient
  );

  const { mutateAsync: deleteBlog } = useMutation(
    {
      mutationFn: BlogService.deleteBlog,
      onError: (error) => {
        if (isAxiosError(error)) {
          error.response?.data.error && notifyError({ message: error.response?.data.error });
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
      },
    },
    queryClient
  );

  async function handleDelete(id: string) {
    await deleteBlog(id, {
      onSuccess: () => {
        setOpenMenu(false);
        notifySuccess({ message: "Blog deleted successfully" });
      },
    });
  }

  if (!blogs?.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {blogs.map(({ id, title, subtitle, description, image }, index) => {
        if (!image) return;
        return (
          <div className="flex w-full flex-col gap-3 rounded-md border p-4" key={index}>
            <figure className="max-h-[200px] w-full overflow-hidden rounded border border-zinc-100">
              <img
                src={image}
                alt={title}
                className={"h-full w-full rounded object-contain object-center"}
              />
            </figure>
            <div className="flex flex-col gap-2">
              <div className="flex w-full justify-between gap-8">
                <div className="flex flex-col">
                  <h5 className="text-base font-medium">{title}</h5>
                  <small>{subtitle}</small>
                </div>
                <Popover open={openMenu}>
                  <PopoverTrigger asChild onClick={() => setOpenMenu((prev) => !prev)}>
                    <button className="rotate-90">
                      <GoKebabHorizontal />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit">
                    <button onClick={() => handleDelete(id)}>Delete</button>
                  </PopoverContent>
                </Popover>
              </div>
              <p className="whitespace-pre-wrap text-sm">{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
