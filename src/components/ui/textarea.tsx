import * as React from "react";
import { cn } from "~/lib/utils/helpers";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, startAdornment, endAdornment, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {startAdornment && (
          <span className="absolute left-3 flex items-center">{startAdornment}</span>
        )}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
            {
              "pl-10": startAdornment,
              "pr-10": endAdornment,
            }
          )}
          ref={ref}
          {...props}
        />
        {endAdornment && <span className="absolute right-3 flex items-center">{endAdornment}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
