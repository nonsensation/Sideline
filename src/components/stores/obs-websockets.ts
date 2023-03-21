import { writable } from 'svelte/store'

export let wsEvents = writable( {
    min: 'sideline_obs_time_min' ,
    sec: 'sideline_obs_time_sec' ,
    period: 'sideline_obs_time_period' ,
    
    score_home: 'sideline_obs_score_home' ,
    score_away: 'sideline_obs_score_away' ,

    name_home: 'sideline_obs_name_home' ,
    name_away: 'sideline_obs_name_away' ,

    textcolor_home: 'sideline_obs_textcolor_home' ,
    textcolor_away: 'sideline_obs_textcolor_away' ,

    background_home: 'sideline_obs_background_home' ,
    background_away: 'sideline_obs_background_away' ,

    logo_home: 'sideline_obs_logo_home' ,
    logo_away: 'sideline_obs_logo_away' ,
} )


