import { Avatar, Button, Layout, Menu, Popover } from "antd";
import { FC, useEffect } from "react";
import { CloudOutlined, LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from './Header.module.scss'
import * as Api from '@/api'


export const Header: FC = () => {
    const router = useRouter()
    const selectedMenu = router.pathname

    const onLogout = () => {
        Api.auth.logout()
        router.push('/dashboard/auth')
    }

    return (
        <Layout.Header className={styles.root}>
            <div className={styles.headerInner}>
                <div className={styles.headerLeft}>
                    <h2><CloudOutlined /> Cloud Storage</h2>
                    <Menu 
                        className={styles.topMenu}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[selectedMenu]}
                        onSelect={({ key }) => router.push(key)}
                        items={[
                            { key: '/dashboard', label: 'Головна' },
                            { key: '/dashboard/profile', label: 'Профіль' }
                        ]}
                    />
                </div>
                <div className={styles.headerRight}>
                    <Popover
                        trigger='click'
                        content={
                            <Button type='primary' danger onClick={onLogout}>
                                Вийти
                            </Button>
                        }
                    >
                        <Avatar>
                            <LogoutOutlined />
                        </Avatar>
                    </Popover>
                </div>
            </div>
        </Layout.Header>
    )
}