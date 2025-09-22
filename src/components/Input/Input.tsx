import React, { useEffect, useRef, useState } from "react";

interface InputProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setTypingStatus: React.Dispatch<React.SetStateAction<string>>;
  setTotalChars: React.Dispatch<React.SetStateAction<number>>;
}

const Input = ({
  inputValue,
  setInputValue,
  isStarted,
  setIsStarted,
  setTypingStatus,
  setTotalChars,
}: InputProps) => {
  const suggestions: string[] = [
    "hello",
    "world",
    "marouftype",
    "keyboard",
    "coding",
    "javascript",
    "component",
    "performance",
    "development",
    "method",
    "double",
    "int",
    "float",
    "string",
    "boolean",
  ];

  const WORD_COUNT = 20;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [words, setWords] = useState<string[]>(() =>
    generateWords(WORD_COUNT, suggestions)
  );
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [typedWords, setTypedWords] = useState<string[]>([]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setTypingStatus(`${currentWordIndex}`);
  }, [currentWordIndex, words.length, setTypingStatus]);

  useEffect(() => {
    if (currentWordIndex >= words.length) {
      setWords(generateWords(WORD_COUNT, suggestions));
      setTypedWords([]);
      setCurrentWordIndex(0);
      setInputValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWordIndex]);

  function generateWords(count: number, source: string[]) {
    const out: string[] = [];
    for (let i = 0; i < count; i++) {
      out.push(source[Math.floor(Math.random() * source.length)]);
    }
    return out;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      !isStarted &&
      e.key.length === 1 &&
      !e.ctrlKey &&
      !e.metaKey &&
      e.key !== " "
    ) {
      setIsStarted(true);
    }

    if (e.key === " ") {
      e.preventDefault();
      const trimmed = inputValue.trim();
      setTotalChars((prev) => prev + trimmed.length);
      setTypedWords((prev) => {
        const copy = [...prev];
        copy[currentWordIndex] = trimmed;
        return copy;
      });
      setCurrentWordIndex((idx) => idx + 1);
      setInputValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // --- استایل‌ها: توجه کن spanها inline-block و lineHeight کوچکتر هستند ---
  const styles: { [k: string]: React.CSSProperties } = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: "center",
    },
    wordsBox: {
      maxWidth: 900,
      width: "100%",
      padding: "30px 25px",
      borderRadius: 20,
      boxShadow: "var(--gen-box-shadow)",
      fontFamily:
        '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      fontSize: 22,
      color: "#646669",
      lineHeight: "1.8", // کانتینر بزرگتر نگه داشته شده
      cursor: "text",
      userSelect: "none",
      display: "flex",
      flexWrap: "wrap",
      rowGap: 18,
      columnGap: 12,
    },
    // هر کلمه (پیش‌فرض) باید inline-block باشه تا margin/transform اثر کنه
    word: {
      display: "inline-block",
      paddingRight: 5,
      lineHeight: 1, // کوچکتر از lineHeight کانتینر => خط نزدیک‌تر میشه
      verticalAlign: "baseline",
    },
    // استایل خطای کلمه: بدون background آبی، border نزدیک به متن با translateY
    wordWrong: {
      display: "inline-block",
      paddingRight: 5,
      borderBottom: "1px solid #dc2626",
      lineHeight: 1,
      verticalAlign: "baseline",
      // transform: "translateY(-2px)",
      backgroundColor: "transparent",
    },
    charDefault: { opacity: 0.55 },
    charCorrect: {
      color: "#000",
      fontWeight: "bold",
    },
    charWrong: { color: "#dc2626" },
    caret: {
      display: "inline-block",
      width: 2.5,
      height: 25,
      borderRadius: 20,
      background: "#111827",
      marginLeft: 2,
      verticalAlign: "middle",
      animation: "blink 0.9s step-start infinite",
    },
    inputHidden: {
      position: "absolute",
      opacity: 0,
      left: -9999,
      width: 0,
      height: 0,
    },
    status: { marginTop: 8, color: "#065f46", fontWeight: 600 },
  };

  const renderWord = (word: string, wi: number) => {
    const isCurrent = wi === currentWordIndex;
    const typed = typedWords[wi] ?? (isCurrent ? inputValue : "");

    if (wi < currentWordIndex) {
      const typedForThis = typedWords[wi] ?? "";
      const maxLen = Math.max(word.length, typedForThis.length);
      // تشخیص خطا: وقتی کاربر چیزی تایپ کرده و با word اصلی فرق داشته باشه
      const isWrong = typedForThis !== "" && typedForThis !== word;

      return (
        <span key={wi} style={isWrong ? styles.wordWrong : styles.word}>
          {Array.from({ length: maxLen }).map((_, i) => {
            const targetChar = word[i] ?? "";
            const typedChar = typedForThis[i] ?? "";
            if (typedChar === "") {
              return (
                <span
                  key={i}
                  style={targetChar ? styles.charDefault : styles.charWrong}
                >
                  {targetChar || typedChar}
                </span>
              );
            }
            const correct = typedChar === targetChar;
            return (
              <span
                key={i}
                style={correct ? styles.charCorrect : styles.charWrong}
              >
                {targetChar || typedChar}
              </span>
            );
          })}
        </span>
      );
    }

    if (isCurrent) {
      const letters = word.split("");
      const typedLen = inputValue.length;

      return (
        <span key={wi} style={styles.word}>
          {letters.map((ch, i) => {
            if (i < typedLen) {
              const correct = inputValue[i] === ch;
              return (
                <span
                  key={i}
                  style={correct ? styles.charCorrect : styles.charWrong}
                >
                  {ch}
                </span>
              );
            }
            const showCaret = i === typedLen;
            return (
              <span key={i} style={styles.charDefault}>
                {ch}
                {showCaret && <span style={styles.caret} />}
              </span>
            );
          })}

          {typedLen > letters.length &&
            Array.from(inputValue.slice(letters.length)).map((ch, j) => (
              <span key={"extra-" + j} style={styles.charWrong}>
                {ch}
              </span>
            ))}

          {typedLen === letters.length && (
            <span style={{ marginLeft: 0 }}>
              <span style={styles.caret} />
            </span>
          )}
        </span>
      );
    }

    return (
      <span key={wi} style={styles.word}>
        <span style={styles.charDefault}>{word}</span>
      </span>
    );
  };

  return (
    <div style={styles.wrapper}>
      <div onClick={handleContainerClick} style={styles.wordsBox} aria-hidden>
        {words.map((w, i) => renderWord(w, i))}
      </div>

      <input
        ref={inputRef}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={styles.inputHidden}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        tabIndex={0}
      />
    </div>
  );
};

export default Input;
