import React from "react";
// import { useHoverIntent } from "react-use-hoverintent";
import { Button, Feed, Ref, Transition } from "semantic-ui-react";
import { useHover } from "../util/useHover";

export type MessageRecord = {
  id: string;
  avatarUrl: string;
  username: string;
  timestamp: Date;
  content: string;
};

export type MessageProps = {
  message: MessageRecord;
};

export function Message({ message }: MessageProps) {
  //   const [isHovering, hoverTarget] = useHoverIntent({});
  const [hoverRef, isHovered] = useHover();

  return (
    // @ts-expect-error
    <Ref innerRef={hoverRef}>
      <Feed.Event>
        <Feed.Label image={message.avatarUrl} />
        <Feed.Content>
          <Feed.Summary>
            {message.username}
            <Feed.Date>{message.timestamp.toLocaleString()}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>{message.content}</Feed.Extra>
          {/* @ts-expect-error */}
          <Transition visible={isHovered} animation="fade" duration={100}>
            <Feed.Meta>
              <Button.Group size="tiny">
                <Button icon="edit" content="Edit" className="tertiary" />
                <Button icon="remove" content="Remove" className="tertiary" />
              </Button.Group>
            </Feed.Meta>
          </Transition>
        </Feed.Content>
      </Feed.Event>
    </Ref>
  );
}
