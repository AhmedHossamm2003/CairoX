import { Link } from "react-router-dom";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-red text-white hover:bg-brand-redDeep hover:shadow-red-glow border border-brand-red/60",
  secondary:
    "bg-brand-panel text-brand-text border border-brand-border hover:border-brand-red/60 hover:text-white hover:shadow-red-glow-sm",
  ghost:
    "bg-transparent text-brand-text hover:text-white hover:bg-white/5 border border-transparent",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

const buildClasses = (
  variant: Variant,
  size: Size,
  extra: string,
): string => `${base} ${variants[variant]} ${sizes[size]} ${extra}`;

type StyleProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonElProps = StyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof StyleProps> & {
    as?: "button";
  };

type AnchorElProps = StyleProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof StyleProps | "href"> & {
    as: "a";
    href: string;
  };

type RouterLinkProps = StyleProps & {
  as: "link";
  to: string;
};

export type ButtonProps = ButtonElProps | AnchorElProps | RouterLinkProps;

const Button = (props: ButtonProps) => {
  const variant: Variant = props.variant ?? "primary";
  const size: Size = props.size ?? "md";
  const classes = buildClasses(variant, size, props.className ?? "");

  if (props.as === "a") {
    const {
      as: _as,
      variant: _variant,
      size: _size,
      className: _className,
      children,
      ...rest
    } = props;
    void _as; void _variant; void _size; void _className;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  if (props.as === "link") {
    return (
      <Link to={props.to} className={classes}>
        {props.children}
      </Link>
    );
  }

  const {
    as: _as,
    variant: _variant,
    size: _size,
    className: _className,
    children,
    ...rest
  } = props;
  void _as; void _variant; void _size; void _className;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
