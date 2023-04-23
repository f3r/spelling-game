'use client'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import useWord from '@/customHooks/useWord'

export default function Home() {
  const {
    show,
    word,
    pokemon,
    userWord,
    inputReference,
    color,
    inputColor,
    handleChange,
    checkWord,
    speakWord
  } = useWord()

  return (
    <main className="flex flex-col gap-10 justify-center items-center w-screen h-screen bg-black">
      <h1 className="text-white text-6xl">Spelling Game</h1>

      {!show && (
        <div
          style={{
            backgroundImage: `url(${pokemon})`
          }}
          className=" bg-yellow-600 w-96 h-96 flex justify-center items-center text-white transition-all duration-1000 bg-cover"
        >
          <PlayCircleIcon className="w-28" onClick={() => speakWord()} />
        </div>
      )}
      {show && (
        <div
          className={` w-96 h-96 flex justify-center items-center text-white text-3xl ${color}`}
        >
          {word}
        </div>
      )}

      <input
        type="text"
        ref={inputReference}
        placeholder="Type here"
        value={userWord}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            checkWord()
          }
        }}
        className={`text-3xl p-5 w-96 text-center ${inputColor}`}
      />

      <button
        onClick={checkWord}
        className={classNames({
          'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded': true,
          'opacity-50 cursor-not-allowed': userWord.length === 0
        })}
      >
        Check Word
      </button>
    </main>
  )
}
