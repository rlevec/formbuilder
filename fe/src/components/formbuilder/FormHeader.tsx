import styles from "../../styles/formHeader.module.css";

import Logo from "../../assets/formbuilder.svg?react";

import Button from "../shared/Button";

import { Layout, SaveCheck, LogOut, UserPen } from "lucide-react";

type Props = {
  saveTemplate: () => void;
  logout: () => void;
};

export default function FormHeader({ saveTemplate, logout }: Props) {
  return (
    <>
      <div className={styles.headerLeft}>
        <div className={styles.logoContainer}>
          <Logo className={styles.logo} width={160} height={40} />
        </div>
      </div>
      <div className={styles.headerCenter}>
        <Button>
          <Layout />
        </Button>
        <Button type="button" onClick={() => saveTemplate()}>
          <SaveCheck />
        </Button>
      </div>
      <div className={styles.headerRight}>
        <Button type="button">
          <UserPen />
        </Button>
        <Button type="button" onClick={() => logout()}>
          <LogOut />
        </Button>
      </div>
    </>
  );
}
