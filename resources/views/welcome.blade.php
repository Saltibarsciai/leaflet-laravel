<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
    </head>
    <body class="antialiased">
       <div id="app">
           <cont></cont>
       </div>
       <ol>
           <li>
               open console
           </li>
           <li>
               drag
           </li>
           <li>
               zoom
           </li>
           <li>
               open popup (not working, mhhh )
           </li>
           <li>
               click
           </li>
       </ol>
       <p>
           changing :lat-lng from :lat-lng=[one. two] to :lat-lng='both' changes things
       </p>
       <p>
           having 2 v-fors also impacting (one is not showing at all)
       </p>
       <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
