import React, { FC } from 'react'
import styles from './Auth.module.scss'
import { Button, Form, Input, notification } from 'antd'
import { LoginFormDTO } from '@/api/dto/auth.dto'
import { setCookie } from 'nookies'
import * as Api from '@/api'

export const LoginForm: FC = () => {

    const onSubmit = async (values: LoginFormDTO) => {
        try {
            const { token } = await Api.auth.login(values)

            notification.success({
                message: "Успішно!",
                description: "Переходимо до адмін-панелі...",
                duration: 1
              })

              setCookie(null, "_token", token, {
                path: "/"
              });

              location.href = '/dashboard'
        } catch(err) {
            notification.error({
                message: "Помилка :(",
                description: "Невірний логін або пароль",
                duration: 1.5
              });
        }
    }

  return (
    <div className={styles.formBlock}>
      <Form name="basic" onFinish={onSubmit} labelCol={{ span: 5 }}>
        <Form.Item
          label="Пошта"
          name="email"
          rules={[
            {
              required: true,
              message: "Вкажіть пошту",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: "Вкажіть пароль",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Ввйти</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
