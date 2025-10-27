import React, { useState, useEffect } from "react";
import { Text } from "react-native";

const Typewriter = ({
  text,
  highlightWord,
  highlightStyle,
  speed = 100,
  delay = 0,
  style,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  
  const parts = displayedText.split(new RegExp(`(${highlightWord})`, "gi"));

  return (
    <Text style={style}>
      {parts.map((part, index) =>
        part.toLowerCase() === highlightWord?.toLowerCase() ? (
          <Text key={index} style={highlightStyle}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
};

export default Typewriter;
