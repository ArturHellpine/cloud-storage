import React from "react";
import styles from "./FileActions.module.scss";
import { Button, Popconfirm } from "antd";

interface FileActionsProps {
  onClickRemove: VoidFunction;
  isActive: boolean;
}

export const FileActions: React.FC<FileActionsProps> = ({ onClickRemove, isActive }) => {
  return (
    <div className={styles.root}>
      <Popconfirm
        title="Видалити файл(и)?"
        description="Всі файли будуть перенесені в корзину"
        okText="Так"
        cancelText="Ні"
        disabled={!isActive}
        onConfirm={onClickRemove}
      >
        <Button disabled={!isActive} type="primary" danger>
          Видалити
        </Button>
      </Popconfirm>
    </div>
  );
};