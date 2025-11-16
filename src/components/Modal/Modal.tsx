import clsx from "clsx";
import { PropsWithChildren, useCallback, useEffect } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  isShown: boolean;
  onCancel: () => void;
};

export const Modal = ({
  isShown,
  onCancel,
  children,
}: PropsWithChildren<ModalProps>) => {
  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    },
    [onCancel]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

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
