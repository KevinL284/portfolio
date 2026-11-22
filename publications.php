<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=900');
header('X-Content-Type-Options: nosniff');

// Set this to the handle of Kevin's Medium profile, without the @.
const MEDIUM_HANDLE = 'kevin.lucas284sz';

function readMediumArticles(): array
{
    if (!preg_match('/^[a-zA-Z0-9_.-]{1,64}$/', MEDIUM_HANDLE)
        || !function_exists('curl_init') || !function_exists('simplexml_load_string')) {
        return [];
    }

    $feed = 'https://medium.com/feed/@' . MEDIUM_HANDLE;
    $request = curl_init($feed);
    if ($request === false) {
        return [];
    }
    curl_setopt_array($request, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 3,
        CURLOPT_TIMEOUT => 6,
        CURLOPT_USERAGENT => 'KevinSouzaPortfolio/1.0',
    ]);
    $xml = curl_exec($request);
    $status = curl_getinfo($request, CURLINFO_RESPONSE_CODE);
    if (!is_string($xml) || $status !== 200 || strlen($xml) > 2000000) {
        return [];
    }

    libxml_use_internal_errors(true);
    $rss = simplexml_load_string($xml, 'SimpleXMLElement', LIBXML_NONET);
    libxml_clear_errors();
    if ($rss === false || !isset($rss->channel->item)) {
        return [];
    }

    $articles = [];
    foreach ($rss->channel->item as $item) {
        $title = trim((string) $item->title);
        $url = trim((string) $item->link);
        if ($title === '' || parse_url($url, PHP_URL_SCHEME) !== 'https'
            || parse_url($url, PHP_URL_HOST) !== 'medium.com') {
            continue;
        }
        $articles[] = ['title' => $title, 'url' => $url];
        if (count($articles) === 6) {
            break;
        }
    }

    return $articles;
}

echo json_encode(readMediumArticles(), JSON_INVALID_UTF8_SUBSTITUTE);
