import styles from "../styles/button.module.css";

import type { ReactNode, KeyboardEvent } from "react";

import type { LucideIcon } from "lucide-react";

interface Props {
  title?: string;
  type?: "button" | "submit" | "reset";
  visual?: "primary" | "secondary" | "ghost" | "danger" | "success";
  onClick?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
  additionalClassName?: string;
  disabled?: boolean;
  Icon?: LucideIcon;
  iconColor?: string;
  iconSize?: number;
  strokeWidth?: number;
  role?: string;
  ariaLabel?: string;
  ariaHaspopup?: "menu" | "listbox" | "tree" | "grid" | "dialog" | boolean;
  ariaExpanded?: boolean;
  children?: ReactNode;
}

export default function Button({
  title,
  type,
  visual,
  onClick,
  additionalClassName,
  disabled,
  Icon,
  iconColor,
  iconSize,
  strokeWidth,
  role,
  ariaLabel,
  ariaHaspopup,
  ariaExpanded,
  children,
  onKeyDown
}: Props){
  return (
    <button
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      disabled={disabled ?? false}
      type={type ?? "button"}
      role={role}
      aria-label={ariaLabel}
      className={`${styles[visual ?? "primary"]} ${
        additionalClassName ? additionalClassName : ""
      } ${disabled ? styles.disabled : ""}`}
      onClick={() => onClick && onClick()}
      onKeyDown={(e) => onKeyDown && onKeyDown(e)}
    >
      {Icon && (
        <Icon
          strokeWidth={strokeWidth ?? 2}
          size={iconSize ?? 16}
          color={iconColor}
        />
      )}
      {title && title}
      {children && children}
    </button>
  );
};
