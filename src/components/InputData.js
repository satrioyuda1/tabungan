import React, { Component } from 'react';

import Table from './Table';
import TotalMoney from './TotalMoney';

import '../styles/inputdata.css';

export default class InputData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			judul: '',
			tipe: '',
			jumlah: 0,
			pengeluaran: 0,
			pemasukan: 0,
			totalUang: 0,
			items: {},
			itemLists: [],
			editing: false
		};
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		// console.log(this.state.jumlah, this.state.tipe, this.state.judul);
	};

	countMoney = (event) => {
		event.preventDefault();
		let items = {
			id: this.state.itemLists.length + 1,
			tipe: this.state.tipe,
			jumlah: this.state.jumlah,
			judul: this.state.judul
		};

		this.setState(
			{
				jumlah: 0,
				judul: '',
				items: items,
				itemLists: [ ...this.state.itemLists, items ]
			},
			() => {
				if (this.state.tipe === 'pengeluaran') {
					this.setState({
						pengeluaran: parseInt(this.state.pengeluaran) + parseInt(items.jumlah),
						totalUang: parseInt(this.state.totalUang) - parseInt(items.jumlah)
					});
				} else if (this.state.tipe === 'pemasukan') {
					this.setState({
						pemasukan: parseInt(this.state.pemasukan) + parseInt(items.jumlah),
						totalUang: parseInt(this.state.totalUang) + parseInt(items.jumlah)
					});
				}
			}
		);

		// console.log(this.state.itemLists);
	};

	// function for amount pengeluaran,pemasukan dan total
	amount = (itemLists) => {
		let pengeluaran = 0,
			pemasukan = 0,
			total = 0;
		for (let i = 0; i < itemLists.length; i++) {
			if (itemLists[i].tipe === 'pengeluaran') {
				pengeluaran += parseInt(itemLists[i].jumlah);
			} else if (itemLists[i].tipe === 'pemasukan') {
				pemasukan += parseInt(itemLists[i].jumlah);
			}
		}
		total = pemasukan - pengeluaran;

		this.setState({
			pengeluaran: pengeluaran,
			pemasukan: pemasukan,
			totalUang: total
		});
	};

	deleteItem = (id) => {
		const itemLists = this.state.itemLists.filter((item) => item.id !== id);
		this.setState({ itemLists: itemLists });

		this.amount(itemLists);
	};

	editItem = (item) => {
		this.setState({
			editing: true,
			jumlah: item.jumlah,
			tipe: item.tipe,
			judul: item.judul
		});
	};

	setEditing = (value) => {
		this.setState({
			editing: value,
			judul: '',
			jumlah: 0
		});
	};

	updateItem = (event) => {
		event.preventDefault();
		const updatedTipe = this.state.tipe;
		const updatedJudul = this.state.judul;
		const updatedJumlah = this.state.jumlah;
		console.log(updatedJumlah);
		const updatedItems = Object.assign({}, this.state.items, {
			tipe: updatedTipe,
			judul: updatedJudul,
			jumlah: updatedJumlah
		});
		console.log(updatedItems);
		const itemLists = this.state.itemLists.map(
			(items) => (items.id === this.state.items.id ? updatedItems : items)
		);

		this.amount(itemLists);
		this.setState({ judul: '', tipe: '', jumlah: 0, itemLists: itemLists });
		this.setEditing(false);
	};

	render() {
		const { judul, tipe, jumlah, pengeluaran, pemasukan, totalUang, items, itemLists, editing } = this.state;
		return (
			<div>
				<h1>REACT TABUNGAN APP (CRUD)</h1>

				<div className='formWrapper'>
					<form onSubmit={this.countMoney}>
						<div className='form-group col-md-4'>
							<label>Tipe</label>
							<select className='form-control' name='tipe' onChange={this.onChange}>
								<option>Pilih</option>
								<option value='pengeluaran' name='pengeluaran'>
									Pengeluaran
								</option>
								<option value='pemasukan' name='pemasukan'>
									Pemasukan
								</option>
							</select>
						</div>

						<div className='form-group col-md-4'>
							<label for='inputState'>Jumlah</label>
							<input
								type='number'
								className='form-control'
								name='jumlah'
								onChange={this.onChange}
								value={this.state.jumlah}
							/>
						</div>

						<div className='form-group col-md-4'>
							<label for='inputState'>Judul</label>
							<input
								type='text'
								className='form-control'
								name='judul'
								onChange={this.onChange}
								value={this.state.judul}
							/>
						</div>

						<button type='submit' className='btn btn-primary mb-2 submitButton'>
							Submit
						</button>
					</form>
				</div>

				<TotalMoney pengeluaran={pengeluaran} pemasukan={pemasukan} totalUang={totalUang} />

				<Table
					items={items}
					itemLists={itemLists}
					editing={editing}
					editItem={this.editItem}
					tipe={tipe}
					jumlah={jumlah}
					judul={judul}
					setEditing={this.setEditing}
					deleteItem={this.deleteItem}
					onChange={this.onChange}
					updateItem={this.updateItem}
				/>
			</div>
		);
	}
}
