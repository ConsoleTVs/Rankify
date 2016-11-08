$(function() {
    if(!settings.api_key) {
        $('#summoner_name').text('Error, please check if your API key is set')
    }
    getData();
    setInterval(function() {
        getData();
    }, settings.interval);
})

function updateInfo() {
    $('body').css('color', settings.text_color);
    $('.container').css('width', settings.container_width);
    $('#summoner_name').text(settings.summoner_name).css('font-size', settings.summoner_name_size);
    $('#summoner_lp').text(settings.summoner_lp + ' LP').css('font-size', settings.summoner_lp_size);
    $('#summoner_tier').text(settings.summoner_tier).css('font-size', settings.summoner_tier_size);
    $('#summoner_division').text(settings.summoner_division).css('font-size', settings.summoner_division_size);
    $('#division_img').attr('src', 'tiers/' + settings.summoner_tier.toLowerCase() + '_' + settings.summoner_division.toLowerCase() + '.png')
}

function getRankedInfo() {
    var url = 'https://euw.api.pvp.net/api/lol/' + settings.summoner_region.toLowerCase() + '/v2.5/league/by-summoner/' + settings.summoner_id + '/entry?api_key=' + settings.api_key;
    $.getJSON(url, function( data ) {
        settings.summoner_tier = data[settings.summoner_id][0]['tier'];
        settings.summoner_division = data[settings.summoner_id][0]['entries'][0]['division'];
        settings.summoner_lp = data[settings.summoner_id][0]['entries'][0]['leaguePoints'];
    }).done(updateInfo);
}

function getData() {
    var summoner = settings.summoner_name.toLowerCase().split(' ').join('');
    var url = 'https://euw.api.pvp.net/api/lol/' + settings.summoner_region.toLowerCase() + '/v1.4/summoner/by-name/' + summoner + '?api_key=' + settings.api_key;
    $.getJSON(url, function( data ) {
        settings.summoner_id = data[summoner]['id'];
    }).done(getRankedInfo);
}
