import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import styles from "./Clickable.module.scss";
import classNames from "classnames";

export const Clickable = ({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button className={classNames(styles.clickable, className)} {...props}>
      {children}
    </button>
  );
};
