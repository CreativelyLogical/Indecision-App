console.log("app.js IS running");

const app = {
    title: 'Indecision App',
    subtitle: 'Put your life in the hands of a computer',
    options: []
};


const onFormSubmit = (e) => {

    e.preventDefault();

    const option = e.target.option.value;

    // console.log('option is', option);

    if (option) {
        app.options.push(option);
        e.target.option.value = '';
        renderIndecisionApp();
    }
}

const onRemoveAll = (e) => {
    e.preventDefault();

    app.options = [];

    renderIndecisionApp();
}

const onMakeDecision = (e) => {
    e.preventDefault();

    const randNum = Math.floor(Math.random() * app.options.length);

    const decision = app.options[randNum];

    alert(decision);

    console.log("randNum is", randNum);
}


const appRoot = document.getElementById("app");



 

const renderIndecisionApp = () => {

    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            {app.options.length > 0 ? 'Here are your options' : 'No options'}
            <p>{app.options.length}</p>
            <button onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
                {
                    app.options.map((option) => {
                        return <li key={option}>{option}</li>
                    })
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );   

    ReactDOM.render(
        template,
        appRoot
    )
}

renderIndecisionApp();