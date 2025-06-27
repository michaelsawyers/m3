import { Role, RoleProps, Toolbar } from "@ariakit/react";
import * as React from "react";

import { cn } from "@/lib/utils";

function AkHeader({ className, children, ...props }: RoleProps<"header">) {
  return (
    <Role.header
      className={cn(
        "flex justify-center items-center w-full box-border flex-shrink-0 z-(--z-header) bg-(--un-header-footer-background-color) border-b-(length:--un-header-footer-border-width) border-solid border-(--un-header-footer-border-color) text-(--un-header-footer-color)",
        className
      )}
      {...props}
    >
      <Toolbar
        className={cn(
          "flex items-center flex-row w-full h-full mx-auto gap-(--un-header-footer-space-gap) py-(--un-header-footer-space-vertical) px-(--unity-grid-margin)",
          className
        )}
      >
        {children}
      </Toolbar>
    </Role.header>
  );
}

export { AkHeader };
