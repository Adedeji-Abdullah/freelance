"use client";

import React from "react";
import { Link } from "react-router-dom";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  to?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Button({ to, children, className = "", ...rest }: Props) {
  const base = "btn-primary";
  const cls = `${base} ${className}`.trim();
  if (to)
    return (
      <Link to={to} className={cls} {...(rest as any)}>
        {children}
      </Link>
    );
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
