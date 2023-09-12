import { User } from "@/api/dto/auth.dto";
import { GetServerSidePropsContext, NextPage } from "next";
import styles from '@/styles/Profile.module.scss'
import { Button, Card, Divider, Row, Space } from "antd";
import { checkAuth } from "@/utils/checkAuth";
import * as Api from '@/api'
import { Layout } from "@/layouts/Layout";
import { useRouter } from "next/router";

interface DashboardProfilePageProps {
    userData: User
}

const DashboardProfilePage: NextPage<DashboardProfilePageProps> = ({ userData }) => {
    const router = useRouter()

    const onClickBack = () => {
        location.href = '/dashboard'
    }

    const onClickLogout = () => {
        Api.auth.logout()
        router.push('/dashboard/auth')
    }

    return (
        <main className={styles.main}>
            <div className={styles.root}>
                <Card>
                    <h3 style={{textAlign: 'center'}}>Детальна інформація</h3>
                    <Divider orientation="right">№ {userData.id}</Divider>
                    <p>Повне ім’я - <b>{userData.fullName}</b></p>
                    <p>Пошта - <b>{userData.email}</b></p>
                <br />
                <div className={styles.btnsInner}>
                    <Button onClick={onClickBack} type="primary">
                        Назад
                    </Button>
                    <Button onClick={onClickLogout} type="default" danger>
                        Вийти
                    </Button>
                </div>
                </Card>
            </div>
    </main>
    )
}

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
    return <Layout title="Profile">{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx)

    if('redirect' in authProps) {
        return authProps
    }
    
    const userData = await Api.auth.getMe()
    
    return {
        props: {
            userData
        }
    }
}

export default DashboardProfilePage