import './App.css';
import React from "react"
import Cover from "./components/cover"
import Quiz from "./components/quiz"
import dataSet from "./data"
import { nanoid } from "nanoid"

const BTN_START_QUIZ = "start-quiz"
const BTN_CHECK_ANSWERS = "check-answers"
const BTN_PLAY_AGAIN = "play-again"

function App() {
  const [btnState, setBtnState] = React.useState(BTN_START_QUIZ);
  const [data, setData] = React.useState([]);
  const [score, setScore] = React.useState(0)
  const [formError, setFormError] = React.useState([])
  const quiz = data.map(item => {
    return (
      <Quiz
        key={item.id}
        id={item.id}
        handleChange={handleChange}
        question={item.question}
        answer={item.answer}
        choices={item.choices}
        correctAnswer={item.correct_answer}
        showAnswer={BTN_PLAY_AGAIN === btnState}
      />
    )
  });
  const Form = () => {
    const btnLabel = capitalize(btnState)

    return (
      <form onSubmit={handleSubmit}>
        {quiz}
        {
          BTN_PLAY_AGAIN === btnState
          && <p>You scored {score}/{data.length} correct answers</p>
        }
        {
          (formError[0] < 0) &&
          <p>Please answer all of the questions before submitting</p>
        }
        <button>{btnLabel}</button>
      </form >
    )
  }

  React.useEffect(() => {
    console.log("Hit API")
    // fetch('https://opentdb.com/api.php?amount=5&category=17&difficulty=easy')
    //   .then(res => res.json())
    //   .then(data => setData(data.results))
    setData(dataSet.results.map(quiz => {
      // Collect answer choices and randomize their order.
      const choices = [...quiz.incorrect_answers, quiz.correct_answer]
        .map(answer => ({ answer, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ answer }) => answer)

      return { ...quiz, choices: choices, id: nanoid() }
    }))
  }, [])

  function toggleBtn() {
    if (BTN_START_QUIZ === btnState) {
      setBtnState(BTN_CHECK_ANSWERS)
    } else if (BTN_CHECK_ANSWERS === btnState) {
      setBtnState(BTN_PLAY_AGAIN)
    } else {
      setBtnState(BTN_START_QUIZ)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    const id = name.replace('answer-', '')

    setData(prevData => prevData.map(quiz => {
      return quiz.id === id
        ? { ...quiz, answer: value }
        : quiz
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    let noAnswers = 0
    const wrongAnswers = data.filter(quiz => {
      noAnswers += quiz.answer ? 0 : 1

      return quiz.answer && (quiz.answer !== quiz.correct_answer)
    })

    if (noAnswers) {
      setFormError([-1])
    } else {
      setFormError(wrongAnswers)
      setScore(data.length - wrongAnswers.length)
      toggleBtn()
    }
  }

  function capitalize(str) {
    return str.split('-')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="App">
      {
        BTN_START_QUIZ === btnState
          ? <Cover
            toggleStart={toggleBtn}
            btnState={btnState}
            capitalize={capitalize}
          />
          : <Form />
      }
    </div>
  );
}

export default App;
