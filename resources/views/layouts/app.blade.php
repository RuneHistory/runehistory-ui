<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>@yield('title') - RuneHistory</title>

        <link rel="stylesheet" href="{{ mix('/css/bootstrap.css') }}">
        <link rel="stylesheet" href="{{ mix('/css/bootstrap-vue.css') }}">
        <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    </head>
    <body>
        <b-container id="app">
            @yield('content')
        </b-container>
        <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
    </body>
</html>
