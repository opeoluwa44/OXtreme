import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Icons from '@/components/Icons'
import Snackbar from 'react-native-snackbar';


const App = () => {
  const [isCross, setISCross] = useState<boolean>(false)
  const [gameWinner, setGameWinner] = useState<string>('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))

  const reloadGame =()=>{
    setISCross(false)
    setGameWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }

  const checkIsWinner =()=>{
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game!`)
    }else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5] 
    ) {
      setGameWinner(`${gameState[3]} won the game!`)
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&    
      gameState[7] === gameState[8]    
    ) {
      setGameWinner(`${gameState[6]} won the game!`)
    }else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6] 
    ) {
      setGameWinner(`${gameState[6]} won the game!`)
    }else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7] 
    ) {
      setGameWinner(`${gameState[1]} won the game!`)
    }else if (
      gameState[2] === 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8] 
    ) {
      setGameWinner(`${gameState[2]} won the game!`)
    }else if (
      gameState[0] === 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8] 
    ) {
      setGameWinner(`${gameState[0]} won the game!`)
    }else if (
      gameState[2] === 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6] 
    ) {
      setGameWinner(`${gameState[2]} won the game!`)
    }else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game....')
    }
  }

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#000',
        textColor: '#fff'
      })
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle'
      setISCross(!isCross)
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor:'red',
        textColor:'#fff'
      })
    }

    checkIsWinner()
  }

  return (
   <SafeAreaView>
      <StatusBar/>
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View style={[styles.playerInfo, 
          isCross ? styles.playerX : styles.playerO
        ]}>
          <Text>Player{isCross ? 'X' : 'O'}'s Turn</Text>
        </View>
      )}
      <FlatList
        numColumns={3}
        data={gameState}
        style={styles.grid}
        renderItem={({item, index})=>(
          <Pressable
          key={index}
          style={styles.card}
          onPress={()=>onChangeItem(index)}
          >
            <Icons name={item}/>
          </Pressable>
        )}
      />
      <Pressable
        style={styles.gameBtn}
        onPress={reloadGame}
      >
        <Text>
          {gameWinner ? 'Start new game' : 'Reload game'}
        </Text>
      </Pressable>
   </SafeAreaView>
  )
}

export default  App

const styles = StyleSheet.create({
  playerInfo: {
    height:56,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:4,
    paddingVertical:8,
    marginVertical:12,
    marginHorizontal:14,
    shadowOffset:{
      width:1,
      height:1
    },
    shadowColor:'#333',
    shadowOpacity:0.2,
    shadowRadius:1.5
  },
  gameTurnTxt:{
    fontSize:20,
    color:'#fff',
    fontWeight:'600'
  },
  playerX:{
    backgroundColor:'#38cc77'
  },
  playerO:{
    backgroundColor:'#F7CD2E'
  },
  grid:{
    margin:12
  },
  card:{
    height:100,
    width:'33.33%',
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderColor:'#333'
  },
  winnerInfo:{
    borderRadius:8,
    backgroundColor:'#38cc77',
    shadowOpacity:0.1,
  },
  winnerTxt:{
    fontSize: 20,
    color: '#fff',
    fontWeight:'600',
    textTransform:'capitalize'
  },
  gameBtn:{
    alignItems:'center',
    padding: 10,
    borderRadius:8,
    marginHorizontal:36,
    backgroundColor:'#8d3daf'
  },
  gameBtnTxt:{
    fontSize:18,
    color:'#fff',
    fontWeight:'500'
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize:24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize:18,
    fontWeight:'400'
  }
})