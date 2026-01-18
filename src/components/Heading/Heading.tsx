import type { PropsWithChildren } from "react";

import styles from "./Heading.module.scss";
import classNames from "classnames";

const headingClasses = {
  1: styles.h1,
  2: styles.h2,
  3: styles.h3,
  4: styles.h4,
  5: styles.h5,
  6: styles.h6,
};

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  appearance?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const Heading = ({
  children,
  level,
  appearance,
}: PropsWithChildren<HeadingProps>) => {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  if (!appearance) {
    appearance = level;
  }

  const appearanceClass = appearance ? headingClasses[appearance] : undefined;

  return (
    <Tag className={classNames(styles.heading, appearanceClass)}>
      {children}
    </Tag>
  );
};
