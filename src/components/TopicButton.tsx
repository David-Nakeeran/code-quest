"use client";

export default function TopicButton({ name }: { name: string }) {
  function handleClick() {
    console.log("Clicked");
  }
  return (
    <button className="capitalize" onClick={() => handleClick()}>
      {name}
    </button>
  );
}
