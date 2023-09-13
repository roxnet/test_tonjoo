//import React
import React,{ useState } from 'react';

import dayjs from 'dayjs';

import updateLocale from "dayjs/plugin/updateLocale";
//import layout
import Layout from '../../Layouts/Default';

//import Link
import { Link } from '@inertiajs/inertia-react';

import { usePage } from '@inertiajs/react';

import Select from 'react-select';

import Datepicker from "react-tailwindcss-datepicker";

export default function TransaksiIndex({ transaksi, session }) {
    const { flash } = usePage().props

    const [filteredList, setFilteredList] = useState(transaksi);
    
    const [kategori, setkategori] = useState('');

    const options = [
        { value: '', label: 'Pilih Kategori' },
        { value: '1', label: 'Income' },
        { value: '2', label: 'Expensive' },
      ]

      const filterByDate = (event) => {
        // Access input value
        const query = event;
        console.log(query);
        // Create copy of item list
        var updatedList = [...transaksi];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
             return (
                new Date(item.tr_header.date_paid)>= new Date(query.startDate) &&
                new Date(item.tr_header.date_paid)<= new Date(query.endDate)
            )
        });
        // Trigger render with updated values
        setFilteredList(updatedList);
    };

    const filterByKatori = (event) => {
        // Access input value
        const query = event.label;
        console.log(query);
        // Create copy of item list
        var updatedList = [...transaksi];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
             return (
                item.ms_category.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
            )
        });
        // Trigger render with updated values
        setFilteredList(updatedList);
    };

    const filterBySearch = (event) => {
        // Access input value
        const query = event.target.value;
        // Create copy of item list
        var updatedList = [...transaksi];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
             return (
                item.tr_header.description.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.tr_header.code.toLowerCase().indexOf(query.toLowerCase()) !== -1 || 
                item.tr_header.rate_euro.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.ms_category.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
            )
            return desfilter;
        });
        // Trigger render with updated values
        setFilteredList(updatedList);
    };
    dayjs.extend(updateLocale);
    dayjs.updateLocale('en', {
        months: [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
          "Agustus", "September", "Oktober", "November", "Desember"
        ]
      })
  return (
    <Layout>
        <h1 className="text-3xl text-black pb-2">List Data Transaksi</h1>

        <div className="w-full mt-2">

            <div className="flex my-4 gap-2 justify-between">
                <p className="text-md flex my-4 ">
                    <Link href="/transaksi/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">TAMBAH TRANSAKSI</Link>
                </p>
                <div className="flex my-4 gap-1 justify-end">
                    <Link href='/transaksi' className="bg-gray-500 hover:bg-gray-700 mr-3 my-3 p-1 text-white font-bold rounded-full text-sm flex items-center"><i className="fas fa-sync-alt"></i></Link>
                    <div className="w-1/2">
                        <Datepicker 
                        onChange={filterByDate}
                        className="w-1/8 px-2 py-2 text-gray-700 bg-gray-100 rounded"
                        />
                    </div>
                    
                    <Select className="w-1/2" options={options} defaultValue={options[0]} onChange={filterByKatori} />
                    <input className="rounded h-9" type="text" placeholder="Search" onChange={filterBySearch} />
                </div>
                
            </div>
            {flash.message && (
                <div className="w-3/4">
                    <div className="px-4 py-4 rounded text-slate-800 bg-green-300 my-4" role="alert">
                        <p>{flash.message}</p>
                    </div>
                </div>
            )}
            <div className="bg-white overflow-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">No</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Deskripsi</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Code</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Rate Euro</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date Paid</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Kategori</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nama Transaksi</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nominal (IDR)</th>
                            <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">

                        { filteredList.map((transaksi, index) => (
                            <tr key={ index }>
                                <td className="text-left py-3 px-4">{ index+1 }</td>
                                <td className="text-left py-3 px-4">{ transaksi.tr_header.description }</td>
                                <td className="text-left py-3 px-4">{ transaksi.tr_header.code }</td>
                                <td className="text-left py-3 px-4">{ transaksi.tr_header.rate_euro }</td>
                                <td className="text-left py-3 px-4">{ dayjs(transaksi.tr_header.date_paid).format('DD MMMM YYYY') }</td>
                                <td className="text-left py-3 px-4">{ transaksi.ms_category.name }</td>
                                <td className="text-left py-3 px-4">{ transaksi.name }</td>
                                <td className="text-left py-3 px-4">{ transaksi.value_idr }</td>
                                <td className="text-center">
                                <Link href={ `/transaksi/${transaksi.tr_header.id}/edit` } className="bg-green-500 hover:bg-green-700 mr-3 text-white font-bold py-2 px-2 rounded text-sm"><i className="fas fa-pencil-alt"></i></Link>
                                
                                <Link href={ `/transaksi/${transaksi.tr_header.id}/delete` } className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-sm mr-3"><i className="fas fa-trash"></i></Link>
                                </td>
                            </tr>
                        )) }
                        
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
  )
}