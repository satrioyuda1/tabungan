import React from 'react';

import '../styles/inputdata.css';

const Table = (props) => {
	return (
		<div>
			<table className='table tableStyles'>
				<thead className='table-dark'>
					<tr>
						<th>Tipe</th>
						<th>Jumlah</th>
						<th>Judul</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody className='table-hover'>
					{props.editing ? (
						<tr className='rowHover'>
							<td>
								<select className='form-control form-table' name='tipe' onChange={props.onChange}>
									<option>Pilih</option>
									<option value='pengeluaran'>Pengeluaran</option>
									<option value='pemasukan'>Pemasukan</option>
								</select>
							</td>

							<td>
								<input
									type='number'
									className='form-control form-table'
									name='jumlah'
									value={props.jumlah}
									onChange={props.onChange}
								/>
							</td>

							<td>
								<input
									type='text'
									className='form-control form-table'
									name='judul'
									value={props.judul}
									onChange={props.onChange}
								/>
							</td>

							<td>
								<button
									onClick={props.updateItem}
									type='button'
									className='btn btn-success buttonStyles'>
									Update
								</button>
								<button
									onClick={() => props.setEditing(false)}
									type='button'
									className='btn btn-warning buttonStyles'>
									Cancel
								</button>
							</td>
						</tr>
					) : (
						props.itemLists.map((item, index) => {
							return (
								<tr
									key={index}
									style={{
										color: item.tipe === 'pengeluaran' ? 'red' : 'blue'
									}}
									className='rowHover'>
									<td>{item.tipe}</td>
									<td>{item.jumlah}</td>
									<td>{item.judul}</td>
									<td>
										<button
											type='button'
											className='btn btn-primary buttonStyles'
											onClick={() => props.editItem(item)}>
											Edit
										</button>
										<button
											onClick={() => props.deleteItem(item.id)}
											type='button'
											className='btn btn-danger buttonStyles'>
											Delete
										</button>
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
