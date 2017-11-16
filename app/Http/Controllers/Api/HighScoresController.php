<?php

namespace App\Http\Controllers\Api;


use App\Api\Api;

class HighScoresController
{
    public function get($account, $days = 30)
    {
        $api = new Api('http://api.runehistory.local');
        $highscores = $api->getHighScores($account, $days);
        return $highscores;
    }
}