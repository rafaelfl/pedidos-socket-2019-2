var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

const game = createGame()

game.subscribe((comand) => {
  io.emit(comand.type, comand)
})

game.start()

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){

  game.addPlayer(socket.id)

  socket.on('disconnect', () => {
    game.end()
    game.removePlayer(socket.id)
  });

  socket.on('set-mark', (command) => {
    game.setMark(socket.id, command)
  });

  socket.on('start', (command) => {
    game.start()
  });

});

function createGame(){
  const observers = []
  const state = {
    players: {},
    grade: [],
    current: null,
    round: null,
    started: false,
    audience: {}
  }

  subscribe(finishGame)

  function finishGame(command){
    if(command.type === 'mark'){
      const player = state.players[command.playerId]
      if(verifyFinishGame(state.grade)){
        player.points += 1
        state.started = false
        start();
      }else{
        if(gridIsFull(state.grade)){
          state.started = false
          start()
        }
      }
    }
  }

  function gridIsFull(grade){
    for(let i of grade){
      if(!i.every((el) => { return el === null })){
        return false
      }
    }
    return true
  }

  function verifyFinishGame(grade){
    function test(array){
      return array.every((element, index, array) => {
        return array[0] === element && element !== null
      })
    }

    var line = null
    var column = null
    var testLC = false

    for(var i = 0; i < 3; i++){
      line = grade[i]
      column = grade.map(x => x[i])

      if(test(line) || test(column)){
        testLC = true
      }
    }

    m_diagonal = grade.map((x, index, array) => array[index][index])
    s_diagonal = grade.map((x, index, array) => array[index][2-index])

    return test(m_diagonal) || test(s_diagonal) || testLC
  }

  function start(){
    if(!state.started && countPlayers() == 2){
      clearGrade();
      state.round = getRound()
      state.current = state.round
      state.started = true

      notifyAll({
        type: 'state',
        state: state
      })
    }
  }

  function getRound(){
    const keysPlayers = Object.keys(state.players)

    if(state.round === null){
      state.round = keysPlayers[0]
      return keysPlayers[0]
    }

    for(i of keysPlayers){
      if(state.round !== i){
        return i
      }
    }
  }

  function changeCurrent(){
    const keysPlayers = Object.keys(state.players)

    for(i of keysPlayers){
      if(state.current !== i){
        state.current = i
        break
      }
    }
  }

  function end(){
    clearGrade()
    state.started = false
  }

  function clearGrade(){
    state.grade = []
    for(i = 0; i < 3; i++){
      state.grade.push([null,null,null])
    }
  }

  function countPlayers(){
    return Object.keys(state.players).length
  }

  function subscribe(observerFunction) {
    observers.push(observerFunction)
  }

  function notifyAll(command) {
    for (const observerFunction of observers) {
      observerFunction(command)
    }
  }

  function setMark(playerId, command){

    if(playerId == state.current){
      const player = state.players[playerId]
      state.grade[command.i][command.j] = player.symbol
      
      changeCurrent()
  
      notifyAll({
        type: 'state',
        state: state
      })

      notifyAll({
        type: 'mark',
        playerId: playerId
      })
    }
  }

  function addPlayer(playerId){

    if(countPlayers() >= 2){
      addAudience(playerId)
    }else{
      const symbol = getSymbol()

      state.players[playerId] = {
        name: playerId,
        symbol: symbol,
        points: 0
      }
    }

    function addAudience(spectId){
      state.audience[spectId] = {
        name: spectId
      }
    }

    notifyAll({
      type: 'state',
      state: state
    })
  }

  function removePlayer(playerId){
  
    delete state.players[playerId]
    delete state.audience[playerId]

    notifyAll({
      type: 'state',
      state: state
    })
  }

  function getSymbol(){
    for(var i in state.players){
      if(state.players[i].symbol == 'X'){
        return 'O'
      }
      return 'X'
    }
    return 'X'
  }

  return {
    state,
    subscribe,
    setMark,
    addPlayer,
    removePlayer,
    start,
    verifyFinishGame,
    end
  }
}

http.listen(3000, function(){
  console.log('listening on *:3000')
});