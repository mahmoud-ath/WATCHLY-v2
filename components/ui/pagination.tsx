import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "../../lib/utils"
import { useTheme } from "../../contexts/ThemeContext"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "flex flex-row items-center gap-2 px-3 py-2.5",
      "bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-800/50",
      "shadow-lg shadow-slate-950/50",
      className
    )}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & React.ComponentProps<"button">

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => {
  const { themeClasses } = useTheme();
  
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative inline-flex items-center justify-center",
        "h-10 min-w-[2.5rem] px-3",
        "text-sm font-semibold transition-all duration-300",
        "rounded-lg",
        
        // Base state
        isActive 
          ? `${themeClasses.button} text-white border ${themeClasses.border} shadow-lg ${themeClasses.glow}`
          : `bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-800 hover:text-white hover:border-slate-600 hover:shadow-lg ${themeClasses.glowHover}`,
        
        // Hover & Active effects
        !isActive && "hover:scale-[1.02]",
        isActive && themeClasses.glow.replace('shadow-', 'shadow-[0_0_20px_'),
        
        // Disabled
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-slate-800/50 disabled:hover:border-slate-700/50 disabled:hover:shadow-none",
        
        // Focus
        `focus:outline-none focus:ring-2 ${themeClasses.border.replace('border-', 'focus:ring-')} focus:ring-offset-2 focus:ring-offset-slate-950`,
        
        className
      )}
      {...props}
    />
  );
}
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn("gap-1.5 pl-2.5 pr-3", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="text-xs font-semibold tracking-wide">Prev</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn("gap-1.5 pl-3 pr-2.5", className)}
    {...props}
  >
    <span className="text-xs font-semibold tracking-wide">Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex h-10 min-w-[2.5rem] items-center justify-center",
      "text-slate-500",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}