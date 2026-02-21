import React, { useState, useEffect, useRef } from "react";
import { Text } from "react-native";

const Typewriter = ({
  text = "",
  highlightWord = "",
  highlightStyle = {},
  speed = 80,
  delay = 300,
  style,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    // prevent multiple runs
    if (startedRef.current) return;
    startedRef.current = true;

    setDisplayedText("");

    const startTimeout = setTimeout(() => {
      let index = 0;

      intervalRef.current = setInterval(() => {
        setDisplayedText((prev) => {
          if (index >= text.length) {
            clearInterval(intervalRef.current);
            return prev;
          }
          const next = prev + text[index];
          index++;
          return next;
        });
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text]);

  // highlight word safely
  const parts = highlightWord
    ? displayedText.split(new RegExp(`(${highlightWord})`, "gi"))
    : [displayedText];

  return (
    <Text style={style}>
      {parts.map((part, index) =>
        highlightWord &&
        part.toLowerCase() === highlightWord.toLowerCase() ? (
          <Text key={index} style={highlightStyle}>
            {part}
          </Text>
        ) : (
          <Text key={index}>{part}</Text>
        )
      )}
    </Text>
  );
};

export default React.memo(Typewriter);