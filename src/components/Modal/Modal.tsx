import clsx from "clsx";
import { PropsWithChildren, useEffect } from "react";
import styles from "./Modal.module.css";

type ModalProps = PropsWithChildren<{
  isShown: boolean;
  onCancel: () => void;
}>;

export const Modal = ({ isShown, onCancel, children }: ModalProps) => {
  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [onCancel]);

  if (!isShown) {
    return;
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={clsx(styles.overlay, { [styles.visible]: isShown })}
        onClick={onCancel}
      ></div>
      <div
        className={clsx(styles.modal, {
          [styles.shown]: isShown,
        })}
      >
        {children}
      </div>
    </div>
  );
};
