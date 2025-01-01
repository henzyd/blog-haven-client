import * as React from "react";
import { cn } from "~/lib/utils/helpers";

// Define the extended props
interface Props extends React.ComponentProps<"input"> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, type, startAdornment, endAdornment, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {startAdornment && (
          <span className="absolute left-3 flex items-center">{startAdornment}</span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border-none border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            startAdornment ? "pl-10" : "",
            endAdornment ? "pr-10" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {endAdornment && <span className="absolute right-3 flex items-center">{endAdornment}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

export type InputProps = React.ComponentProps<typeof Input>;
