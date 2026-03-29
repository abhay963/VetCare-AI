
"use client";

import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Stethoscope, PawPrint, User } from "lucide-react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const PREFIX = "VapiWidget";

const classes = {
  card: `${PREFIX}-card`,
  messageContainer: `${PREFIX}-message-container`,
  messageList: `${PREFIX}-message-list`,
  messageItem: `${PREFIX}-message-item`,
  messageText: `${PREFIX}-message-text`,
  statusIndicator: `${PREFIX}-status-indicator`,
  button: `${PREFIX}-button`,
};

const StyledCard = styled(Card)(({ theme }) => ({
  [`&.${classes.card}`]: {
    padding: theme.spacing(4),
  },
}));

const StyledMessageContainer = styled("div")(({ theme }) => ({
  [`&.${classes.messageContainer}`]: {
    maxHeight: 300,
    overflowY: "auto",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const StyledMessageList = styled("ul")(({ theme }) => ({
  [`&.${classes.messageList}`]: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
}));

const StyledMessageItem = styled("li")(({ theme }) => ({
  [`&.${classes.messageItem}`]: {
    marginBottom: theme.spacing(2),
  },
}));

const StyledMessageText = styled(Typography)(({ theme }) => ({
  [`&.${classes.messageText}`]: {
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.secondary,
  },
}));

const StyledStatusIndicator = styled("div")(({ theme }) => ({
  [`&.${classes.statusIndicator}`]: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

function VapiWidget() {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);

  const { user, isLoaded } = useUser();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleCallStart = () => {
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          content: message.transcript,
          role: message.role,
        };

        // prevent duplicates
        setMessages((prev) => {
          if (prev.length && prev[prev.length - 1].content === newMessage.content) {
            return prev;
          }
          return [...prev, newMessage];
        });
      }
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage);

    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage);
    };
  }, []);

  const toggleCall = async () => {
    if (callActive) vapi.stop();
    else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID);
      } catch {
        setConnecting(false);
      }
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 flex flex-col pb-20">
      
      {/* TITLE */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          Talk to <span className="text-primary">VetCare AI 🐾</span>
        </h1>
        <p className="text-muted-foreground">
          AI-powered veterinary assistant for pets & farm animals
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        {/* AI CARD */}
        <StyledCard className={`p-6 flex flex-col items-center justify-center relative ${classes.card}`}>
          
          {/* ICON */}
          <div className="relative size-32 mb-4 flex items-center justify-center rounded-full bg-primary/10">
            <div className={`${isSpeaking ? "animate-pulse" : ""}`}>
              <Stethoscope size={60} className="text-primary" />
            </div>

            {/* paw overlay */}
            <PawPrint size={20} className="absolute bottom-2 right-2 text-primary" />
          </div>

          <h2 className="text-xl font-bold">VetCare AI</h2>
          <p className="text-sm text-muted-foreground">Veterinary Assistant</p>

          {/* STATUS */}
          <StyledStatusIndicator className={classes.statusIndicator}>
            <div className={`w-2 h-2 rounded-full ${
              isSpeaking ? "bg-primary animate-pulse" : "bg-muted"
            }`} />
            <span className="text-xs">
              {isSpeaking
                ? "Speaking..."
                : callActive
                ? "Listening..."
                : callEnded
                ? "Call ended"
                : "Waiting..."}
            </span>
          </StyledStatusIndicator>
        </StyledCard>

        {/* USER CARD */}
        <Card className="p-6 flex flex-col items-center justify-center">
          
          <div className="size-32 mb-4 flex items-center justify-center rounded-full bg-muted">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt="user"
                className="size-full rounded-full object-cover"
              />
            ) : (
              <User size={60} className="text-muted-foreground" />
            )}
          </div>

          <h2 className="text-xl font-bold">You</h2>
          <p className="text-sm text-muted-foreground">
            {user
              ? (user.firstName + " " + (user.lastName || "")).trim()
              : "Guest"}
          </p>

          <div className="mt-4 flex items-center gap-2 px-3 py-1 border rounded-full">
            <div className="w-2 h-2 rounded-full bg-muted" />
            <span className="text-xs">Ready</span>
          </div>
        </Card>
      </div>

      {/* MESSAGES */}
      {messages.length > 0 && (
        <StyledMessageContainer ref={messageContainerRef} className={classes.messageContainer}>
          <StyledMessageList className={classes.messageList}>
            {messages.map((msg, i) => (
              <StyledMessageItem key={i} className={classes.messageItem}>
                <StyledMessageText className={classes.messageText}>
                  <span className="text-xs text-muted-foreground">
                    {msg.role === "assistant" ? "VetCare AI" : "You"}:
                  </span>
                  <p>{msg.content}</p>
                </StyledMessageText>
              </StyledMessageItem>
            ))}
          </StyledMessageList>

          {callEnded && (
            <p className="text-primary">
              Call ended. Thanks for using VetCare AI 🐾
            </p>
          )}
        </StyledMessageContainer>
      )}

      {/* BUTTON */}
      <div className="flex justify-center">
        <Button
          className={`w-44 text-lg rounded-3xl ${classes.button}`}
          onClick={toggleCall}
          disabled={connecting || callEnded}
        >
          {callActive
            ? "End Call"
            : connecting
            ? "Connecting..."
            : callEnded
            ? "Call Ended"
            : "Start Consultation"}
        </Button>
      </div>
    </div>
  );
}

export default VapiWidget;