# Github-Access & Social Graph
I created this application as part of the coursework assigned to me while participating in the course CS3012 software engineering.

# Task
Interrogate the GitHub API to build visualisation of data available tht elucidates some aspect of the softare engineering process, such as a social graph of developers and projects, or a visualisation of indiviudal of team performance. Provide a visualisation of this using the d3js library. See https://d3js.org

# Demo
![Screenshot](readme_resources/Visualisation_Demo.gif)

# Master Branch
Contains the most up-to-date working version of the application. The application works in two parts, the server and the client.

## Server
The server is a command line data gathering application written in nodejs. This application gathers data using the github api about a logged in user and their followers. It then analyses users commits and the sentiment of commit messages using microsoft text analysis. Then all data is stored to a mongodb database where it can later be used by the client.

## Client
The client is broken into two components, a command line data processing application, and a html visualisation powered by d3. The data processing element reads the data gathered by the server from the database and parses it into a format for visualisation.
Then using express the html webpage is delivered to the user displaying a user, their followers and all commits made by the user and their followers. Users are represented by blue bubbles while commits are represented by bubbles ranging from red to green depending on sentiment.

# Measuring-Software-Engineering Branch 
A report on the ways in which the software engineering process can be measured and assesed in terms of measurable data, an overview of the computationial platforms available to perform this work, the algorithmic approachs available, and the ethics concerns surrounding this kind of analytics.

# Requirements 
NodeJS
MariaDB

![Screenshot](readme_resources/Github_Access_Screenshot.PNG)
![Screenshot](readme_resources/Github_Access_Screenshot_2.PNG)
![Screenshot](readme_resources/DataBundling_Screenshot.png)
![Screenshot](readme_resources/DataBundling_And_Visualisation_Screenshot.png)
