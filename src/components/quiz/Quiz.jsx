import React, { useState, useRef, useEffect } from 'react';
import { data } from '../../assets/data';
import './Quiz.css';

export const Quiz = () => {
    let [index, setIndex] = useState(0);
    const [buttonContent, setButtonContent] = useState("Next");
    const [lock, setLock] = useState(false);
    const optionRefs = useRef([]);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const [question, setQuestion] = useState(data[0]);
    let [time, setTime] = useState(10);

    useEffect(() => {
        // Reset the classes on options when the question changes
        optionRefs.current.forEach(option => {
            if (option) {
                option.classList.remove('correct', 'wrong');
            }
        });
        setTime(10);
        setLock(false);
    }, [index]);

    useEffect(() => {
        if (!lock) {
            const interval = setInterval(() => {
                setTime(prevSeconds => {
                    if (prevSeconds <= 1) {
                        clearInterval(interval);
                        if (optionRefs.current[question.ans - 1]) {
                            optionRefs.current[question.ans - 1].classList.add("correct");
                        }
                        setLock(true);
                        return 0;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);

            return () => clearInterval(interval); // Clear the interval when the component unmounts or re-renders
        }
    }, [lock, question.ans]);

    const handleNext = () => {
        if (lock) {
            const newIndex = index + 1;
            if (newIndex < data.length) {
                setIndex(newIndex);
                setQuestion(data[newIndex]);
                if (newIndex === data.length - 1) {
                    setButtonContent("Submit");
                }
            } else {
                setResult(true);
            }
        }
    };

    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                setScore(prev => prev + 1);
                e.target.classList.add("correct");
            } else {
                e.target.classList.add("wrong");
                if (optionRefs.current[question.ans - 1]) {
                    optionRefs.current[question.ans - 1].classList.add("correct");
                }
            }
            setLock(true);
        }
    };

    return (
        <div className={result ? "result" : "container"}>
            <h1 style={{ textAlign: "center" }}>Quiz App</h1>
            <hr />
            {
                result ? 
                <div>
                    <h2 style={{ textAlign: "center" }}>Your score is: {score}</h2>
                </div> :
                <>
                    <div className='time'>{time}</div>
                    <h2>{index + 1}. {question.question} </h2>
                    <ul>
                        <li ref={el => optionRefs.current[0] = el} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                        <li ref={el => optionRefs.current[1] = el} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                        <li ref={el => optionRefs.current[2] = el} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                        <li ref={el => optionRefs.current[3] = el} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                    </ul>
                    <button onClick={handleNext}>
                        {buttonContent}
                    </button>
                    <div className="index">{index + 1} of {data.length} question</div>
                </>
            }
        </div>
    );
};


