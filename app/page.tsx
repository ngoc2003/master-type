"use client";

import Content from "./components/content";
import TimerBox from "./components/timer-box";
import Restart from "./components/restart";
import { useSetting } from "./hooks/useSetting";
import useCountDown from "./hooks/useCountDown";
import { useUserType } from "./hooks/useUserType";
import { useCallback, useState } from "react";
import ResultSection from "./components/modal/result";
import Chart from "./components/modal/chart";
import { useChart } from "./hooks/useChart";

export default function Home() {
  const chart = useChart();
  const [isOpenResultSection, setIsOpenResultSection] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const { setting, onChangeTime, onReset: onResetSetting } = useSetting();
  const { word, randomText, onResetWord } = useUserType({ isFocus });
  const { timeValue, resetCountDown } = useCountDown({
    onFinish: () => setIsOpenResultSection(true),
    onClear: () => handleReset(),
    isCancel: !isFocus,
  });

  const handleReset = useCallback(() => {
    onResetSetting();
    onResetWord();
    setIsOpenResultSection(false);
    chart.onClose();
    resetCountDown();
  }, [setting.time]);

  return (
    <div className="w-full">
      <Chart
        isOpen={chart.isOpen}
        onClose={chart.onClose}
        settingTime={10}
        onReset={handleReset}
      />
      <ResultSection
        onOpenChartSection={chart.onOpen}
        isShow={isOpenResultSection}
        typedText={word}
        onReset={handleReset}
        contentNeedTexted={randomText.slice(0, word.split("").length).join("")}
      />
      <TimerBox
        onChangeTime={onChangeTime}
        time={setting.time}
        timeValue={timeValue}
      />
      <Content
        isFocus={isFocus}
        setIsFocus={setIsFocus}
        randomText={randomText}
        word={word}
      />
      <Restart onReset={handleReset} />
    </div>
  );
}
