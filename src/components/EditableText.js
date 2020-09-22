import React from "react";

class EditableText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.text,
        };
    }

    componentDidUpdate() {
        if (this.props.editing) {
            this.valueInput.focus();
        }
    }

    handleChange = (ev) => {
        ev.preventDefault();
        this.setState({ value: ev.target.value });
    };

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.props.submit(this.state.value);
    };

    render() {
        return this.props.editing ? (
            <form onSubmit={this.handleSubmit}>
                <input
                    ref={(input) => {
                        this.valueInput = input;
                    }}
                    style={{ width: "4em" }}
                    value={this.state.value}
                    onChange={this.handleChange}
                ></input>
            </form>
        ) : (
            <div>{this.props.text}</div>
        );
    }
}

export default EditableText;
