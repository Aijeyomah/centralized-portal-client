import React, { useEffect, useState } from 'react'
import axios from 'axios';
import uploadIcon from '../../../Images/upload-icon.svg';
import './AssessmentHistory.css';

const AssessmentHistory = (props) => {
    const [assessment, setAssessment] = useState([])
    const [batch, setBatch] = useState(0)
    const [index, setIndex] = useState(0)
    const [state, setState] = useState({
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "",
        batch_id: "",
        set_time: "",
        cv_file: "",
        isInEditMode: false
    })
    const [batchinfo, setBatchinfo] = useState([])
    const [batchIndex, setBatchIndex] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem('token')
        let config = {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        axios.get("/api/v1/getAssessmentHistory", config)
            .then(res => {
                const batchEntry = res.data.data;
                setBatchinfo(batchEntry);
                console.log(batchEntry)
            }).catch(err => {
                console.log(err)
            })

        
        
    }, [])

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     let config = {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "token": token
    //         }
    //     }
    //     axios.get("/api/v1/getAssessmentHistory", config)
    //     .then(res => {
    //         console.log(res)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }, [])

    const handleNext = (e) => {
        e.preventDefault()
        if (index <= assessment.length - 1) {
            setIndex(index + 1);
            setState({
                question: assessment[index + 1].question,
                option_a: assessment[index + 1].option_a,
                option_b: assessment[index + 1].option_b,
                option_c: assessment[index + 1].option_c,
                option_d: assessment[index + 1].option_d,
                correct_answer: assessment[index + 1].correct_answer,
                batch_id: assessment[index + 1].batch_id,
            })
        }

    }

    const handlePrev = (e) => {
        e.preventDefault()
        if (index <= assessment.length - 1) {
            setIndex(index - 1);
            setState({
                question: assessment[index - 1].question,
                option_a: assessment[index - 1].option_a,
                option_b: assessment[index - 1].option_b,
                option_c: assessment[index - 1].option_c,
                option_d: assessment[index - 1].option_d,
                correct_answer: assessment[index - 1].correct_answer,
                batch_id: assessment[index - 1].batch_id,
            })
        }

    }

    const handleFile = e => {
        let files = e.target.files[0]
        setState({
            ...state, cv_file: files
        })
    }

    const handleTime = e => {
        setState({
            ...state, [e.target.id]: e.target.value
        })
    }
    const style = {
        display: state.cv_file ? "block" : "none",
        fontFamily: "Lato",
        fontWeight: 500,
        fontSize: "16px",
        color: "#5abefd",
        marginTop: 0,
        marginBottom: "7px",
        textAlign: "center"
    }

    const changeEditMode = () => {
        setState({ isInEditMode: !state.isInEditMode })
    }

    const saveInput = () => {
        setState({ 
            isInEditMode: false,
         })
        console.log(state)
        setState({
            question: assessment[index].question,
            option_a: assessment[index].option_a,
            option_b: assessment[index].option_b,
            option_c: assessment[index].option_c,
            option_d: assessment[index].option_d,
            correct_answer: assessment[index].correct_answer,
            batch_id: assessment[index].batch_id,
        })
        //api call to update question by Only God knows what
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const ChangeBatch = (batch_id) => {
        setBatch(batch_id)
        const token = localStorage.getItem('token')
        let config = {
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        }
        axios.get(`/api/v1/admingetassessment/${batch_id}`, config)
            .then(res => {
                const assess = res.data.data;
                setAssessment(assess)
                setState({
                    question: assess[index].question,
                    option_a: assess[index].option_a,
                    option_b: assess[index].option_b,
                    option_c: assess[index].option_c,
                    option_d: assess[index].option_d,
                    correct_answer: assess[index].correct_answer,
                    batch_id: assess[index].batch_id,
                })
                console.log(assess)
                console.log(res.data)
                setIndex(0)
            }).catch(error => {
                console.log(error)
            })

    }

    const renderDefaultView = () => {
        return <div className='assessmentHistoryBox'>
            < p className='assessmentHistoryIndex'>{index + 1}/30</p>
            <div className='assessmentData'>
                <div className="history_file_container">
                    <div>
                        <img className="upload-icon" src={uploadIcon} alt="Upload icon" />
                    </div>
                    <input type="file" name="file" id="cv_file" className="input_file" disabled />
                    <label htmlFor="cv_file">Choose File</label>
                </div>
                <p style={style}>Upload succesful!</p>
                <div className="history_set_time">
                    <p>Set Time</p>
                    <select className="time-box" id="set_time" disabled >
                        <option value="5">00</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30" default>30</option>
                    </select>
                    <p className="mins">mins</p>
                </div>
                <button className='editBtn' onClick={changeEditMode}>Edit</button>
            </div>


            <label>Question</label>
            <textarea readOnly name="question" value={state.question} className="assessment-instruction"></textarea>
            <div className='history_row'>
                <div className='history_input'>
                    <label>Option A</label>
                    <input readOnly name="option_a" value={state.option_a} />
                </div>

                <div className='history_input'>
                    <label>Option B</label>
                    <input readOnly name="option_b" value={state.option_b} />
                </div>

            </div>

            <div className='history_row'>
                <div className='history_input'>
                    <label>Option C</label>
                    <input readOnly name="option_c" value={state.option_c} />
                </div>

                <div className='history_input'>
                    <label>Option D</label>
                    <input readOnly name="option_d" value={state.option_d} />
                </div>

            </div>
            <div className='history_input answer'>
                <label>Answer</label>
                <input readOnly name="correct_answer" value={state.correct_answer} />
            </div>
            <div className='prev_n_next_btn'>
                <button disabled={index === 0} onClick={handlePrev}>Previous</button>
                <button disabled={index === assessment.length - 1} onClick={handleNext}>Next</button>
            </div>
        </div >
    }

const renderEditView = () => {
    return <div className='assessmentHistoryBox'>
        <p className='assessmentHistoryIndex'>{index + 1}/30</p>
        <div className='assessmentData'>
            <div className="history_file_container">
                <div>
                    <img className="upload-icon" src={uploadIcon} alt="Upload icon" />
                </div>
                <input type="file" name="file" id="cv_file" className="input_file" onChange={handleFile} />
                <label htmlFor="cv_file">Choose File</label>
            </div>
            <p style={style}>Upload succesful!</p>
            <div className="set_time">
                <p>Set Time</p>
                <select className="time-box" id="set_time" onChange={handleTime} >
                    <option value="5">00</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30" default>30</option>
                </select>
                <p className="mins">mins</p>
            </div>

            <button className='saveBtn' onClick={saveInput}>Save</button>
            <button className='cancelBtn' onClick={changeEditMode}>Cancel</button>



        </div>

        <label>Question</label>
        <textarea name="question" value={state.question} className="assessment-instruction" onChange={handleChange}></textarea>
        <div className='history_row'>
            <div className='history_input'>
                <label>Option A</label>
                <input type='text' name="option_a" value={state.option_a} onChange={handleChange} />
            </div>

            <div className='history_input'>
                <label>Option B</label>
                <input type='text' name="option_b" value={state.option_b} onChange={handleChange} />
            </div>

        </div>

        <div className='history_row'>
            <div className='history_input'>
                <label>Option C</label>
                <input type='text' name="option_c" value={state.option_c} onChange={handleChange} />
            </div>

            <div className='history_input'>
                <label>Option D</label>
                <input type='text' name="option_d" value={state.option_d} onChange={handleChange} />
            </div>

        </div>
        <div className='history_input answer'>
            <label>Answer</label>
            <input type='text' name="correct_answer" value={state.correct_answer} onChange={handleChange} />
        </div>
        <div className='prev_n_next_btn'>
            <button disabled={index === 0} onClick={handlePrev}>Previous</button>
            <button disabled={index === assessment.length - 1} onClick={handleNext}>Next</button>
        </div>



    </div>
}

console.log(index)
console.log(state.correct_answer)
return (
    <div>
        {batchinfo.length !== 0 ?
            <div className='history_wrapper'>
                <h2>Application History</h2>
                <table className='assessmentHistory_table'>
                    <thead className='table_head'>
                        <tr>
                            <th>Batch</th>
                            <th>Date composed</th>
                            <th >No of Questions </th>
                            <th>Time Allocated</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...batchinfo].map((e, id) => (
                            <tr key={e.batch_id} className={`histories_tr ${batch == e.batch_id ? "batchActive" : null}`} onClick={() => ChangeBatch(e.batch_id)}>
                                <td className='assessmentHistory_batch'>Batch {e.batch_id}</td>
                                <td>{e.created_at}</td>
                                <td>{e.no_of_question} </td>
                                <td>{e.set_time}</td>
                                <td>{e.assessment_status}</td>

                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                {batch !== 0 ?
                (state.isInEditMode ? renderEditView() : renderDefaultView())
                : <div className= 'conditionalMsg'>Select A Batch From The Box Above</div>
            }
            </div>

            : <div className= 'conditionalMsg'>There are no applications to review</div>
        }
    </div>
);

}

export default AssessmentHistory;