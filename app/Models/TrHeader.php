<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrHeader extends Model
{
    use HasFactory;

    protected $table= 'transaction_header';
    public $timestamps = false;

    protected $fillable = [
        'description',
        'code',
        'rate_euro',
        'date_paid',
    ];


    public function tr_detail()
    {
        return $this->HasMany(TrDetail::class,'transaction_id');
    }
}
