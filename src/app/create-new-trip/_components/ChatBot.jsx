"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import EmptyBoxState from "./EmptyBoxState";
import GroupSIzeUi from "./GroupSIzeUi";
import BudgetUi from "./BudgetUi";
import DaysUi from "./DaysUi";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useUserDetail } from "@/app/Context/UserDetailContext";
import { v4 as uuidv4 } from "uuid";
import { useTripDetail } from "@/app/Context/TripDetailContext";

export default function ChatBot() {
  const { userDetail } = useUserDetail();
  const { setTripDetailInfo } = useTripDetail();

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);

  // Prevent infinite final trigger
  const hasTriggeredFinal = useRef(false);

  const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail);

  /* ---------------- SEND MESSAGE ---------------- */
  const onSend = async (input) => {
    const text = input ?? userInput;
    if (!text.trim()) return;

    setLoading(true);

    const newMsg = {
      role: "user",
      content: text,
    };

    setUserInput("");

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);

    try {
      const result = await axios.post("/api/aimodel", {
        messages: updatedMessages,
        isFinal,
      });

      const data = result.data;

      if (!isFinal) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data?.resp,
            ui: data?.ui,
          },
        ]);
      } else {
        setTripDetailInfo(data?.trip_plan);

        if (userDetail?._id) {
          await SaveTripDetail({
            tripDetail: data?.trip_plan,
            tripId: uuidv4(),
            uid: userDetail._id,
          });
        }
      }
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RENDER DYNAMIC UI ---------------- */
  const RenderGenerativeUI = (ui) => {
    if (ui === "budget") {
      return <BudgetUi onSelectOption={(v) => onSend(v)} />;
    }
    if (ui === "groupSize") {
      return <GroupSIzeUi onSelectOption={(v) => onSend(v)} />;
    }
    if (ui === "TripDuration") {
      return <DaysUi onSelectOption={(v) => onSend(v)} />;
    }
    return null;
  };

  /* ---------------- FINAL STEP HANDLER ---------------- */
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui === "Final" && !isFinal && !hasTriggeredFinal.current) {
      hasTriggeredFinal.current = true;
      setIsFinal(true);
      onSend("Ok Great..");
    }
  }, [messages, isFinal]);

  /* ---------------- UI ---------------- */
  return (
    <div className="h-[85vh] flex flex-col">
      {messages.length === 0 && (
        <EmptyBoxState onSelectOption={(v) => onSend(v)} />
      )}

      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) =>
          msg.role === "user" ? (
            <div className="flex justify-end mt-2" key={index}>
              <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                {msg.content}
                {RenderGenerativeUI(msg.ui)}
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="w-full max-w-xl relative border rounded-2xl p-4 bg-white shadow">
          <Textarea
            placeholder="Start typing from here..."
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button
            size="icon"
            className="absolute bottom-6 right-6"
            onClick={() => onSend()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
