import { words } from '@/words.js'
import { useState, useRef } from 'react'

function useWord() {
  const [show, setShow] = useState(false)
  const [word, setWord] = useState(getRandomWord(words))
  const [userWord, setUserWord] = useState('')
  const [color, setColor] = useState('')
  const [inputColor, setInputColor] = useState('')
  const [pokemon, setPokemon] = useState(
    'https://lorempokemon.fakerapi.it/pokemon/200'
  )
  const inputReference = useRef(null)

  function getRandomWord(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
  }

  function speakWord() {
    const synth = window.speechSynthesis

    const utterance = new SpeechSynthesisUtterance(word)
    utterance.rate = 0.6
    utterance.pitch = 1.3

    synth.getVoices().forEach((voice) => {
      if (voice.name === 'Samantha' && voice.lang === 'en-US') {
        utterance.voice = voice
      }
    })

    synth.speak(utterance)
    inputReference.current.focus()
  }

  const handleChange = (e) => {
    if (
      word.toUpperCase().startsWith(e.target.value.toUpperCase()) &&
      e.target.value.length > 0
    ) {
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
      setPokemon(
        `https://lorempokemon.fakerapi.it/pokemon/200/276?t=${Date.now()}`
      )
      setShow(false)
      setUserWord('')
      setWord(getRandomWord(words))
    }, 1000)
  }

  return {
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
  }
}

export default useWord
