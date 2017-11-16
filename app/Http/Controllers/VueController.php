<?php

namespace App\Http\Controllers;


class VueController
{
    public function home()
    {
        return $this->vueApp();
    }

    public function about()
    {
        return $this->vueApp();
    }

    public function account()
    {
        return $this->vueApp();
    }

    protected function vueApp()
    {
        return view('vue_app');
    }
}