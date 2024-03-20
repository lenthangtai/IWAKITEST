import React, { useEffect, useState } from "react";
import "./Login2.css";
import logoIwaki from "../../Images/LogoIwaki.svg";
import BackgroundIconVector from "../../Images/BackgroundIconVector.svg";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import userIcon from "../../Images/userIcon.svg";
import passwordIcon from "../../Images/passwordIcon.svg";
import Arrow from "../../Images/ArrowIconLogin.svg";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login2() {
  const [form] = Form.useForm();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   if (isAuthenticated === true) {
  //     if (sessionStorage.getItem("token")) {
  //       if (
  //         JSON.parse(sessionStorage.getItem("userInfo")).user_role_title ===
  //         "APP_USER"
  //       ) {
  //         // history.push("/");
  //         // window.location.href = "/";
  //       }
  //     }
  //   }
  // }, [isAuthenticated]);

  const onFinish = async (values) => {
    axios
      .post("http://192.168.10.22:5009/login_iwaki", {
        user_name: values.username,
        user_pw: values.password,
      })
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("token", true);
        sessionStorage.setItem("userInfo", JSON.stringify(res.data));
        setIsAuthenticated(true);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleLogin = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      onFinish(values);
    } catch (error) {
      console.log("Failed:", error);
    }
  };
  return (
    <div>
      <div className="Login">
        <div className="logoIwakiLogin">
          <img src={logoIwaki} />
          <p>Sign in to your account</p>
        </div>
        <div className="loginForm">
          <Form
            className="formLogin"
            form={form}
            name="horizontal_login"
            layout="inline"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input prefix={<img src={userIcon} />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                prefix={<img src={passwordIcon} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
          </Form>
        </div>
        <div className="FooterLoginForm">
          <div className="FooterItemLogin">
            <Link className="linkForgot">
              <span className="spanForgot">Forgot your password</span>
            </Link>
            <Button
              className="btnSignIn"
              htmlType="submit"
              onClick={handleLogin}
            >
              <span style={{ margin: "auto" }}>Sign in</span>
              <img className="iconArrow" src={Arrow} alt="" />
            </Button>
          </div>
        </div>
        <div className="imageNenVectorLogin">
          <img src={BackgroundIconVector} />
        </div>
      </div>
    </div>
  );
}
