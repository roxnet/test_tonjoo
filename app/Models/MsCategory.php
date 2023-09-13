<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MsCategory extends Model
{
    use HasFactory;

    protected $table= 'ms_category';
    public $timestamps = false;

    protected $fillable = [
        'name',
    ];


    public function tr_detail()
    {
        return $this->HasMany(TrDetail::class);
    }
}
