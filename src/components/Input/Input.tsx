import React, { useEffect, useRef, useState } from "react";

interface InputProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input = ({
  inputValue,
  setInputValue,
  isStarted,
  setIsStarted,
}: InputProps) => {
  // پایه‌ای از کلمات پیشنهادی — هرچه خواستی اضافه/تغییر بده
  const suggestions: string[] = [
    "hello",
    "world",
    "react",
    "typescript",
    "monkeytype",
    "keyboard",
    "coding",
    "javascript",
    "component",
    "performance",
    "development",
  ];

  const WORD_COUNT = 40; // تعداد کلماتی که نمایش داده می‌شود

  const inputRef = useRef<HTMLInputElement | null>(null);

  // لیست کلمات فعلی (تصادفی ساخته می‌شود)
  const [words, setWords] = useState<string[]>(() =>
    generateWords(WORD_COUNT, suggestions)
  );

  // ایندکس کلمه‌ای که کاربر در حال تایپشه
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  // آرایه کلمات تایپ‌شده (هر ورود به کلمه بعدی روی این ذخیره می‌شود)
  const [typedWords, setTypedWords] = useState<string[]>([]);

  // هنگام mount، فوکوس روی input پنهان
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // وقتی کاربر به آخر لیست رسید => لیست جدید بساز و ریست کن
  useEffect(() => {
    if (currentWordIndex >= words.length) {
      setWords(generateWords(WORD_COUNT, suggestions));
      setTypedWords([]);
      setCurrentWordIndex(0);
      setInputValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWordIndex]);

  // تولید آرایه کلمه‌ها
  function generateWords(count: number, source: string[]) {
    const out: string[] = [];
    for (let i = 0; i < count; i++) {
      out.push(source[Math.floor(Math.random() * source.length)]);
    }
    return out;
  }

  // کلیدی‌ترین بخش: مدیریت رمز فضا (space) و شروع تست
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // اگر شروع نشده، با اولین تایپ واقعی (حروف/اعداد) شروع کن
    if (
      !isStarted &&
      e.key.length === 1 && // کاراکتر قابل چاپ
      !e.ctrlKey &&
      !e.metaKey &&
      e.key !== " "
    ) {
      setIsStarted(true);
    }

    // وقتی فضا زده شد => به کلمه بعدی برو
    if (e.key === " ") {
      e.preventDefault(); // جلوگیری از وارد شدن فاصله در input
      const trimmed = inputValue.trim();
      setTypedWords((prev) => {
        const copy = [...prev];
        copy[currentWordIndex] = trimmed;
        return copy;
      });
      setCurrentWordIndex((idx) => idx + 1);
      setInputValue("");
    }
  };

  // وقتی کاربر متن را تغییر می‌دهد (کنترل‌شده از prop)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // کلیک روی ناحیه باعث فوکوس input پنهان می‌شود
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // استایل‌های ساده درون‌خطی برای اینکه فوراً ببینی
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
      padding: "12px 16px",
      borderRadius: 8,
      background: "#f8fafc",
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace",
      fontSize: 20,
      lineHeight: "1.8",
      cursor: "text",
      userSelect: "none",
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
    },
    word: { display: "inline-block", paddingRight: 6 },
    charDefault: { opacity: 0.55 },
    charCorrect: { color: "#4285f4", fontWeight: "bold" },
    charWrong: { color: "#dc2626" },
    caret: {
      display: "inline-block",
      width: 2.5,
      height: 25,
      borderRadius: 20,
      background: "#111827",
      marginLeft: 2,
      verticalAlign: "middle",
      // simple blink using opacity animation not included inline — acceptable without blink
      animation: "blink 0.9s step-start infinite",
    },
    inputHidden: {
      // پنهان ولی قابل فوکوس
      position: "absolute",
      opacity: 0,
      left: -9999,
      width: 0,
      height: 0,
    },
    status: { marginTop: 8, color: "#065f46", fontWeight: 600 },
  };

  // رندر یک کلمه (با رنگ‌دهی برای هر حرف و caret برای کلمه جاری)
  const renderWord = (word: string, wi: number) => {
    const isCurrent = wi === currentWordIndex;
    const typed = typedWords[wi] ?? (isCurrent ? inputValue : "");

    // برای کلمات قبلی: نشان‌دادن هر کاراکتر با مقایسه typed vs word
    if (wi < currentWordIndex) {
      const typedForThis = typedWords[wi] ?? "";
      const maxLen = Math.max(word.length, typedForThis.length);
      return (
        <span key={wi} style={styles.word}>
          {Array.from({ length: maxLen }).map((_, i) => {
            const targetChar = word[i] ?? "";
            const typedChar = typedForThis[i] ?? "";
            // اگر تایپ نشده => خاکستری (فقط زمانی که targetChar وجود داشته باشد)
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
            // اگر برابر => درست، وگرنه نادرست
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

    // کلمه فعلی — نمایش تا کاراکتر تایپ‌شده و caret
    if (isCurrent) {
      const letters = word.split("");
      const typedLen = inputValue.length;

      return (
        <span key={wi} style={styles.word}>
          {letters.map((ch, i) => {
            // قبل از caret: مقایسه
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
            // caret بعد از این حرف؟
            const showCaret = i === typedLen;
            return (
              <span key={i} style={styles.charDefault}>
                {ch}
                {showCaret && <span style={styles.caret} />}
              </span>
            );
          })}

          {/* اگر کاربر بیش از طول کلمه تایپ کرده باشه، نشان‌دهنده‌ی حروف اضافه به‌صورت قرمز */}
          {typedLen > letters.length &&
            Array.from(inputValue.slice(letters.length)).map((ch, j) => (
              <span key={"extra-" + j} style={styles.charWrong}>
                {ch}
              </span>
            ))}

          {/* اگر دقیقاً در انتهای کلمه و هیچ حرفی باقی نمانده، caret نمایش داده شود */}
          {typedLen === letters.length && (
            <span style={{ marginLeft: 4 }}>
              <span style={styles.caret} />
            </span>
          )}
        </span>
      );
    }

    // کلمه‌های بعدی (هنوز تایپ نشده)
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

      {/* input کنترل‌شده اما پنهان — برای گرفتن ورودی کیبورد */}
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
        // tabIndex 0 تا با tab نیز قابل فوکوس باشد
        tabIndex={0}
      />

      <div style={styles.status}>
        Typing word {currentWordIndex + 1} / {words.length}
      </div>
    </div>
  );
};

export default Input;
