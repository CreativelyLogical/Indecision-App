import React from 'react';

import AddOption from './AddOption'
import Action from './Action'
import Header from './Header'
import Options from './Options'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {

    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOptions = () => {
        this.setState(() => ({
            options: []
        }));
    };

    handlePick = () => {
        let randNum = Math.floor(Math.random() * this.state.options.length)

        console.log(`randNum is ${randNum}`);

        let option = this.state.options[randNum];

        this.setState(() => ({
            selectedOption: option
        }));
        // alert(this.state.options[randNum]);

    };

    handleClearSelectedOption = () => {
        this.setState(() => ({
            selectedOption: undefined
        }));
    };

    handleAddOption = (option) => {

        if (this.state.options.indexOf(option) > -1) {
            return 'item already exists';
        }

        this.setState((prevState) => ({ 
            options: prevState.options.concat(option) 
        }))
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    };

    componentDidMount() {

        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            
            if (options) {
                this.setState(() => ({
                    options: options
                }))    
            }    
        } catch (e) {
            // do nothing
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) { // this means there has been a change in the data
            const data = JSON.stringify(this.state.options);
            localStorage.setItem('options', data);
        }
    }

    componentWillUnmount() {
        console.log('component will unmount');
    }


    render() {

        const subtitle = 'Put your life in the hands of a computer.'

        return (
             <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />        
                    </div>
                    
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
             </div>
        );
    }
}