"use client";

type TopicButtonProps = {
  name: string;
  handleTopicChange: (arg: string) => void;
};

export default function TopicButton({
  name,
  handleTopicChange,
}: TopicButtonProps) {
  return (
    <button className="capitalize" onClick={() => handleTopicChange(name)}>
      {name}
    </button>
  );
}
