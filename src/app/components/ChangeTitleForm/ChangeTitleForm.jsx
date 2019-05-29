import React from 'react';
import { connect } from 'react-redux';
import { changeTitle } from '../../redux/action';

export class ChangeTitleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.changeTitle(this.state.title);
    }

    handleChange(event) {
        this.setState({
            title: event.target.value,
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">
                        Change title:
                        <input
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input type="submit" value="OK" />
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        title: state.metadata.title,
    }),
    dispatch => ({
        changeTitle: title => dispatch(changeTitle(title)),
    }),
)(ChangeTitleForm);
