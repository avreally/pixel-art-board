import clsx from "clsx";
import styles from "./ClearConfirmation.module.css";

type ClearConfirmationProps = {
  onConfirm?: () => void;
  onCancel: () => void;
  headerText: string;
  text: string;
  confirmButtonText: string;
};

export const ClearConfirmation = ({
  onConfirm,
  onCancel,
  headerText,
  text,
  confirmButtonText,
}: ClearConfirmationProps) => {
  return (
    <>
      <h3 className={styles.title}>{headerText}</h3>
      <p className={styles.text}>{text}</p>

      <div className={styles.buttons}>
        <button
          className={clsx(styles.button, styles.cancel)}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className={clsx(styles.button, styles.clear)}
          onClick={onConfirm}
        >
          {confirmButtonText}
        </button>
      </div>
    </>
  );
};
