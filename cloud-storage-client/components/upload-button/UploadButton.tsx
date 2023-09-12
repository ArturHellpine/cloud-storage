import React, { FC } from 'react'
import styles from '@/styles/Home.module.scss'
import { Button, Upload, UploadFile, notification } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'
import * as Api from "@/api"

export const UploadButton: FC = () => {
    const [fileList, setFileList] = React.useState<UploadFile[]>([])

    const onUploadSuccess = async (options: any) => {
        try {
            const file = await Api.files.uploadFile(options)
            setFileList([])
            window.location.reload()
        } catch (err) {
            notification.error({
                message: "Помилка!",
                description: "Не вдалось завантажити файл",
                duration: 1.5,
              });
        }
    }

  return (
    <Upload
        customRequest={onUploadSuccess}
        fileList={fileList}
        onChange={({fileList}) => setFileList(fileList)}
        className={styles.upload}
    >
        <Button type='primary' icon={ <CloudUploadOutlined /> } size='large'>
            Завантажити
        </Button>
    </Upload>
  )
}
