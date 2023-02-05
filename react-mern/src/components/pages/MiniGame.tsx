import React from 'react';
import useMiniGame, { StateMiniGame } from '@/hooks/pages/useMiniGame';
import { MAX_COUNT_REMAIN, MAX_PERCENT_SOUND } from '@/constant/variable';
import clsx from 'clsx';
import song from '@/assets/songs/song1.mp3';
import song2 from '@/assets/songs/my-love.mp3';
import iconVolumeOn from '@/assets/images/volume-on.png';
import iconVolumeOff from '@/assets/images/volume-off.png';
import ClickBubbleSound from '@/assets/songs/click-bubble.wav';

type Props = StateMiniGame;

export const MiniGameContainter: React.FC<{}> = (): React.ReactElement => {
  const { state } = useMiniGame();
  return <MiniGame {...state}></MiniGame>;
};

export const MiniGame: React.FC<Props> = ({
  bubbleParentRef,
  listBubble,
  countRemain,
  isPausedGame,
  countWaitingScreen,
  refBgMusic,
  showFirstLoadGame,
  soundBubbleRef,
  point,
  prevPoint,
  percentSoundBar,
  isWorkingVolume,
  handleDetectElement,
  handleClickBubble,
  handleContinuePlayBubbleAfterStop,
  handleRestartGame,
  handleClickButtonPauseGame,
  handleQuitGame,
  handleCloseScreenFirstGame,
  handleChangePercentSoundBar,
  handleOnOffButtonVolume,
}: Props): React.ReactElement => {
  return (
    <React.Fragment>
      {/* Screen First Game */}
      {showFirstLoadGame ? (
        <div className='h-screen w-full fixed z-[100] bg-[#F9F5AB] justify-center items-center flex flex-col'>
          <p
            data-text='Welcome'
            className='text-[40px] sm:text-[60px] md:text-[100px] mb-2 font-bold text-[#F9F5AB] stroke-[#FF84E9] select-none text-stroke-pause'
          >
            Welcome
          </p>
          <button
            onClick={handleCloseScreenFirstGame}
            className='flex justify-center items-center w-[70%] h-[100px] sm:w-[50%] md:w-[35%] mt-5 md:h-[150px] font-bold text-white text-[40px] md:text-[50px] lg:text-[70px] bg-[#FFF] clip-button-game after:content-["Play"] after:absolute after:text-white transition-all duration-300 hover:scale-[1.1]'
          >
            {/* Restart */}
          </button>
          <button
            onClick={handleQuitGame}
            className='flex justify-center items-center w-[70%] h-[100px] sm:w-[50%] md:w-[35%] mt-5 md:h-[150px] font-bold text-white text-[40px] md:text-[50px] lg:text-[70px] bg-[#FFF] clip-button-game after:content-["Quit"] after:absolute after:text-white transition-all duration-300 hover:scale-[1.1]'
          >
            {/* Quit */}
          </button>
        </div>
      ) : null}

      {/* Screen Counting Before Start Game  */}
      {!showFirstLoadGame && countWaitingScreen ? (
        <div className='h-screen w-full fixed z-50 bg-gray-300/50 flex justify-center items-center'>
          <p className='text-pink-500 text-[100px] md:text-[160px]'>{countWaitingScreen}</p>
        </div>
      ) : null}

      {/* Screen Pause Game */}
      {isPausedGame ? (
        <div className='h-screen w-full fixed z-[100] bg-inherit justify-center items-center flex flex-col'>
          <p
            data-text='Paused'
            className='text-[60px] md:text-[100px] mb-2 font-bold text-[#F9F5AB] stroke-[#FF84E9] select-none text-stroke-pause'
          >
            Paused
          </p>
          <button
            onClick={handleContinuePlayBubbleAfterStop}
            className='flex justify-center items-center w-[70%] h-[100px] sm:w-[50%] md:w-[35%] md:h-[150px] font-bold text-white text-[40px] md:text-[50px] lg:text-[70px] bg-[#FFF] clip-button-game after:content-["Resume"] after:absolute after:text-white transition-all duration-300 hover:scale-[1.1]'
          >
            {/* Resume */}
          </button>
          <button
            onClick={handleRestartGame}
            className='flex justify-center items-center w-[70%] h-[100px] sm:w-[50%] md:w-[35%] mt-5 md:h-[150px] font-bold text-white text-[40px] md:text-[50px] lg:text-[70px] bg-[#FFF] clip-button-game after:content-["Restart"] after:absolute after:text-white transition-all duration-300 hover:scale-[1.1]'
          >
            {/* Restart */}
          </button>
          <button
            onClick={handleQuitGame}
            className='flex justify-center items-center w-[70%] h-[100px] sm:w-[50%] md:w-[35%] mt-5 md:h-[150px] font-bold text-white text-[40px] md:text-[50px] lg:text-[70px] bg-[#FFF] clip-button-game after:content-["Quit"] after:absolute after:text-white transition-all duration-300 hover:scale-[1.1]'
          >
            {/* Quit */}
          </button>
        </div>
      ) : null}

      {/* Screen Game Over */}
      {!countRemain ? (
        <div className='h-screen w-full fixed z-[100] bg-inherit justify-center items-center flex flex-col'>
          <p
            data-text='Game Over'
            className='text-[40px] sm:text-[60px] md:text-[100px] mb-2 font-bold text-[#F9F5AB] stroke-[#FF84E9] select-none text-stroke-pause'
          >
            Game Over
          </p>
          <button
            onClick={handleRestartGame}
            className='flex justify-center items-center w-[70%] h-[100px] sm:w-[50%] md:w-[35%] mt-5 md:h-[150px] font-bold text-white text-[40px] md:text-[50px] lg:text-[70px] bg-[#FFF] clip-button-game after:content-["Restart"] after:absolute after:text-white transition-all duration-300 hover:scale-[1.1]'
          >
            {/* Restart */}
          </button>
          <button
            onClick={handleQuitGame}
            className='flex justify-center items-center w-[70%] h-[100px] sm:w-[50%] md:w-[35%] mt-5 md:h-[150px] font-bold text-white text-[40px] md:text-[50px] lg:text-[70px] bg-[#FFF] clip-button-game after:content-["Quit"] after:absolute after:text-white transition-all duration-300 hover:scale-[1.1]'
          >
            {/* Quit */}
          </button>
        </div>
      ) : null}

      {/* Screen Game */}
      <div
        id='screen-game'
        className='h-screen w-full bg-gradient-to-r from-purple-100 to-pink-50 relative overflow-hidden'
        ref={bubbleParentRef}
      >
        {/* Audio music */}
        <audio loop controlsList='nodownload noplaybackrate' ref={refBgMusic}>
          <source src={song} type='audio/ogg' />
        </audio>

        {/* Audio for clicking bubble */}
        <audio ref={soundBubbleRef}>
          <source src={ClickBubbleSound} type='audio/ogg' />
        </audio>

        <div className='flex justify-between w-auto cursor-pointer'>
          <div
            onClick={handleClickButtonPauseGame}
            className='flex items-center justify-center h-[50px] w-[50px] md:h-[80px] md:w-[80px] ml-2 mt-2 rounded-full border-4 border-solid border-white bg-[#EF534F] transition-all duration-300 hover:scale-[1.1]'
          >
            <div className='w-[5px] h-[60%] md:w-[10px] bg-white mr-1 rounded-lg'></div>
            <div className='w-[5px] h-[60%] md:w-[10px] bg-white ml-1 rounded-lg'></div>
          </div>
          <div className='flex mt-3 mr-3 flex-col'>
            <div className='flex'>
              {Array(MAX_COUNT_REMAIN)
                .fill(null)
                .map((el, index) => {
                  return (
                    <div
                      key={index}
                      className={clsx('transition-all duration-500 text-5xl ', {
                        ['text-gray-600 animate-scaleUp']: index + 1 > countRemain,
                        ['text-red-500']: index + 1 <= countRemain,
                      })}
                    >
                      ❤
                    </div>
                  );
                })}
            </div>

            {/* Point */}
            <p
              className={clsx(
                'text-[40px] md:text-[60px] text-center text-white transition-all duration-300',
                { ['animate-upperNumber']: point > 0 && prevPoint !== point }
              )}
            >
              {point}
            </p>
          </div>
        </div>

        {listBubble.map((el) => {
          return (
            <div
              id={el.id}
              key={el.id}
              className={`bubble bg-[${el.color}] text-[${el.color}] after:bg-line-bubble`}
              ref={(event): void | null => handleDetectElement(event, el.id)}
              onClick={(): void => handleClickBubble(el.id)}
            ></div>
          );
        })}

        {/* Sound bar */}
        {(isPausedGame || !countRemain) && (
          <div className='flex flex-col w-[6rem] group h-auto items-center left-0 bottom-2 absolute z-[1000]'>
            <input
              value={percentSoundBar}
              onChange={handleChangePercentSoundBar}
              type='range'
              id='volume'
              name='volume'
              min='0'
              max={MAX_PERCENT_SOUND}
              className='rotate-[270deg] hidden hover:block group-hover:block'
            />
            <img
              className='h-6 w-6 md:h-10 md:w-10 mt-16 cursor-pointer'
              src={isWorkingVolume ? iconVolumeOn : iconVolumeOff}
              alt='volume-on'
              onClick={handleOnOffButtonVolume}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
