const canvas = document.querySelector("#gameScreen")
const ctx = canvas.getContext("2d")
const GAME_WIDTH = 800
const GAME_HEIGHT = 600
const scoreForm = document.querySelector("div#scoreForm")
const scoreSpan = document.querySelector("span#scoreSpan")
const highScoreDiv = document.querySelector("div#highScores")
const highScore1 = document.querySelector("li#highScore1")
const highScore2 = document.querySelector("li#highScore2")
const highScore3 = document.querySelector("li#highScore3")
const highScore4 = document.querySelector("li#highScore4")
const highScore5 = document.querySelector("li#highScore5")

let bottomPaddleOpts = {
  position: {},
  size: {height: 20, width: 300}}

bottomPaddleOpts.position = {
  x: (GAME_WIDTH/2 - bottomPaddleOpts.size.width/2),
  y: (GAME_HEIGHT - bottomPaddleOpts.size.height - 4)}

let topPaddleOpts = {
  position: {},
  size: {height: 20, width: 300}}

topPaddleOpts.position = {
  x: (GAME_WIDTH/2 - topPaddleOpts.size.width/2),
  y: 4}

let leftPaddleOpts = {
  position: {},
  size: {height: 250, width: 20}}

leftPaddleOpts.position = {
  x: 4,
  y: (GAME_HEIGHT/2 - (leftPaddleOpts.size.height / 2))}

let rightPaddleOpts = {
  position: {},
  size: {height: 250, width: 20}}

rightPaddleOpts.position = {
  x: (GAME_WIDTH - rightPaddleOpts.size.width - 4),
  y: (GAME_HEIGHT/2 - (rightPaddleOpts.size.height / 2))}

const LEVELS = [
  [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
  ],
  [
    [0,0,0,0,1,0,0,0,0],
    [0,0,0,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,0,0],
    [0,0,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1],
  ],
  [
    [0,0,0,1,1,1,0,0,1],
    [0,0,0,1,1,1,1,0,0],
    [0,0,1,1,1,1,1,0,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
  ]
]