import type { PropsWithChildren } from "react";

type PropertiesProps = {};

export const Properties = ({
  children,
}: PropsWithChildren<PropertiesProps>) => {
  return <div>{children}</div>;
};
