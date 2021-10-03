import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import Flop from './Flop.jsx';
import UserCards from './UserCards.jsx';
import DealerCards from './DealerCards.jsx';
import MoneyOnTable from './MoneyOnTable.jsx';

class Poker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userHand: [],
      flopHand: [],
      dealerHand: [],
      moneyOnTable: 0,
      userBet: 0,
      dealerBet: 0,
      dealerMove: '',
      turn: false, //whne this turns true, 4th card put down
      river: false, //when this turns true, 5th card put dwon
      gameOver: false, //when this is true: the game is over
      gameId: '',
      bigBlind: 0,
      buyIn: 0,
      gameId: 0,
      increment: 0 //this is for when raising a bet by how much-- need to set back to 0 after using this val
    };
    this.initialDeal = this.initialDeal.bind(this);
    this.userBet = this.userBet.bind(this);
    this.blindBets = this.blindBets.bind(this);
    this.dealerFirstBet = this.dealerFirstBet.bind(this);
  }

  async initialDeal() {
    try {
      const {bigBlind, buyIn} = this.props;
      console.log('initialDeal bb, bi', bigBlind, buyIn);
      const cards = await axios.get(`/routes/poker/poker/init/${buyIn}/${bigBlind}`);
      console.log('INITIAL DEAL CARDS: ', cards);
      return cards.data;
      //ALSO NEED TO SET THE GAME ID!!!!!
      
      //also set the buyIN and big blind that are passed down via the props

    } catch (err) {
      console.log(err);
    }

  }


  //for when the usre bets.  takes in object bet, which = {move: ___} and possibly has a raise property if the move is a raise.  
  async userBet(bet) {
    console.log('userbet');
    try { //user place the bet
      //if the bet is  (0) -- set the state to over. game over
      if (bet.move === 'fold') {
        this.setState({
          gameOver: true
        });
        return;
      }

      if (bet.move === 'call') {
        const {dealerBet, userBet, gameId} = this.state;
        const call = dealerBet - userBet; //difference needed to call the bet
        const db = await axios.put(`/routes/poker/poker/bet/${gameId}/${call}/${0}`);

        //set up for the next turn to happen
        this.state.river && this.setState({
          gameOver: true
        });

        this.state.turn && this.setState({
          river: true
        });

        !this.state.turn && this.setState({
          turn: true
        });

        
      }

      if (bet.move === 'raise') {
        const {dealerBet, userBet, gameId, increment} = this.state;
        const call = dealerBet - userBet; //difference needed to call the bet
        const betSize = call + increment; //amount needed to call plus the bet increment
        const db = await axios.put(`/routes/poker/poker/bet/${gameId}/${betSize}/${1}`);

      }
     


    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {

    try {
      //call initial deal
      console.log('cdm bB, bI', this.props.bigBlind, this.props.buyIn);
      console.log('poker component mount');
      const cards = await this.initialDeal();
      const {dealerHand, flopHand, userHand, gameId, } = cards;
      this.setState((state, props) => ({
        dealerHand: dealerHand,
        flopHand: flopHand,
        userHand: userHand,
        gameId: gameId,
        bigBlind: this.props.bigBlind,
        buyIn: this.props.buyIn
      }), () => {
        console.log('thisstate after cdm: ', this.state);
        this.blindBets();

     
      });

    } catch (err) {
      console.log(err);
    }

  }

  async blindBets() {
    console.log('blindbets');
    
    const {bigBlind} = this.props;
    const {gameId} = this.state;
    console.log('blindbets bb, gameId', bigBlind, gameId);
    //dealer is small blind
    
    //user is big blind
    //update money on the table in the db w/ axios
    const mOT = await axios.put(`/routes/poker/poker/blinds/${gameId}/${bigBlind}`);
    console.log('mOT', mOT);
    this.setState({
      moneyOnTable: mOT.data
    });
     
    //**adjust cuz first bet, and dealer is by default returning just the small blind */

    //add small blind to money on the tble
    //should build a put request back end to update the money on table

    //pass these as props to the moneyOnTable component

    //then the dealer bets


  }

  //for the dealers first bet.  dealer is small blind, user is bB
  async dealerFirstBet () {
    try {
      //summon to back end, see best hand, decide if call/fold/raise
      const {bigBlind, gameId} = this.state;
      const call = bigBlind / 2;
      

      const {data} = await axios.get(`/routes/poker/poker/dealerBet/${gameId}/${call}`);

      console.log('DFB.DATA', data.bet, data.move);
      //call -> 1 more small blind to match the big blind
      
      //--> raise 
      //fold --> game over, moneyOnTable goes to users buy in

      this.setState({
        dealerBet: data.bet,
        dealerMove: data.move,
        moneyOnTable: data.moneyOnTable
      }, () => console.log(this.state));

    } catch (err) {

    }
  }

  userMove () {

  }



  render() {


    const {dealerHand, flopHand, userHand, dealerBet, dealerMove, userBet, moneyOnTable, river, turn} = this.state;
    return (
      <div>poker
        <div>
          <DealerCards dealerHand={dealerHand} />
        </div> 
        <div>
          <Flop flopHand={flopHand} turn={turn} river={river} />
        </div>
        <div>
          <UserCards userHand={userHand} />
        </div>
        <div>
          <MoneyOnTable dealerBet={dealerBet} dealerMove={dealerMove} userBet={userBet} moneyOnTable={moneyOnTable} />
        </div>
       
        <div>
          <button
            onClick={() => {
              this.userBet({move: 'call'});
            }}
          >call</button><b />
          <button
            onClick={() => {
              this.userBet({move: 'fold'});
            }}
          >fold</button> <b />
          <button
            onClick={() => {
              this.userBet({move: 'raise'});
            }}
          >raise</button>
          <button
            onClick={() => {
              //increase the increment in state by big blind each time it is clicked
              const {bigBlind, increment} = this.state;
              this.setState({
                increment: increment + bigBlind
              });

            }}
          >bigBlindIncrement</button>
          <button onClick={this.dealerFirstBet}>dealerFirstBet</button>
        </div>
        
      </div>
    );
  }
}

export default Poker;