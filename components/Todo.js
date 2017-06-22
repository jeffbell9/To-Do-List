import React from 'react';

let TODOS = [
	{
		name: "be awesome!",
		id: 1
	},
]

let nextId = 2;

class AddTodo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.onAdd(this.state.value);
		this.setState({value: ''});

	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Enter something to do" value={this.state.value} onChange={this.handleChange} />
				<input type="submit" value="Add to list" />
			</form>
		);
	}
}

function ShowList(props) {
	return (
		<table>
			<tbody>
				{props.list.map(function(item, index) { 
					return (
						<Item 
							name={item.name} 
							key={item.id} 
							handleDelete={function() {props.handleRemoveItem(index)}} />
					);
				}.bind(this))}
			</tbody>
		</table>
	);
}

function Item(props) {
		return (
			<tr>
				<td>
					<input type="checkbox" />
					<span>{props.name}</span>
				</td>
				<td>
					<button className="delete" onClick={props.handleDelete}>delete</button>
				</td>
			</tr>
		);
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.onItemAdd = this.onItemAdd.bind(this);
		this.handleRemoveItem = this.handleRemoveItem.bind(this);
		this.state = {todos: TODOS};
	}

	onItemAdd(value) {
		this.state.todos.push({
			name: value,
			id: nextId
		});
		this.setState(this.state);
		nextId += 1;
	}

	handleRemoveItem(index) {
		this.state.todos.splice(index, 1);
		this.setState(this.state);
	}

	render() {
		return (
			<div>
				<div className="title">
					<h1>To Do List</h1>
				</div>

				<AddTodo onAdd={this.onItemAdd} />

				<hr />

				<ShowList list={this.state.todos} handleRemoveItem={this.handleRemoveItem} />
			</div>
		);
	}
}

export default App;