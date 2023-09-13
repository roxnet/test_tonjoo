<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class FibonansiController extends Controller
{

    public function index(){
        return inertia('Fibonansi/index');
    }
    
    public function fibonacci($n = 5)
    {
        $fibos = [];
        for ($i = 0; $i <= $n; $i++){
            if($i == 0){
                $fibos[$i] = 0;
            }elseif ($i == 1){
                $fibos[$i] =1;
            }else {
                $fibos[$i] = $fibos[$i-1] + $fibos[$i-2];
            }
        }

        return [
            'result'=> $fibos[$n],
        ];
    }

    /**
     * buatlah fungsi penjumlahan 2 bilangan dari deret fibonacci
     * 
     * - ambil bilangan fibonacci ke $n1
     * - ambil bilangan fibonacci ke $n2
     * - jumlahkan bilangan tersebut
     * - kembalikan hasilnya
     * - contoh
     *      - n1 = 1, Fb(1) = 1
     *      - n2 = 4, Fb(4) = 3
     *      - Fb(1) + Fb(4) =4
     *  
     */

     public function fibonacciProduct($n1,$n2)
     {
        $fb1=$this->fibonacci($n1);
        $fb2=$this->fibonacci($n2);

        $nilai=$fb1['result']+$fb2['result'];
        return [
                'fb1'=>$fb1,
                'fb2'=>$fb2,
                'hasil'=>$nilai,
            ];
     }
}