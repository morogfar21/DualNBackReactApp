import * as React from "react";
import { useRef, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Button, Col, Container, Row, Table } from 'reactstrap';
import TextField from '@material-ui/core/Textfield';
import { List, ListItem, Paper, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import './Highscore.css'

export const Highscore: React.FC = (props) => {

    
    const [state, setState] = useState({
        username: "",
        highscores: [],
    })  
    const [highscores, setHighscores] = useState([]);
    const highscoresRef = useRef(highscores);

    const paperStyle = {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        color: 'white'
    };

    // React.useEffect(() => {
    //     let scores = getHighscores();
    //     setHighscores(scores);
    // }, []);


    // React.useEffect(() => 
    //   componentDidMountEffectHandler(), []
    // )

    React.useEffect(() => {
highscoresRef.current = getHighscores();
  }, [highscores]);

    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prevstate => ({
            ...prevstate,
            [id]: value
        }))
    }

    // function componentDidMountEffectHandler() {
    // //  setHighscores(getHighscores());
 
    // }

    // https://stackoverflow.com/questions/54543581/extract-object-items-in-object-array-at-react-template
    var highscorelist = highscoresRef.current.map((item, index) => {
      console.log(highscoresRef);
        return(
              <TableBody>
                  <TableRow key={index}>
                    <TableCell style={{color: "white"}}>{item.username}</TableCell>
                    <TableCell style={{color: "white"}}>{item.score}</TableCell>
                  </TableRow>
              </TableBody>
        )
    })
 
    return (
      <div className="table-main" style={{maxWidth: "50%", margin: "auto", paddingTop: "5rem"}}>
          <Paper style={paperStyle}>
            <Table className="table-form" style={{paddingBottom: 2, paddingTop: 4}}>
              <TableHead style={{paddingBottom: 2, paddingTop: 4}}>
                <TableRow>
                  <TableCell className="table-header" style={{paddingBottom: 2, paddingTop: 4, color: "white"}} >Name</TableCell>
                  <TableCell className="table-header" style={{paddingBottom: 2, paddingTop: 4, color: "#ffffff"}} >Score</TableCell>
                </TableRow>
              </TableHead>
                {highscorelist}
            </Table>
            If table isnt showing, click HIGHSCORES in the header again
          </Paper>
          </div>
    )
}

function getHighscores() {
    
    const connection = new WebSocket('ws://webassignment3grp10api.herokuapp.com');

    connection.onopen = () => {
        console.log('Websocket is connected');
    }

    var currentScores = [];

    connection.onmessage = e => {       
        
        var jsonData = JSON.parse(e.data);

        console.log(jsonData);

        jsonData.forEach(element => {
            var username = element.name;
            var score = element.score;
            
            var highscore = {username, score};
            currentScores.push(highscore);

            
        });   
        
    }
    return currentScores;
    
}

export default Highscore;