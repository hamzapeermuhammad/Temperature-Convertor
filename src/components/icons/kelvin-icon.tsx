import type { SVGProps } from "react";

export function KelvinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 4v16" />
      <path d="M8 12h4l6-8" />
      <path d="M12 12l6 8" />
    </svg>
  );
}
