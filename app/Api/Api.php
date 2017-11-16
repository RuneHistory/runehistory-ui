<?php

namespace App\Api;


use Carbon\Carbon;
use GuzzleHttp\Client;

class Api
{
    private $client;
    private $host;

    public function __construct($host)
    {
        $this->host = $host;

        $this->client = new Client([
            'base_uri' => $host
        ]);
    }

    public function request($method, $uri, $params = [])
    {
        $result = $this->client->request($method, $uri, [
            'query' => $params,
        ]);
        return (string) $result->getBody();
    }

    public function getHighScores($account, $days = 30)
    {
        $createdBefore = Carbon::now();
        $createdAfter = Carbon::now()->subDays($days);
        return $this->request('GET', "/v1/accounts/{$account}/highscores", [
            'createdBefore' => $createdBefore->toDateTimeString(),
            'createdAfter' => $createdAfter->toDateTimeString(),
        ]);
    }
}