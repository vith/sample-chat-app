import React from "react";
import { useHoverIntent } from "react-use-hoverintent";
import { Button, Feed, Ref, Transition } from "semantic-ui-react";

export function Message({ message }) {
  const [isHovering, hoverTarget] = useHoverIntent({});

  return (
    // @ts-expect-error
    <Ref innerRef={hoverTarget}>
      <Feed.Event>
        <Feed.Label image={message.avatarUrl} />
        <Feed.Content>
          <Feed.Summary>
            {message.username}
            <Feed.Date>{message.timestamp.toLocaleString()}</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>{message.content}</Feed.Extra>
          {/* @ts-expect-error */}
          <Transition visible={isHovering} animation="fade" duration={100}>
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
