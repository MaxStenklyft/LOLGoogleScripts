const key = <RIOT API KEY GOES HERE. GET ONE AT https://developer.riotgames.com/>;

function GETPLAYERDATA(user, champion) {
  
    //GET SUMMONER ACCOUNT ID
    var data = {};
    var response = UrlFetchApp.fetch("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + user + "?api_key=" + key, {muteHttpExceptions: true, validateHttpsCertificates: true})
    data = JSON.parse(response.getContentText());
    var accountId = data["accountId"];
    
    
    //USE SUMMONER ACCOUNT ID TO GET MATCH LIST. FILTER USING CRITERIA
    var criteria = [["queue", 420], ["queue", 440], ["queue", 700], ["api_key", key], ["endIndex", 20]];
    
    if(champion){
      criteria.push(["champion", champion]);
    }
    
    var matchesUrl = "https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/" + accountId + "?";
    
    for(let i = 0; i < criteria.length; i++) {
      matchesUrl += criteria[i][0] + "=" + criteria[i][1];
      if(i + 1 < criteria.length) {
        matchesUrl += "&";
      }
    }
    
    
    response = UrlFetchApp.fetch(matchesUrl, {muteHttpExceptions: true, validateHttpsCertificates: true})
    data = JSON.parse(response.getContentText());
    
    var matches = data["matches"];
    
    
    //ITERATE OVER MATCHES AND AGGRIGATE DATA
    var wins = 0;
    var total = 0;
    for(let i = 0; i < matches.length; i++) {
      var matchUrl = "https://na1.api.riotgames.com/lol/match/v4/matches/" + matches[i]["gameId"] + "?api_key=" + key;
      response = UrlFetchApp.fetch(matchUrl, {muteHttpExceptions: true, validateHttpsCertificates: true})
      data = JSON.parse(response.getContentText());
      var teams = data["teams"];
      var winningTeam = teams[0]["win"] == "Win" ? teams[0]["teamId"] : teams[1]["teamId"];
      var participants = data["participants"];
      
      for(let p = 0; p < participants.length; p++){
        if(participants[p]["championId"] == matches[i]["champion"]){
          if(participants[p]["teamId"] == winningTeam){
            wins++;
          }
        }
      }
      total++;
    }
  return total == 0 ? "NONE/ERROR" : wins/total;
}
