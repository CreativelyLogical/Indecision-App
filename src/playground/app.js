class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: ['Item 1', 'Item 2', 'Item 3']
        }
    }


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



    handleDeleteOptions() {
        this.setState(() => ({
            options: []
        }));
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }

    handlePick() {
        let randNum = Math.floor(Math.random() * this.state.options.length)

        console.log(`randNum is ${randNum}`);

        alert(this.state.options[randNum]);

    }

    handleAddOption(option) {

        if (this.state.options.indexOf(option) > -1) {
            return 'item already exists';
        }

        this.setState((prevState) => ({ 
            options: prevState.options.concat(option) 
        }))
    }

    render() {

        const title = 'Indecision App';
        const subtitle = 'Put your life in the hands of a computer.'

        return (
             <div>
                <Header title={title} subtitle={subtitle}/>
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
             </div>
        );
    }
}


const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h4>{props.subtitle}</h4>
        </div>
    );
}

const Action = (props) => {
    return (
        <div>
           <button 
               onClick={props.handlePick}
               disabled={!props.hasOptions}
           >
           What should I do?</button>
        </div>
   );
}

const Options = (props) => {
    return (
        <div>
           <button onClick={props.handleDeleteOptions}>Remove All</button>
           {props.options.length == 0 && <p>Please add an option here to get started</p>}
           {props.options.map((option) => {
               return (
                   <Option 
                    key={option} 
                    option={option}
                    handleDeleteOption={props.handleDeleteOption}
                />)
           })}
        </div>
   );
}

const Option = (props) => {
    return (
        <div>
           {props.option}
           <button 
            onClick={(e) => {
                props.handleDeleteOption(props.option);
            }}
           >Remove</button>
        </div>
   );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }

    handleAddOption(e) {
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
                <p>{this.state.error}</p>
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add option</button>
                </form>
             </div>
        );
    }
}


ReactDOM.render(
    <IndecisionApp/>,
    document.getElementById("app")
);