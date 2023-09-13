<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrDetail extends Model
{
    use HasFactory;

    protected $table= 'transaction_detail';
    public $timestamps = false;

    protected $fillable = [
        'transaction_id',
        'transaction_category_id',
        'name',
        'value_idr'
    ];


    public function tr_header()
    {
        return $this->belongsTo(TrHeader::class,'transaction_id');
    }

    public function ms_category()
    {
        return $this->belongsTo(MsCategory::class,'transaction_category_id');
    }
}
