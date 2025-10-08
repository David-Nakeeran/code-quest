import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { client } from "@/lib/openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

// const QuizSchema = z.object({
//   question: z.string(),
//   options: z.array(z.string()).length(3),
//   correct_answer: z.string(),
//   doc_link: z.string().url(),
// });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { topic } = body;

  // const response = await client.responses.create({
  //   model: "gpt-5-nano-2025-08-07",
  //   input: [
  //     {
  //       role: "system",
  //       content:
  //         "You are a helpful JavaScript tutor. Create a single beginner level JavaScript question based on the user input. Include exactly three answer options and specify which one is correct.Also include a link to the official documentation related to the user.",
  //     },
  //     {
  //       role: "user",
  //       content: topic,
  //     },
  //   ],
  //   text: {
  //     format: {
  //       type: "json_schema",
  //       name: "quiz-question",
  //       schema: {
  //         type: "object",
  //         properties: {
  //           question: { type: "string" },
  //           options: {
  //             type: "array",
  //             items: { type: "string" },
  //             minItems: 3,
  //             maxItems: 3,
  //           },
  //           correct_answer: { type: "string" },
  //           doc_link: { type: "string" },
  //         },
  //         required: ["question", "options", "correct_answer", "doc_link"],
  //         additionalProperties: false,
  //       },
  //     },
  //   },
  // });

  // const quizQuestion = response.output_text;

  const mockQuiz = `{
  "question": "What is the correct way to create an object in JavaScript?",
  "options": ["const obj = {};", "const obj = [];", "const obj = Object[];"],
  "correct_answer": "const obj = {};",
  "doc_link": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"
}`;

  return NextResponse.json({ success: true, data: mockQuiz }, { status: 200 });
}
