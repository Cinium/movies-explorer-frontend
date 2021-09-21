import './Toggle.css';
import { useState, useRef } from 'react';

function Toggle({ label }) {
    const [selected, setSelected] = useState(false);
	const checkboxRef = useRef();

    async function changeToggle() {
        setSelected(!selected);
		
		checkboxRef.current.checked = !selected
    }

    return (
        <div className="toggle">
            <label className="toggle__label" onClick={changeToggle}>
                {label}
            </label>

            <div
                className={`toggle__container ${
                    selected ? '' : 'toggle__container_disabled'
                }`}
                onClick={changeToggle}>
                <div
                    className={`toggle__dot ${
                        selected ? '' : 'toggle__dot_disabled'
                    }`}
                />
            </div>

			<input type="checkbox" ref={checkboxRef} style={{display: 'none'}} />
        </div>
    );
}

export default Toggle;
