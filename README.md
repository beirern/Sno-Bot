# Sno-Bot

A Discord bot that does random things, usually related to speaking.

## Inspiration

When COVID initially hit in Spring 2020 I spent a lot of time at home and wanted to do something. I was chatting with friends more often in Discord (Similar to Slack but better) and during the Spring wanted to build a Discord bot to have more fun in Discord. One of our friends tends to say very random sentences or just say sentences that don't make any sense so I decided to build a bot based off of their way of speaking.

Please note that **this is not a NLP Bot or anything remotely complex**. I remembered that in my first year at the University of Washington we had done a homework for recursion that was a kind of a Mad-Lib generator. Essentially it broke up sentences into parts of speech/syntax rules. For example, one type of sentence is *\<NOUN> \<VERB> \<OBJECT>* such as *I eat fish*. So what we did in that homework assingment was define some nouns, verbs, and objects and then replace the templates with actual words to make random Mad-Lib like sentences. I basically recreated that homework assignment for this case. There are more complex cases than just *\<NOUN> \<VERB> \<OBJECT>* which is in the *symbols.json* file but that is the general idea. **Note:** The keys/parts of speech in *symbols.json* are almost all abreviated, i.e. "p" is short for "pronoun" and "iv" is short for "intransitive verb", but I do not remember all of the shorthand since it came from that homework assignment, so if you look at the *symbols.json* file it may not be clear what the parts of speech actually are. Usually, using the parts of speech in an example sentence will make it clearer.

The reason I chose to do this recursive approach rather than something like NLP is two-fold. First of all, I do not know anything about NLP and am a novice in Machine Learning so if I wanted to use NLP there was no way to do this project quickly. Second, as I mentioned earlier my friend speaks very nonsensically, and NLP may try to make too much sense. The point of this bot was to generate random sentences in the hope that the sentences would either be funny or make no sense and be funny in that way. Also, over some time the bot evolved and did more than just speak a sentence or insult. We had custom music and poems that were specific to our friend group and commands were made for those.

Sno-Bot is named because at the time of writting this, it is winter and I go **SNO**wboarding at **SNO**qualmie pass. That is all.

**Note:** This is **NOT** the actual bot that is currently in our Discord server. The bot we use has a NSFW vocabulary and some of the commands are very specific to our friend group so they wouldn't make sense in a public GitHub. The Sno-Bot is a "generalized" bot that has some features stripped and a SFW vocabulary. If you use the bot as it is now some featurs won't work, i.e. the `song` and `poem` feature, since the songs and poems we had were handmade and wouldn't make sense to anyone ouside our friend group.

## What does it do?

Everything it does is centered around reading funny/nonsensical content. It hops in the Discord channel you are in and reads the content. The commands illustrate some of this.

### Commands

First, all commands need to be prefixed with something, by default this is **!sno**.

* `!sno`
    * prints out a help message
* `!sno voice <NUM>`
    * Changes the voice that is used for the GCP Text-to-Speech based on the voices available
* `!sno sentence`
    * Either prints and speaks a premade sentence or generates a random one
* `!sno insult (Noun)`
    * Typing `!sno insult` will print and speak a premade insult or generate a random one. The structure of an insult is **|Noun| is |Adjective|** so sometimes insults are actually complements! Typing `!sno insult (Noun)` will insult the noun that was passed in.
* `!sno song (song name)`
    * Downloads and plays the custom song that is found in GCP storage at *\<BUCKET-NAME>/media/\<SONG-NAME>*.
* `!sno poem (poem name)`
    * Prints and speaks the poem. Our poems were defined as strings in the code and did not use GCP.
* `!sno (command)`
    * Runs some custom command. Does not work in Sno-Bot but we have some custom commands in our Discord.
* `!sno add (part of speech) (word)`
    * Adds the word to the part of speech in *symbols.json*
* `!sno delete (part of speech) (word)`
    * Removes the word from the part of speech in *symbols.json*
* `!sno leave`
    * Sno-Bot leaves the Discord Channel

## Requirements

This uses GCP and is run on a server (I use vultr.com since I got free credits).

1. A Discord Server
2. Your own Discord Bot with a Token
3. GCP Text-to-Speech API
4. GCP Storage
5. Some kind of server to run, could be run locally

In order to have the bot use your GCP it needs the right credentials, the credentials should be a json file (see *\<YOUR-GCP-CREDENTIALS>.json*). Also some environment variables are needed, they are shown in the *.env* file.

The Text-to-Speech API is used to have the bot talk in Discord. The Storage is used to store any media files (songs) that you might want to use. I run it on a server so that I don't need to run it locally.

## How to Run

There are a couple of ways to run this.

### Locally without Docker

To run locally take the repo and add in your GCP credentials file and environment variables. Then just type `npm start` or `npm run start`.

### Locally with Docker

Some thing as before but instead of `npm start` run `docker build -t <BUILD-NAME>:<TAG> .` and after the build is complete type `docker run <BUILD-NAME>:<TAG>` (pass in -d for detached mode).

### On Server

The server can run with or without Docker, the steps are exactly the same, just ssh into the server and set everything up as you would do it locally.

## Notes/Comments

Initally I wanted to use AWS or GCP to run the bot in a Docker Container using ECS in AWS or Cloud Run in GCP; However, the free tier of Cloud Run was incredibly laggy (the bot would respond after multiple seconds) and it didn't give me a good enough CPU or enough RAM to use the text to speech option without the audio lagging as well. I had a similar experience with AWS ECS. I learned about `vultr.com` and found a promo for $100 of free credits (the bot runs about $0.75 a day) and so far the experience has been amazing. No delays in response or audio, it runs as if I was running locally, and best of all for now it is totally free! 

A note on using the bot. As I stated before it works best when it can say nonsensical sentences. Hence, adding in a NSFW word or two tends to make the sentences funnier. Also, adding in random words that sound funny works well too. If none of these suggestions work and the bot is just terrible, I hear that alcohol can make things funnier!

This is not **one** bot that can live on any Discord Server, rather you would need to create your own bot and change the *DISCORD-TOKEN* environment variable to your bots token and add your own bot to the server. So each server needs its own bot. There are reasons. First, it would be more complex to figure out how to balance different users vocabularies and media. It wouldn't be that difficult but I would then need to manage a DB and pay for it. Second and more importantly, I don't forsee anyone other than our server using this, so until I am proven wrong I will not generalize the bot to work on multiple servers. Finally and most importantly, even if multiple servers wanted this bot I really don't want to pay for the CPU usage of mutliple servers using this thing and going through the hassle of having multiple instances of it running. The point of this was to be fun and practice deploying an app using Docker, not burn cash. It's fun for our server and free, so mission accomplished!