import React from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import { checkAuth } from "@/utils/checkAuth";
import { Layout } from "@/layouts/Layout";
import { FileItem } from "@/api/dto/files.dto";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Files } from "@/modules/Files";
import * as Api from '@/api'

interface Props {
    items: FileItem[]
}

const DashboardTrash: NextPage<Props> = ({ items }) => {
    return (
        <DashboardLayout>
            <Files items={items} />
        </DashboardLayout>
    )
}

DashboardTrash.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard Trash">{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx)

    if('redirect' in authProps) {
        return authProps
    }

    try {
        const items = await Api.files.getAll('trash')
        return {
            props: { items }
        }
        } catch (err) {
            return {
                props: { items: [] }
            }
        }
} 

export default DashboardTrash