//import React
import React, { useState } from 'react';

import { Inertia } from '@inertiajs/inertia';

import Layout from '../../Layouts/Fibo';


export default function FibonansiIndex({ }) {

    const [fb1, setFb1] = useState('');
    const [fb2, setFb2] = useState('');

    const [fbhasil1, setFbhasil1] = useState('');
    const [fbhasil2, setFbhasil2] = useState('');

    const [hasil, setHasil] = useState('');

    const getData = (event) => {
        console.log(fb1,fb2)
        if(fb1 && fb2){
            fetch("/fibonansi/"+fb1+"/"+fb2)
            .then((res) => res.json())
            .then((json) => {
                setFbhasil1(json.fb1.result);
                setFbhasil2(json.fb2.result);
                setHasil(json.hasil);
            })
            .catch((err) => {
            });
        }
    }

    return (
        <Layout>

                <div className="flex mb-6 w-1/2 items-center mx-auto">
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Variabel 1
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"  type="number" value={fb1} name="var1" onChange={(e) => setFb1(e.target.value)}/>
                    </div>
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Variabel 2
                        </label>
                        <input className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="number" value={fb2} name="var2" onChange={(e) => setFb2(e.target.value)}/>
                    </div>
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getData}>
                            Hasil
                            </button>
                    </div>
                </div>

                <div className="flex mb-6 w-1/2 items-center mx-auto">
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Fibonansi {fb1}
                        </label>
                        <div className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">{ fbhasil1 }</div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Fibonansi {fb2}
                        </label>
                        <div className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">{ fbhasil2 }</div>
                    </div>
                </div>

                <div className="flex mb-6 w-1/2 items-center mx-auto">
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Hasil Jumlah
                        </label>
                        <div className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white">{ hasil }</div>
                    </div>
                </div>
                
        </Layout>
  )
}