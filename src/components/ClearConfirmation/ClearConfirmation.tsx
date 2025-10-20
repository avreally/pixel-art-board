import clsx from "clsx";
import styles from "./ClearConfirmation.module.css";

type ClearConfirmationProps = {
  onConfirm?: () => void;
  onCancel: () => void;
};

export const ClearConfirmation = ({
  onConfirm,
  onCancel,
}: ClearConfirmationProps) => {
  return (
    <>
      <h3 className={styles.title}>Clear canvas?</h3>
      <p className={styles.text}>
        Are you sure you want to clear current canvas?
      </p>

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
          Clear
        </button>
      </div>
    </>
  );
};
