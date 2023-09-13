<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\FibonansiController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});

Route::get('/fibonansi', [FibonansiController::class, 'index'])->name('fibonansi.index');
Route::get('/fibonansi/{n}/{m}', [FibonansiController::class, 'fibonacciProduct'])->name('fibonansi.produk');

Route::get('/dashboard', function () {
    return redirect('/transaksi');
    return Inertia::render('Dashboard');

})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/transaksi',[TransaksiController::class, 'index'])->name('transaksi.index');
    Route::get('/transaksi/create',[TransaksiController::class, 'create'])->name('transaksi.create');
    Route::post('/transaksi/store',[TransaksiController::class, 'store'])->name('transaksi.store');
    Route::get('/transaksi/{transaksi}/edit',[TransaksiController::class, 'edit'])->name('transaksi.edit');
    Route::post('/transaksi/update',[TransaksiController::class, 'update'])->name('transaksi.update');
    Route::get('/transaksi/{id}/delete',[TransaksiController::class, 'delete'])->name('transaksi.delete');


    Route::get('/logout', [ProfileController::class, 'logout'])->name('logout');
});

require __DIR__.'/auth.php';
