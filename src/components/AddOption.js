import React from 'react';


export default class AddOption extends React.Component {
    state = {
        error: undefined
    }

    handleAddOption = (e) => {
        e.preventDefault();

        const option = e.target.option.value.trim();
        

        let errorMsg = 'please enter valid input';

        if (option) {
            errorMsg = this.props.handleAddOption(option);
        }

        this.setState(() => ({ 
            error: errorMsg 
        }))

        if (!errorMsg) {
            e.target.option.value = '';
        }

    }

    render() {
        return (
             <div>
                <p className="add-option-error">{this.state.error}</p>
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="option"/>
                    <button className="button">Add option</button>
                </form>
             </div>
        );
    }
}