import React, { useState } from "react";
import { Modal } from "semantic-ui-react";

function AboutModal() {
    const [open, setOpen] = useState(false);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<div className="about-link">About this site</div>}
            size="tiny"
            closeIcon
        >
            <Modal.Header>About</Modal.Header>
            <Modal.Content>
                <p>Hi, and welcome to my site.</p>
                <p>
                    This project is an implementation of a basic 16-beat music
                    sequencer. It was built by me for fun, to learn, and because
                    music is the best.
                </p>
                <p>
                    This site was built using Tone JS to implement the audio.
                    The front end is React. The back end was built in Django
                    using the Django Rest Framework.
                </p>
                <p>
                    Feel free to look around. The demo is available to all to
                    play, but changes can't be saved. To save a project, create
                    an account.
                </p>
                <p>
                    Source code can be found here:{" "}
                    <a href="https://github.com/wardou2/BeatquencherReact">
                        Front End
                    </a>{" "}
                    and{" "}
                    <a href="https://github.com/wardou2/BeatquencherDjango">
                        Back End
                    </a>
                    .
                </p>

                <p className="about-signature">Douglas Ward</p>
            </Modal.Content>
        </Modal>
    );
}

export default AboutModal;
