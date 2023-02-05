import {
  ATTRIBUTE_IS_CLICKED,
  ATTRIBUTE_TRANSITION,
  MAX_PERCENT_SOUND,
  MAX_COUNT_REMAIN,
  MAX_COUNT_SCREEN_WAITING,
} from '@/constant/variable';
import React, { LegacyRef } from 'react';
import { useNavigate } from 'react-router-dom';

export type StateMiniGame = {
  bubbleParentRef: LegacyRef<HTMLDivElement> | null;
  listBubble: { id: string; color: string; duration: number }[];
  countRemain: number;
  isPausedGame: boolean;
  countWaitingScreen: number;
  refBgMusic: LegacyRef<HTMLAudioElement> | null;
  showFirstLoadGame: boolean;
  soundBubbleRef: LegacyRef<HTMLAudioElement> | null;
  point: number;
  prevPoint: number | null;
  percentSoundBar: string;
  isWorkingVolume: boolean;
  handleDetectElement: (element: HTMLDivElement | null, idBubble: string) => void;
  handleClickBubble: (id: string) => void;
  getRandomColorOfBubble: () => string;
  handleContinuePlayBubbleAfterStop: () => void;
  handleRestartGame: () => void;
  handleClickButtonPauseGame: () => void;
  handleQuitGame: () => void;
  handleTurnOnMusic: () => void;
  handleCloseScreenFirstGame: () => void;
  handleChangePercentSoundBar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnOffButtonVolume: () => void;
};
const useMiniGame = (): { state: StateMiniGame } => {
  const navigate = useNavigate();
  const bubbleParentRef = React.useRef<HTMLDivElement>(null);
  const intervalCreateElement = React.useRef<number>();
  const [listBubble, setListBubble] = React.useState<
    { id: string; color: string; duration: number }[]
  >([]);

  // define the remaining lives in the game
  const [countRemain, setCountRemain] = React.useState<number>(MAX_COUNT_REMAIN);

  // define current status of button
  const [isPausedGame, setPausedGame] = React.useState<boolean>(false);

  // define count waiting screen
  const [countWaitingScreen, setCountWaitingScreen] =
    React.useState<number>(MAX_COUNT_SCREEN_WAITING);

  // define show playing first load game
  const [showFirstLoadGame, setShowFirstLoadGame] = React.useState<boolean>(true);

  // create some ref to store some status bubble
  const refListBubbleCreated = React.useRef<string[]>([]);
  const refListBubbleDeleted = React.useRef<string[]>([]);
  const refListTimeOutBubble = React.useRef<number[]>([]);

  // create refs to store timeout waiting screen
  const refTimeOutWaitingScreen = React.useRef<number>(0);

  // define ref bg music
  const refBgMusic = React.useRef<HTMLAudioElement>(null);

  // define ref click sound
  const soundBubbleRef = React.useRef<HTMLAudioElement>(null);

  // define point of game
  const [point, setPoint] = React.useState<number>(0);

  // define currentPoint
  const refPoinst = React.useRef<number | null>(null);

  // define percent of soundbar
  const [percentSoundBar, setPercentSoundBar] = React.useState<string>(MAX_PERCENT_SOUND);

  // define disable button volume
  const [isWorkingVolume, setIsWorkingVolume] = React.useState<boolean>(true);

  const getRandomInterger = (min: number, max: number): number => {
    const minRange = Math.ceil(min);
    const maxRange = Math.floor(max);
    return Math.floor(Math.random() * (maxRange - minRange) + minRange);
  };

  const getRandomColorOfBubble = (): string => {
    const listColorBubbles: string[] = ['#799ED2', '#8882C9', '#66CC86', '#E93335', '#CE8355'];
    const randomIndex = getRandomInterger(0, listColorBubbles.length);
    return listColorBubbles[randomIndex];
  };

  const converPXToVHViewPort = (px: number): number => {
    return (100 * px) / window.innerHeight;
  };

  const handleTurnOnMusic = (): void => {
    if (refBgMusic && refBgMusic.current) {
      refBgMusic.current.play();
    }
  };

  const handlePauseMusic = () => {
    if (refBgMusic && refBgMusic.current) {
      refBgMusic.current.pause();
    }
  };

  const handleCreateElementBubble = (): void => {
    const uniqueId = `id${new Date().getTime()} `;
    const randomDuration = getRandomInterger(1000, 5000);
    setListBubble((prev) => [
      ...prev,
      { id: uniqueId, color: getRandomColorOfBubble(), duration: randomDuration },
    ]);
  };

  const handleCountWaitingScreen = (): void => {
    refTimeOutWaitingScreen.current = setInterval(() => {
      setCountWaitingScreen((prev) => {
        return --prev;
      });
    }, 1000);
  };

  const handleCallIntervalLoadBubble = () => {
    handleCreateElementBubble();
    intervalCreateElement.current = setInterval(() => {
      handleCreateElementBubble();
    }, 1000);
  };

  const handleRemoveElementWhenPlayerNotClick = (idBubble: string): void => {
    const bubbleElementFound = refListBubbleDeleted.current.find((el) => el === idBubble);
    if (!bubbleElementFound) {
      setListBubble((prev) => prev.filter((el) => el.id !== idBubble));
      setCountRemain((prev) => --prev);
    } else {
      return;
    }
  };

  const handleDetectElement = (element: HTMLDivElement | null, idBubble: string): void => {
    const bubbleCreated = refListBubbleCreated.current.find((el) => el === idBubble);
    if (element && !bubbleCreated) {
      refListBubbleCreated.current.push(idBubble);
      const randomLeft = getRandomInterger(1, 90);
      const elementBubble = listBubble.find((el) => el.id === idBubble);
      const style = `left: ${randomLeft}%; animation: moveTop ${elementBubble?.duration}ms; animation-timing-function:linear`;
      setTimeout(() => {
        if (!element?.hasAttribute(ATTRIBUTE_TRANSITION)) {
          element?.setAttribute('style', style);
          element?.setAttribute(ATTRIBUTE_TRANSITION, 'have');
        }
      }, 0);

      refListTimeOutBubble.current.push(
        setTimeout(() => {
          handleRemoveElementWhenPlayerNotClick(idBubble);
        }, elementBubble?.duration)
      );
    }
  };

  const handleClickBubble = (idBubble: string): void => {
    refListBubbleDeleted.current.push(idBubble);
    let elementBubble = document.getElementById(idBubble);

    if (elementBubble) {
      // stop moving element
      elementBubble.style.animationPlayState = 'paused';
      if (!elementBubble.hasAttribute(ATTRIBUTE_IS_CLICKED)) {
        soundBubbleRef.current?.play();
        if (soundBubbleRef && soundBubbleRef.current) {
          soundBubbleRef.current.currentTime = 0;
        }
        // set point
        setPoint((prev: number) => ++prev);
      }
      elementBubble.setAttribute(ATTRIBUTE_IS_CLICKED, 'isClicked');
    }

    // add animation hide bubble
    setTimeout(() => {
      if (elementBubble) {
        elementBubble.style.opacity = '0';
        elementBubble.style.transitionDuration = '500ms';
      }
    }, 0);
    setTimeout(() => {
      setListBubble((prev) => prev.filter((el) => el.id !== idBubble));
    }, 500);
  };

  const handleStopBubble = () => {
    // clear all timeout and interval
    clearInterval(intervalCreateElement.current);
    for (var i = 0; i < refListTimeOutBubble.current.length; i++) {
      clearTimeout(refListTimeOutBubble.current[i]);
    }
    // paused animation
    if (bubbleParentRef.current?.children && bubbleParentRef.current.children.length) {
      const arrHTMLCollections = Array.from(
        bubbleParentRef.current?.children as HTMLCollectionOf<HTMLElement>
      );
      arrHTMLCollections.forEach((element: HTMLElement) => {
        const valueOfId = element.getAttribute('id');
        valueOfId && refListBubbleDeleted.current.push(valueOfId);
        element.style.animationPlayState = 'paused';
      });
    }
  };

  const handleContinuePlayBubbleAfterStop = async (): Promise<void> => {
    setPausedGame(false);
    handleTurnOnMusic();
    handleCallIntervalLoadBubble();
    if (bubbleParentRef.current?.children && bubbleParentRef.current.children.length) {
      const arrHTMLCollections = Array.from(
        bubbleParentRef.current?.children as HTMLCollectionOf<HTMLElement>
      );
      const shallowListBubble = JSON.parse(JSON.stringify(listBubble));
      arrHTMLCollections.forEach((element: HTMLElement) => {
        if (element.className.includes('bubble')) {
          const currentOffSetTopElement = converPXToVHViewPort(element.getBoundingClientRect().top);
          const valueOfId = element.getAttribute('id');
          const bubbleFoundIndex = listBubble.findIndex((el) => el.id === valueOfId);
          if (bubbleFoundIndex > -1) {
            // remove element in list bubble be deleted
            refListBubbleDeleted.current = refListBubbleDeleted.current.filter(
              (el) => el !== valueOfId
            );

            // find time to finalize the rest of the way
            const timeRestToGoTop =
              (currentOffSetTopElement * shallowListBubble[bubbleFoundIndex].duration) / 100;

            refListTimeOutBubble.current.push(
              setTimeout(() => {
                handleRemoveElementWhenPlayerNotClick(shallowListBubble[bubbleFoundIndex].id);
              }, timeRestToGoTop)
            );
            element.style.animationPlayState = 'running';
          }
        }
      });
    }
  };

  const handleRestartGame = (): void => {
    // reset all data define to default value
    setPausedGame(false);
    setCountRemain(MAX_COUNT_REMAIN);
    handleTurnOnMusic();
    setPoint(0);
    refListBubbleCreated.current = [];
    refListBubbleDeleted.current = [];
    refListTimeOutBubble.current = [];

    // set default list bubble
    setListBubble([]);

    // set waiting screen
    setCountWaitingScreen(MAX_COUNT_SCREEN_WAITING);
    handleCountWaitingScreen();
  };

  const handleClickButtonPauseGame = (): void => {
    setPausedGame(true);
    handleStopBubble();
    // handlePauseMusic();
  };

  const handleChangePercentSoundBar = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPercentSoundBar(e.target.value);
    const valueSound = Number(e.target.value);

    // set on off for button volume
    if (valueSound > 0) {
      setIsWorkingVolume(true);
    } else {
      setIsWorkingVolume(false);
    }
  };

  const handleOnOffButtonVolume = (): void => {
    setIsWorkingVolume((prev) => {
      if (!prev) {
        setPercentSoundBar('10');
      } else {
        setPercentSoundBar('0');
      }
      return !prev;
    });
  };

  const handleQuitGame = (): void => {
    navigate('/');
  };

  const handleCloseScreenFirstGame = (): void => {
    setShowFirstLoadGame(false);
    handleCountWaitingScreen();
  };

  // After count waiting screen is done, start bubble
  React.useEffect(() => {
    if (countWaitingScreen === 0) {
      clearInterval(refTimeOutWaitingScreen.current);
      handleCallIntervalLoadBubble();
      handleTurnOnMusic();
    }
  }, [countWaitingScreen]);

  // After count remain lives is no longer, stop bubble
  React.useLayoutEffect(() => {
    if (countRemain === 0) {
      handleStopBubble();
    }
  }, [countRemain]);

  React.useEffect(() => {
    refPoinst.current = point;
  }, [point]);

  // update volume of music when change percent
  React.useEffect(() => {
    const valueSound = Number(percentSoundBar);
    const maxValueSound = Number(MAX_PERCENT_SOUND);
    const volume = valueSound / maxValueSound;
    if (refBgMusic.current) {
      refBgMusic.current.volume = volume;
    }
    if (soundBubbleRef.current) {
      soundBubbleRef.current.volume = volume;
    }
  }, [percentSoundBar]);

  return {
    state: {
      bubbleParentRef,
      listBubble,
      countRemain,
      isPausedGame,
      countWaitingScreen,
      refBgMusic,
      showFirstLoadGame,
      soundBubbleRef,
      point,
      prevPoint: refPoinst.current,
      percentSoundBar,
      isWorkingVolume,
      handleDetectElement,
      handleClickBubble,
      getRandomColorOfBubble,
      handleContinuePlayBubbleAfterStop,
      handleRestartGame,
      handleClickButtonPauseGame,
      handleQuitGame,
      handleTurnOnMusic,
      handleCloseScreenFirstGame,
      handleChangePercentSoundBar,
      handleOnOffButtonVolume,
    },
  };
};

export default useMiniGame;
