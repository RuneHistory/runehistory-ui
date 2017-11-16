<?php

namespace App\Http\Controllers\Api;


use App\Api\Api;
use Illuminate\Http\Request;

class HighScoresController
{
    public function get(Request $request, Api $api, $account, $days = 30)
    {
        $createdBefore = $request->get('createdBefore');
        $page = $request->get('page', 1);
        $highscores = $api->getHighScores($account, $days, $page, $createdBefore);
        return $highscores;
    }
}