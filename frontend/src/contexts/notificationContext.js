import React, { useState, createContext } from "react";
import Notification from "@/components/Notification";
import styles from "@/styles/Notification.module.css";
import { v4 } from "uuid";

export const Context = createContext({
  onPresent: () => {},
});

const NotificationProvider = (props) => {
  const [notification, setNotification] = useState([]);
  const handlePresent = (content) => {
    setNotification((prev) => [
      ...prev,
      {
        id: v4(),
        type: content.type,
        message: content.message,
      },
    ]);
  };

  return (
    <Context.Provider
      value={{
        onPresent: handlePresent,
      }}
    >
      <div className={styles["notification-wrapper"]}>
        {notification.map((note) => (
          <Notification
            setNotification={setNotification}
            key={note.id}
            {...note}
          />
        ))}
      </div>

      {props.children}
    </Context.Provider>
  );
};

export default NotificationProvider;
