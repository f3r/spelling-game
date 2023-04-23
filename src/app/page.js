"use client"
import { words } from '@/words.js'
import { useEffect, useState } from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'

function getRandomWord(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function speakWord(word) {
  const synth = window.speechSynthesis;

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = 0.6;
  utterance.pitch = 1.3;

  synth.getVoices().forEach((voice) => {
    if (voice.name === 'Samantha' && voice.lang === 'en-US') {
      utterance.voice = voice;
    }
  });

  synth.speak(utterance);
}

export default function Home() {
  const [show, setShow] = useState(false)
  const [word, setWord] = useState(getRandomWord(words))
  const [userWord, setUserWord] = useState('')
  const [color, setColor] = useState('')
  const [inputColor, setInputColor] = useState('')

  const handleChange = (e) => {
    if (word.toUpperCase().startsWith(e.target.value.toUpperCase())) {
      setInputColor('bg-green-600')
    } else {
      setInputColor('bg-red-600')
    }

    setUserWord(e.target.value)
  }


  const checkWord = function () {
    if (word.toUpperCase() === userWord.toUpperCase()) {
      setColor('bg-green-600')
    } else {
      setColor('bg-red-600')
    }
    setShow(true)

    setTimeout(() => {
      setShow(false)
      setUserWord('')
      setWord(getRandomWord(words))
    }, 1000)
  }

  useEffect(() => {
    speakWord(word)
  }, [word])

  return (
    <main className='flex flex-col gap-10 justify-center items-center w-screen h-screen bg-black'>
      <h1 className='text-white text-6xl'>Spelling Game</h1>

      {!show &&
        <div className=' bg-yellow-600 w-96 h-96 flex justify-center items-center text-white transition-all duration-1000'>
          <PlayCircleIcon className='w-28' onClick={() => speakWord(word)} />
        </div>
      }
      {show &&
        <div className={` w-96 h-96 flex justify-center items-center text-white text-3xl ${color}`}>
          {word}
        </div>
      }

      <input
        type="text"
        placeholder="Type here"
        value={userWord}
        onChange={handleChange}
        onKeyDown={(e) => { if (e.key === 'Enter') { checkWord() } }}
        className={`text-3xl p-5 w-96 text-center ${inputColor}`}
      />

      <button
        onClick={checkWord}
        className={classNames({
          'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded': true,
          'opacity-50 cursor-not-allowed': userWord.length === 0
        })} >
        Check Word
      </button>
    </main>
  )
}
