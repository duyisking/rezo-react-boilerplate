import React from 'react';
import '../../shared-library/scss/shared-library.scss';

export default function TestComponent(props) {
    return (
        <>
            <main>
                <section className="content">
                    <h1>value-proposition-1 - 20/03/2020</h1>
                    <h2>Web animation based project</h2>

                    <p>
                        Here's a quick set-up guide:
                    </p>

                    <ul>
                        <li>Clone Git repo</li>
                        <li>Install by running "npm install" on the commmand line</li>
                        <li>Run "npm start" on the command line.</li>
                    </ul>

                </section>

                <aside>
                    <h3>Project Info</h3>
                    <p>
                        This is a starter front-end project which will compile SCSS and JS files using Webpack 4.
                    </p>
                </aside>

            </main>
            <div className="columns">
                <div className="column">
                    First column
                </div>
                <div className="column">
                    Second column
                </div>
                <div className="column">
                    Third column
                </div>
                <div className="column">
                    Fourth column
                </div>
            </div>
        </>
    );
}
