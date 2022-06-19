import { useCallback, useState } from 'react'
import Link from 'next/link'

export default function Home() {

  const [showAnswer, setShowAnswer] = useState(false)

  const [randomQuestion, setRandomQuestion] = useState(
    {
      "question": "",
      "answer": "",
      "category": "",
      "level": "",
      "source": ""
    }
  )

  const openQuestionSource = useCallback(() => {
    window.open(randomQuestion['source'], "_blank")
  },[])

  const toggleAnswer = useCallback(() => {
    setShowAnswer(!showAnswer)
  },[showAnswer])

  const getNewQuestion = useCallback(async () => {
    fetch(`${process.env.NEXT_PUBLIC_IQUESTIONS_API_URL}/questions`)
      .then((rsp) => rsp.json())
      .then((data) => {
        setShowAnswer(false)
        setRandomQuestion(data[Math.floor(Math.random() * (data.length-1))])
      })
  },[])

  return (
  <div className="flex justify-center">
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-lg">
    <p>
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{randomQuestion['level']} {randomQuestion['category']}</h5>
      </p>
        <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={getNewQuestion}>New question</button>
        <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={toggleAnswer}>{`${showAnswer ? "Hide" : "Show"} answer`}</button>
        <Link href={randomQuestion['source']} rel="noreferrer noopener" passHref><a type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" target="_blank"> Source </a></Link>
      <p>
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{randomQuestion['question']}</h5>
      </p>
      <p className="text-gray-700 text-base mb-4">
        {showAnswer && <p className="text-grey-700 text-base">{randomQuestion['answer']}</p>}
      </p>
    </div>
  </div>
  )
}
