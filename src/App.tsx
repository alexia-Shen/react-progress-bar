import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { ProgressBarItem } from './models/ProgressBar.model';
import ProgressBarComponent from './components/ProgressBar';
import { Container, Form, Button, Stack, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';



function App() {
    // Set up initial progress bars
    const [progressBars, setProgressBars] = useState([
        {
            id: 1,
            name: '#progress1',
            progress: 10
        },
        {
            id: 2,
            name: '#progress2',
            progress: 40
        },
        {
            id: 3,
            name: '#progress3',
            progress: 60
        }
    ] as ProgressBarItem[]);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Update progress bar state with new value
    const increaseProgress = (index: number, addValue: number) => {

        const newProgressBars = [...progressBars];
        if (newProgressBars[index].progress + addValue <= 0) {
            // Progress value should not go under 0.
            newProgressBars[index].progress = 0;
        } else {
            newProgressBars[index].progress += addValue;
        }
        setProgressBars(newProgressBars);
    };

    // Update selected progress bar
    const changeCurrentIndex = (event: any) => {
        setCurrentIndex(event.target.value);
    };

    return (
        <Container fluid>
            <div className='app'>
                <h2>Progress Bar demo</h2>
                <Row>
                    <Col>
                        <div className='progressbar-group'>
                            {
                                progressBars.map((progressBar: ProgressBarItem, index: number) => (
                                    <ProgressBarComponent
                                        key={index}
                                        progressBar={progressBar}
                                    />
                                ))
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md='auto' lg={5}>
                        <Form.Select
                            aria-label='Progress select'
                            value={currentIndex}
                            onChange={changeCurrentIndex}
                        >
                            {
                                progressBars.map((progressBar: ProgressBarItem, index: number) => (
                                    <option key={index} value={index}>
                                        {progressBar.name}
                                    </option>
                                ))
                            }
                        </Form.Select>
                    </Col>
                    <Col sm={12} md='auto' lg={7}>
                        <Stack
                            className='button-group'
                            direction='horizontal'
                            gap={2}>
                            <Button
                                className='button'
                                variant='outline-danger'
                                onClick={() => increaseProgress(currentIndex, -25)}>
                                -25
                            </Button>
                            <Button
                                className='button'
                                variant='outline-danger'
                                onClick={() => increaseProgress(currentIndex, -10)}
                            >
                                -10
                            </Button>
                            <Button
                                className='button'
                                variant='outline-info'
                                onClick={() => increaseProgress(currentIndex, 10)}
                            >
                                +10
                            </Button>
                            <Button
                                className='button'
                                variant='outline-info'
                                onClick={() => increaseProgress(currentIndex, 25)}
                            >
                                +25
                            </Button>
                        </Stack>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}


export default App;
