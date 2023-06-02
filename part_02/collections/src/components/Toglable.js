import { useState } from 'react'

const Togglable = (props) => {
    // const [visible, setVisible] = useState(false)
    //display:  (props.user !== null) && !visible
    //(visible) || (props.user === null)
    const hideWhenVisible = { display: props.visible ? 'none' : '' }
    const showWhenVisible = { display: props.visible ? '' : 'none' }

    const toggleVisibility = (val) => {
        props.setVisible(val)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => { toggleVisibility(true) }}>{props.buttonLabel}</button>
            </div>
            <div>
                {(props.visible) || (props.user === null) ?
                    props.children
                    : null}
                <button style={showWhenVisible} onClick={() => { toggleVisibility(false) }}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable