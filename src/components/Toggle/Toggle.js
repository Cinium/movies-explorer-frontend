import './Toggle.css';

function Toggle({ label, selected, setSelected }) {

    function changeToggle() {
        setSelected(!selected);
        localStorage.setItem('toggleState', JSON.stringify(!selected));
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
                onClick={changeToggle}
            >
                <div
                    className={`toggle__dot ${
                        selected ? '' : 'toggle__dot_disabled'
                    }`}
                />
            </div>

            <input
                type="checkbox"
                style={{ display: 'none' }}
            />
        </div>
    );
}

export default Toggle;
