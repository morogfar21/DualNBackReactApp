import * as React from "react"
import './Homepage.css'

function Homepage() {
    return (
        <div className="homepage-container">
            <div className="homepage-heading"> Dual 1 back game - Keep your cognition up to date </div>

            <div className="centered">

                <section className="cards">

                    <article className="card">
                        <figure className="thumbnail">
                        </figure>
                        <div className="card-content">
                            <h2>Welcome</h2>
                            <p>
                                Welcome to the ITWEB assignment 3, made by group 7. On this SPA made in React you will be able to hone your skills and brain capacity in the dreaded dual 1 back game
                            </p>
                        </div>
                    </article>

                    <article className="card">
                        <figure className="thumbnail">
                        </figure>
                        <div className="card-content">
                            <h2>How to play</h2>
                            <p>
                            During every step of the game, 
                            a square appears at one of the positions on the board and you will hear a sound at the same time. Your task is to remember the 
                            sequence and press the corresponding button, position or sound, whenever the position or the sound is the same as 1 step ago.
                            </p>
                        </div>
                    </article>

                    <article className="card">
                        <figure className="thumbnail">
                        </figure>
                        <div className="card-content">
                            <h2>Reason to play</h2>
                            <p>
                                Follow this <a href="https://en.wikipedia.org/wiki/N-back" target="_blank"> link </a> to read more about the intrinsic values of the Dual 1 back game
                            </p>
                        </div>
                    </article>

                </section>

            </div>
        </div>
    )
}

export default Homepage;