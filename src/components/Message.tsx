import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
// import { useHoverIntent } from "react-use-hoverintent";
import { Button, Feed, Ref } from "semantic-ui-react";
import { useHover } from "../util/useHover";

export type MessageRecord = {
  id: string;
  author: {
    avatarURL: string;
    username: string;
  };
  timestamp: number;
  content: string;
};

export type MessageProps = {
  message: MessageRecord;
};

export function Message({ message }: MessageProps) {
  //   const [isHovering, hoverTarget] = useHoverIntent({});
  const [hoverRef, isHovered] = useHover();
  const router = useRouter();
  const { slug, messageID } = router.query;

  useEffect(() => {
    requestAnimationFrame(() => {
      if (messageID === message.id) {
        console.log("scrolling into view " + messageID);
        hoverRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          // inline: "end",
        });
      }
    });
  }, [messageID]);

  return (
    // @ts-expect-error
    <Ref innerRef={hoverRef}>
      <Feed.Event
        id={message.id}
        className={messageID === message.id ? "active" : ""}
      >
        <Feed.Label image={message.author.avatarURL} />
        <Feed.Content>
          <Feed.Summary>
            {message.author.username}
            <Feed.Date>
              <Link href={`/conversation/${slug}/${message.id}`}>
                {new Date(message.timestamp * 1000).toLocaleString()}
              </Link>
            </Feed.Date>
            {/*             <Transition
              visible={isHovered}
              animation="fade"
              duration={100}
              style={{ display: "inline-block" }}
            > */}
            <Button.Group
              size="tiny"
              style={{ marginLeft: "14px", opacity: isHovered ? 1 : 0 }}
            >
              <Button icon="edit" content="Edit" className="tertiary" />
              <Button icon="remove" content="Remove" className="tertiary" />
            </Button.Group>
            {/* <Feed.Meta></Feed.Meta> */}
            {/* </Transition> */}
          </Feed.Summary>
          <Feed.Extra text>{message.content}</Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    </Ref>
  );
}
