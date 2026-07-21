import { useIsDesktop } from "../../hooks/useIsDesktop";

import styles from "../../styles/desktopGuard.module.css"

type Props = {
  children: React.ReactNode;
};

export default function DesktopGuard({ children }: Props) {
  const isDesktop = useIsDesktop();

  if (!isDesktop) {
    return (
      <div className={styles.wrapper} >
          <h2>Desktop Required</h2>
          <p>
            This application is only available on desktop devices.
          </p>
      </div>
    );
  }

  return children;
}