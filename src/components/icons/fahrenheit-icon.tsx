import type { SVGProps } from "react";

export function FahrenheitIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M13 12h4" />
      <path d="M13 6h7" />
      <path d="M13 6v12" />
      <path d="M8 6a2 2 0 1 0 0 4 2 2 0 1 0 0-4Z" />
    </svg>
  );
}
