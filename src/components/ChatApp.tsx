import React from "react";
import { Input, Sidebar } from "semantic-ui-react";
import AppSidebar from "./AppSidebar";
import { ConversationHeader } from "./Header";

export function ChatApp(props) {
  return (
    <div className="app-container">
      <div className="app-menu">
        <AppSidebar />
      </div>
      <div className="app-header">
        <ConversationHeader />
      </div>
      <div className="app-main">
        <Sidebar.Pusher style={{ height: "100%" }}>
          {props.children}
        </Sidebar.Pusher>
      </div>
      <div className="app-input">
        <Input fluid />
      </div>
    </div>
  );
}
