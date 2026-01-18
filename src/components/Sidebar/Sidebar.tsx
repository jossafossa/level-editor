import { useState, type PropsWithChildren } from "react";

import styles from "./Sidebar.module.scss";
import { Heading } from "../Heading";
import classNames from "classnames";

type CollapseButtonProps = {
  isCollapsed: boolean;
  onClick: () => void;
  area: "left" | "right";
};

const buttonLabels = {
  left: {
    collapsed: ">",
    expanded: "<",
  },
  right: {
    collapsed: "<",
    expanded: ">",
  },
};

const CollapseButton = ({
  isCollapsed,
  onClick,
  area,
}: CollapseButtonProps) => {
  return (
    <button onClick={onClick} className={styles.collapseButton}>
      {isCollapsed ? buttonLabels[area].collapsed : buttonLabels[area].expanded}
    </button>
  );
};

type SidebarProps = {
  title?: string;
  area?: "left" | "right";
};

export const Sidebar = ({
  children,
  title,
  area = "left",
}: PropsWithChildren<SidebarProps>) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.sidebarContainer}>
      {area === "right" && (
        <CollapseButton
          area={area}
          onClick={handleToggleCollapse}
          isCollapsed={isCollapsed}
        />
      )}
      <article
        className={classNames(
          styles.sidebar,
          isCollapsed ? styles.isCollapsed : undefined
        )}
      >
        {title && (
          <header>
            <Heading level={2} appearance={2}>
              {title}
            </Heading>
          </header>
        )}
        <section>{children}</section>
      </article>

      {area === "left" && (
        <CollapseButton
          area={area}
          onClick={handleToggleCollapse}
          isCollapsed={isCollapsed}
        />
      )}
    </div>
  );
};
