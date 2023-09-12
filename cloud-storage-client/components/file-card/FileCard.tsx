import React, { FC } from 'react'
import styles from "./FileCard.module.scss"
import { getExtensionFromFileName } from '@/utils/getExtensionFromFileName';
import { isImage } from '@/utils/isImage';
import { getColorByExtension } from '@/utils/getColorByExtension';
import { DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

interface FileCardProps {
    filename: string;
    originalName: string;
  }

export const FileCard: FC<FileCardProps> = ({ originalName, filename }) => {
    const ext = getExtensionFromFileName(filename)
    const imageUrl = ext && isImage(ext) ? "http://localhost:7777/uploads/" + filename : ""
    const router = useRouter()
    

    const color = getColorByExtension(ext);
    const classColor = styles[color];

    const withoutExt = originalName.replace(`.${ext}`, '')

    return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className={classColor}>{ext}</i>
        {
            isImage(ext) ? ( <img className={styles.image} src={imageUrl} alt="File" /> ) 
            : (
                <FileTextOutlined />
            )
        }
      </div>
        {router.pathname === '/dashboard/trash' ? 
        <span style={{color: 'red'}}>
          <DeleteOutlined /> -
          {withoutExt.slice(0, 6)} 
          {withoutExt.length < 6 ? `.${ext}` : `...${ext}`}
        </span>
        :
        <span>
          {withoutExt.slice(0, 6)} 
          {withoutExt.length < 6 ? `.${ext}` : `...${ext}`}
        </span>
      }
    </div>
  )
}
