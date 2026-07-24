import styles from "../../styles/formHeader.module.css";

import Logo from "../../assets/formbuilder.svg?react";

import Button from "../shared/Button";

import { Layout, SaveCheck, LogOut, UserPen, Trash } from "lucide-react";

import useModalStore from "../../store/useModalStore";

type Props = {
  saveTemplate: () => void;
  logout: () => void;
};

export default function FormHeader({ saveTemplate, logout }: Props) {
  const { toggle } = useModalStore();

  return (
    <>
      <div className={styles.headerLeft}>
        <div className={styles.logoContainer}>
          <Logo className={styles.logo} width={160} height={40} />
        </div>
      </div>
      <div className={styles.headerCenter}>
        <Button type="button" onClick={() => toggle("templates")}>
          <Layout />
        </Button>
        <div className={styles.templateActionBtns}>
          <Button visual="danger" type="button" onClick={() => {}}>
            <Trash />
          </Button>
          <Button visual="success" type="button" onClick={() => saveTemplate()}>
            <SaveCheck />
          </Button>
        </div>
      </div>
      <div className={styles.headerRight}>
        <Button type="button" visual="success" onClick={() => toggle("profile")}>
          <UserPen />
        </Button>
        <Button visual="danger" type="button" onClick={() => logout()}>
          <LogOut />
        </Button>
      </div>
    </>
  );
}
