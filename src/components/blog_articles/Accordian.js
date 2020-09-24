const { useState } = require("react");

import React { useState } from 'react';

const Accordion = (props) => {
    const [accordionState, setAccordionState] = useState(false)

    const toggleAccordion = () => {
        setAccordionState(!accordionState)
    }
    return (
        <div className="accordion_section">
            <button className={accordionState ? 'sidebar' : null} >
                <p className="accordion_title">
                    {props.title}
                </p>
            </button>
            <div className="accordion_content">
                <div className="accordion_text"></div>
            </div>
        </div>
    )
}
