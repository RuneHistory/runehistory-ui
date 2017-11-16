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
        return json_decode((string) $result->getBody());
    }

    /**
     * @param $account
     * @param int $days
     * @param int $page
     * @param null|Carbon $createdBefore
     * @return string
     */
    public function getHighScores($account, $days = 30, $page, $createdBefore = null)
    {
        if (is_null($createdBefore)) {
            $createdBefore = Carbon::now();
        }
        $createdAfter = clone $createdBefore;
        $createdAfter->subDays($days);
        return $this->request('GET', "/v1/accounts/{$account}/highscores", [
            'createdBefore' => $createdBefore->toDateTimeString(),
            'createdAfter' => $createdAfter->toDateTimeString(),
            'page' => $page,
        ]);
    }
}