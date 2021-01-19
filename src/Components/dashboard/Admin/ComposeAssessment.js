import React, { useState, useEffect } from 'react'
import './ComposeAssessment.css'
import uploadIcon from '../../../Images/upload-icon.svg'
import AssessmentSuccessful from './AssessmentSuccessful';
import axios from 'axios'
import { motion } from 'framer-motion'

const ComposeAssessment = () => {
    const [questions, setQuestions] = useState({
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "",
        batch_id: "",
        set_time: "",
        file_upload: "",
        questionStore: []
    }
    )

    const [questionLength, setQuestionLength] = useState(0)
    const [questionNo, setQuestionNo] = useState(1)
    const [prevQuestion, setprevQuestion] = useState(-1)
    const [nextQuestion, setNextQuestion] = useState(1)
    const [answerMatch, setAnswerMatch] = useState("")
    const [areFieldsEmpty, setAreFieldsEmpty] = useState("")

    const handleFile = e => {
        let files = e.target.files[0]
        setQuestions({
            ...questions, file_upload: files
        })
    }

    const handleTime = e => {
        setQuestions({
            ...questions, [e.target.id]: e.target.value
        })
    }

    const handleBatchNo = (e) => {
        setQuestions({ ...questions, batch_id: e.target.value })
    }

    const handleInputChange = e => {
        setQuestions({
            ...questions, [e.target.id]: e.target.value
        })
    }

    const handlePreviousQuestion = () => {
        const { questionStore } = questions
        setQuestionLength(questionLength - 1)
        setQuestionNo(questionNo - 1)
        setprevQuestion(prevQuestion - 1)
        setNextQuestion(nextQuestion - 1)
        console.log(questions.file_upload)
        let one = questionStore[prevQuestion].question
        let two = questionStore[prevQuestion].option_a
        let three = questionStore[prevQuestion].option_b
        let four = questionStore[prevQuestion].option_c
        let five = questionStore[prevQuestion].option_d
        let six = questionStore[prevQuestion].correct_answer
        let seven = questionStore[prevQuestion].batch_id
        setQuestions({
            ...questions, question: one, option_a: two, option_b: three, option_c: four, option_d: five, correct_answer: six, batch_id: seven
        })
        console.log(questionLength)
    }

    const handleNextQuestion = () => {
        const { question, option_a, option_b, option_c, option_d, correct_answer, batch_id } = questions
        let questionData = { question, option_a, option_b, option_c, option_d, correct_answer, batch_id }
        const { questionStore } = questions
        console.log(questions.file_upload)
        if (option_a !== correct_answer && option_b !== correct_answer && option_c !== correct_answer && option_d !== correct_answer) {
            setAnswerMatch("One of the options must match the answer.")
            setAreFieldsEmpty("")
        }
        else if (!question || !option_a || !option_b || !option_c || !option_d || !correct_answer || !batch_id) {
            setAreFieldsEmpty("Please fill up all the necessary fields")
            setAnswerMatch("")
        } else if (questionStore.length === questionLength) {
            setQuestionNo(questionNo + 1)
            questionStore.push(questionData)
            console.log(questionStore)
            setprevQuestion(prevQuestion + 1)
            setAreFieldsEmpty("")
            console.log("Posted")
            setQuestionLength(questionLength + 1)
            setNextQuestion(nextQuestion + 1)
            setAnswerMatch("")
            setQuestions({
                ...questions, question: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_answer: ""
            })
        } else if (questionStore.length > questionLength && questionStore.length === nextQuestion) {
            setQuestions({
                ...questions, question: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_answer: ""
            })
            setNextQuestion(nextQuestion + 1)
            setprevQuestion(prevQuestion + 1)
            setQuestionNo(questionNo + 1)
            setAnswerMatch("")
            setQuestionLength(questionLength + 1)
            setAreFieldsEmpty("")
            console.log(questionStore)
            questionStore[questionLength].question = questionData.question
            questionStore[questionLength].option_a = questionData.option_a
            questionStore[questionLength].option_b = questionData.option_b
            questionStore[questionLength].option_c = questionData.option_c
            questionStore[questionLength].option_d = questionData.option_d
            questionStore[questionLength].correct_answer = questionData.correct_answer
            questionStore[questionLength].batch_id = questionData.batch_id
        }
        else if (questionStore.length > questionLength) {
            setprevQuestion(prevQuestion + 1)
            setQuestionNo(questionNo + 1)
            setAreFieldsEmpty("")
            console.log(questionStore)
            console.log("Updated")
            setAnswerMatch("")
            setNextQuestion(nextQuestion + 1)
            setQuestionLength(questionLength + 1)
            let one = questionStore[nextQuestion].question
            let two = questionStore[nextQuestion].option_a
            let three = questionStore[nextQuestion].option_b
            let four = questionStore[nextQuestion].option_c
            let five = questionStore[nextQuestion].option_d
            let six = questionStore[nextQuestion].correct_answer
            let seven = questionStore[nextQuestion].batch_id
            setQuestions({
                ...questions, question: one, option_a: two, option_b: three, option_c: four, option_d: five, correct_answer: six, batch_id: seven
            })
            questionStore[questionLength].question = questionData.question
            questionStore[questionLength].option_a = questionData.option_a
            questionStore[questionLength].option_b = questionData.option_b
            questionStore[questionLength].option_c = questionData.option_c
            questionStore[questionLength].option_d = questionData.option_d
            questionStore[questionLength].correct_answer = questionData.correct_answer
            questionStore[questionLength].batch_id = questionData.batch_id
        }
        if (nextQuestion === 30) {
            setQuestionNo(30)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const questionStore = questions.questionStore
        const no_of_question = questionNo
        const { set_time, file_upload, batch_id } = questions

        let attachment = { set_time, file_upload, no_of_question, batch_id }
        if (set_time) {
            const token = localStorage.getItem('token')
            var formData = new FormData()

            for (var key in attachment) {
                formData.append(key, attachment[key])
            }
            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            }
            const url = "/api/v1/auth/composeAssessmentAdmin"
            const url2 = "/api/v1/auth/uploadsetime"

            axios.post(url2, formData, config)
                .then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            axios.post(url, questionStore, config)
                .then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
        } else {
            alert("Set time")
        }
    }

    const style = {
        display: questions.file_upload ? "block" : "none",
        fontFamily: "Lato",
        fontWeight: 500,
        fontSize: "16px",
        color: "#5abefd",
        marginTop: 0,
        marginBottom: "7px",
        textAlign: "center"
    }

    return (
        <div className="compose_wrapper">
            <form onSubmit={handleSubmit} style={{ display: nextQuestion > 31 ? "none" : "block" }}>
                <p className="header_text">Compose Assessment</p>
                <div className="file_timer_wrapper">
                    <div>
                        <p>{questionNo}/30</p>
                        <div className="file_container">
                            <div>
                                <img className="upload-icon" src={uploadIcon} alt="Upload icon" />
                            </div>
                            <input type="file" name="file" id="file_upload" className="input_file" onChange={handleFile} />
                            <label htmlFor="file_upload">Choose File</label>
                        </div>
                        <p style={style}>Upload succesful!</p>
                    </div>
                    <div className="set_time">
                        <p>Set Time</p>
                        <select className="time-box" id="set_time" onChange={handleTime} >
                            <option value="5">00</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                        </select>
                        <p className="mins">mins</p>
                    </div>
                    <div className="set_time">
                        <p>Batch ID</p>
                        <select className="batch-box" id="batch_id" onChange={handleBatchNo} >
                            <option value="--">__</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <p className="question">Question</p>
                <textarea value={questions.question} type="text" id="question" style={{ height: "90px", width: "100%" }} onChange={handleInputChange}></textarea>

                <div className="input_row_wrapper">
                    <div className="input_row">
                        <div>
                            <p>Option A</p>
                            <input value={questions.option_a} type="text" id="option_a" onChange={handleInputChange} />
                        </div>
                        <div>
                            <p>Option B</p>
                            <input value={questions.option_b} type="text" id="option_b" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="input_row">
                        <div>
                            <p>Option C</p>
                            <input value={questions.option_c} type="text" id="option_c" onChange={handleInputChange} />
                        </div>
                        <div>
                            <p>Option D</p>
                            <input value={questions.option_d} type="text" id="option_d" onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="input_row_two">
                        <div>
                            <p>Answer</p>
                            <input value={questions.correct_answer} type="text" id="correct_answer" onChange={handleInputChange} />
                        </div>
                        <p style={{ display: answerMatch ? "block" : "none", color: "red", textAlign: "center", marginBottom: "7px" }}>{answerMatch}</p>
                        <p style={{ display: areFieldsEmpty ? "block" : "none", color: "red", textAlign: "center", marginBottom: "7px" }}>{areFieldsEmpty}</p>
                    </div>
                    <div className="prev_n_next_btn">
                        <button type="button" disabled={questionNo === 1} onClick={handlePreviousQuestion} >Previous</button>
                        <button type="button" disabled={nextQuestion === 31} onClick={handleNextQuestion}>Next</button>
                    </div>
                    <p className="click_to_submit" style={{ display: nextQuestion === 31 ? "block" : "none" }}>Click finish to submit</p>
                    <div className="finish_btn">
                        <motion.button whileHover={{ scale: 1.1 }} style={{ backgroundColor: nextQuestion === 31 ? "#31d283" : "#CECECE" }} disabled={nextQuestion < 31} type="submit">Finish</motion.button>
                    </div>
                </div>
            </form>
            <AssessmentSuccessful nextQuestion={nextQuestion} />
        </div>
    )
}

export default ComposeAssessment