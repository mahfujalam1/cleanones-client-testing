"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider, theme as antdTheme } from "antd";
import { initializeAuth, getStoredUser, type UserProfile } from "@/redux/slices/authSlice";
import { getAccessToken, getRefreshToken, setAuthCookies } from "@/redux/baseApi";


function AuthInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initialize = () => {
      const savedUser = getStoredUser();
      const token = getAccessToken();
      if (savedUser || token) {
        const userToSet: UserProfile = savedUser
          ? { ...savedUser }
          : {
            name: "Client",
            email: "",
            status: "Active",
            role: "client",
            access_token: token || undefined,
            token: token || undefined,
          };

        if (!userToSet.access_token && token) {
          userToSet.access_token = token;
        }
        if (!userToSet.token && token) {
          userToSet.token = token;
        }

        
        if (userToSet.access_token) {
          const refreshToken = getRefreshToken();
          const isRemembered =
            typeof window !== "undefined" &&
            Boolean(localStorage.getItem("cleanones-client-user") || localStorage.getItem("cleanones_client_access_token"));
          setAuthCookies(userToSet.access_token, refreshToken || undefined, isRemembered);
        }

        store.dispatch(initializeAuth(userToSet));
      } else {
        store.dispatch(initializeAuth(null));
      }
    };

    initialize();
  }, []);
  return children;
}

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <AuthInitializer><AntdRegistry>
        <ConfigProvider
          theme={{
            algorithm: antdTheme.compactAlgorithm,
            token: {
              colorPrimary: "#009EE2",
              colorBorder: "#dfe3ea",
              colorText: "#334155",
              fontSize: 12,
              controlHeight: 36,
              controlHeightSM: 30,
              borderRadius: 4,
              boxShadow: "none",
              boxShadowSecondary: "none",
              fontFamily: "var(--font-inter), sans-serif",
            },
            components: {
              Button: {
                boxShadow: "none",
                algorithm: true,
              },
              Input: {
                boxShadow: "none",
              },
              Select: {
                boxShadow: "none",
              },
            },
          }}
        >
          <App>{children}</App>
        </ConfigProvider>
      </AntdRegistry></AuthInitializer>
    </Provider>
  );
}
