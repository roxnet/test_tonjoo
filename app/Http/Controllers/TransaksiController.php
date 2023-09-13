<?php

namespace App\Http\Controllers;

use App\Models\TrDetail;
use App\Models\TrHeader;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransaksiController extends Controller
{
    public function index(){
        $transaksi=TrDetail::with(['tr_header','ms_category'])->get();


        return inertia('Transaksi/index',[
            'transaksi' => $transaksi,
        ]);
    }

    public function create(){
        return inertia('Transaksi/create');
    }

    public function store(Request $request){


        $this->validate($request, [
            'description'     => 'required',
            'code'     => 'required|min:5',
            'rate_euro'   => 'required|min:10'
        ]);

        $trHeader=TrHeader::create([
            'description'=>$request->description,
            'code'=>$request->code,
            'rate_euro'=>$request->rate_euro,
            'date_paid'=>$request['date_paid']['startDate'],
        ]);

        foreach($request->row_income as $income){
            TrDetail::create([
                'transaction_id'=>$trHeader->id,
                'transaction_category_id'=>1,
                'name'=>$income['namatransaksi'],
                'value_idr'=>$income['nominal'],
            ]);
        }

        foreach($request->row_expense as $expense){
            TrDetail::create([
                'transaction_id'=>$trHeader->id,
                'transaction_category_id'=>2,
                'name'=>$expense['namatransaksi'],
                'value_idr'=>$expense['nominal'],
            ]);
        }

        return redirect()->route('transaksi.index')->with('message','Data Berhasil Ditambah');

    }

    public function edit($transaksi)
    {
        $transaksi=TrHeader::with(['tr_detail'=>function($join){
            $join->select('transaction_detail.transaction_id','transaction_detail.transaction_category_id','transaction_detail.id','transaction_detail.name','transaction_detail.value_idr','ms_category.name as name_category')->join('ms_category','transaction_detail.transaction_category_id','=','ms_category.id');
        }])->where('id',$transaksi)->first();

        $dataincome=[];
        $dataexpense=[];
        foreach($transaksi->tr_detail as $detail){
            if($detail->name_category=='Income'){
                array_push($dataincome,["namatransaksi"=>$detail->name,'nominal'=>$detail->value_idr]);
            }
            elseif($detail->name_category=='Expensive'){
                array_push($dataexpense,["namatransaksi"=>$detail->name,'nominal'=>$detail->value_idr]);
            }
        }

        $transaksi->date_paid=date('Y-m-d', strtotime($transaksi->date_paid));

        return inertia('Transaksi/edit',[
            'transaksi' => $transaksi,
            'dataincome' => $dataincome,
            'datadataexpense' => $dataexpense,
        ]);
    }

    public function update(Request $request){
        TrHeader::where('id',$request->id)->update([
            'description'=>$request->description,
            'code'=>$request->code,
            'rate_euro'=>$request->rate_euro,
            'date_paid'=>$request['date_paid']['startDate'],
        ]);

        TrDetail::where('transaction_id',$request->id)->delete();
        foreach($request->row_income as $income){
            TrDetail::create([
                'transaction_id'=>$request->id,
                'transaction_category_id'=>1,
                'name'=>$income['namatransaksi'],
                'value_idr'=>$income['nominal'],
            ]);
        }

        foreach($request->row_expense as $expense){
            TrDetail::create([
                'transaction_id'=>$request->id,
                'transaction_category_id'=>2,
                'name'=>$expense['namatransaksi'],
                'value_idr'=>$expense['nominal'],
            ]);
        }

        return redirect()->route('transaksi.index')->with('message','Data Berhasil Dirubah');
    }

    public function delete($id){


        TrDetail::where('transaction_id',$id)->delete();
        TrHeader::where('id',$id)->delete();

        return redirect()->route('transaksi.index')->with('message','Data Berhasil Dihapus');
    }
}
