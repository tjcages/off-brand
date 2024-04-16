import React, { useEffect, useRef, useState } from "react";

class TextScramble {
  chars: string;

  constructor(chars: string) {
    this.chars = chars;
  }
  scramble(oldText: string, newText: string) {
    const length = Math.max(oldText.length, newText.length);
    const queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 10);
      const end = start + Math.floor(Math.random() * 10);
      queue.push({ from, to, start, end });
    }
    return queue;
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

interface Props {
  children: string;
}

const ScrambleText = ({ children }: Props) => {
  const [output, setOutput] = useState("");
  const frameRef = useRef(0);
  const scrambleRef = useRef(
    new TextScramble("~~")
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queueRef = useRef([]) as React.MutableRefObject<any[]>;
  const oldTextRef = useRef("");

  useEffect(() => {
    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0, n = queueRef.current.length; i < n; i++) {
        const { from, to, start, end } = queueRef.current[i];
        let { char } = queueRef.current[i];
        if (frameRef.current >= end) {
          complete++;
          output += to;
        } else if (frameRef.current >= start) {
          if (!char || Math.random() < 0.28) {
            char = scrambleRef.current.randomChar();
            queueRef.current[i].char = char;
          }
          output += `<span class="opacity-20">${char}</span>`;
        } else {
          output += from;
        }
      }
      setOutput(output);
      if (complete !== queueRef.current.length) {
        frameRef.current++;
        requestAnimationFrame(update);
      }
    };

    queueRef.current = scrambleRef.current.scramble(
      oldTextRef.current,
      children
    );
    frameRef.current = 0;
    oldTextRef.current = children;
    update();

    return () => cancelAnimationFrame(frameRef.current);
  }, [children]);

  return <p className="text" dangerouslySetInnerHTML={{ __html: output }} />;
};

export default ScrambleText;
