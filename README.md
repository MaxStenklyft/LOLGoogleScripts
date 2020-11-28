# LOLGoogleScripts
Repo for scripts to help retrieve and analyze League of Legends player data. 


## Setup
1. Create Google Sheet
2. Navigate to Tools -> Script Editor
3. Past Contents of code.gs into this Editor
4. Replace the "key" on line 1 with a fresh key from https://developer.riotgames.com/


## Examples
### Get Win Ratio for a summoner's last 20 games (ranked flex, solo q or clash)
GETPLAYERDATA(NightKnight33)
### Get Win Ratio for a summoner's last 20 games on a specific champion using champion ID (See https://developer.riotgames.com/docs/lol#data-dragon_champions to get link to champion ID)
GETPLAYERDATA(NightKnight33, 12) 
