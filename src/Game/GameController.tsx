import * as React from "react";
import {Button, Col, Container, Row } from 'reactstrap';
import Game from "./Game";
import { BrowserRouter as Router, Link } from "react-router-dom";
import './GameController.css';

export interface IState {
    gameRunning: boolean;
    gridSize: number;
    score: number;
}

const buttonStyle = {
    padding: '5px 5px 5px 5px',
};

const paddingTop = {
    paddingTop: '5rem',
};

const paddingBottom = {
    paddingBottom: '20px',
};

//var connection = new WebSocket('ws://...');

class GameController extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            gameRunning: false,
            gridSize: 3,
            score: 0,
        };

        this.PublishScore = this.PublishScore.bind(this);
        this.resetScore = this.resetScore.bind(this);
        this.setGridSize = this.setGridSize.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
        this.onScoreChange = this.onScoreChange.bind(this);
    }

    public render() {
        return ( 
            <div className="DualnBack" style={paddingTop}>
                <Container>
                    <div style={paddingBottom}><Button color="primary" className={this.state.gameRunning ? 'hidden' : ''}  onClick={this.PublishScore}>Publish score</Button></div>
                    

                        <Row>
                            <Col xs="3">
                                <input type="range" min="3" max="5" className="slider" value={this.state.gridSize} onInput={this.setGridSize} onChange={this.setGridSize} />
                            </Col>
                            <Col xs="6">
                                <Game rows={this.state.gridSize} columns={this.state.gridSize} running={this.state.gameRunning} onScoreChange={this.onScoreChange}/>
                            </Col>
                            <Col xs="3">
                                <Row>
                                    <Col xs="12">
                                        <div style={buttonStyle}><Button color="primary"  className={this.state.gameRunning ? 'hidden' : ''}  onClick={this.onPlay}>Play</Button></div>
                                        <div style={buttonStyle}><Button color="primary"  className={!this.state.gameRunning ? 'hidden' : ''}  onClick={this.onPause}>Pause</Button></div>
                                        <div style={buttonStyle}><Button color="primary"  className={!this.state.gameRunning ? 'hidden' : ''}  onClick={this.resetScore}>Reset score</Button></div>
                                        
                                    </Col>
                                </Row>
                                <Row>
                                    <p>{this.state.score}</p>
                                </Row>
                            </Col>
                        </Row>
                </Container>
            </div>
        );
    }

    private PublishScore(e: any) {
        let token = (localStorage.getItem('jwt'));
        let user = (localStorage.getItem('user'));
        let bearer = 'Bearer ' + token;
        if (token) {
            const req = fetch("http://webassignment3grp10api.herokuapp.com/highscore/addhighscore", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  bearer,
                    'Host': 'localhost:4000',
                    'Connection': 'Keep-alive'
                },
                body: JSON.stringify({
                    name: user,
                    score: this.state.score,
                })
            }).then(res => console.log(res))
        }
    }

    private setGridSize(e: any) {
        this.setState({gridSize: e.target.value});
    }

    private onPlay(e: any) {
        this.setState({gameRunning: true});
    }

    private onPause(e: any) {
        this.setState({gameRunning: false});
    }

    private onScoreChange(previousScore: number, newScore: number) {
        this.setState({ score: newScore });
    }

    private resetScore() {
        this.setState({score: 0});
    }
}

export default GameController;