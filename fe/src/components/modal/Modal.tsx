import styles from "../../styles/modal.module.css";

import useModalStore from "../../store/useModalStore";

import Button from "../shared/Button";

export default function Modal() {
  const { toggle } = useModalStore();

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Title Placeholder * </h2>
        <p className={styles.description}>Description Placeholder *</p>
        <Button
          additionalClassName={styles.button}
          title="Confirm"
          type="button"
          onClick={() => toggle()}
        />
      </div>
    </div>
  );
}
