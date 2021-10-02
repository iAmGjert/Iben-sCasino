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
      river: false, //
      gameOver: false,
      gameId: '',
      bigBlind: 0,
      buyIn: 0,
      gameId: 0
    };
    this.initialDeal = this.initialDeal.bind(this);
    this.userBet = this.userBet.bind(this);
    this.blindBets = this.blindBets(this);
  }

  async initialDeal() {
    try {
      const {bigBlind, buyIn} = this.props;
      const cards = await axios.get(`/routes/poker/poker/init/${buyIn}/${bigBlind}`);
      console.log('INITIAL DEAL CARDS: ', cards);
      return cards.data;
      //ALSO NEED TO SET THE GAME ID!!!!!
      //also set the buyIN and big blind that are passed down via the props

    } catch (err) {
      console.log(err);
    }

  }

  async blindBets() {
    console.log('blindbets')
    try {
      const {bigBlind, gameId} = this.state
    //dealer is small blind
    
      //user is big blind
      //update money on the table in the db w/ axios
      const bb = await axios.put(`/routes/poker/poker/blinds/${gameId}/${bigBlind}`)
      console.log('BB',  bb)
      return bb
      //**adjust cuz first bet, and dealer is by default returning just the small blind */

      //add small blind to money on the tble
      //should build a put request back end to update the money on table

      //pass these as props to the moneyOnTable component

      //then the dealer bets


    } catch (err) {
      console.log('blindBet err', err);
    }

  }

  async userBet(bet) {
    try { //user place the bet
      //if the bet is  (0) -- set the state to over. game over
      if (!bet) {
        this.setState({
          gameOver: true
        });
        return;
      }
      

      //if user calls or raises --> send the put request
     const dealerBet = await axios.put(`/routes/poker/poker/bet/${gameId}/${bet}`);
      //* the dealer bet is retrned from that request 

      //dealer automatically makes hte bet -->update the state

      //conditional: if no fold and if flop < 5, deal another card to the flop

      //if the dealerBet is a fold or the cards are full, change gameover to true.

      /* if time then can add more betting after the river, but start w/ this */ 

      //this function placed on a button, so by click}


    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {

    try {
      //call initial deal
      console.log('poker component mount');
      const cards = await this.initialDeal();
      const {dealerHand, flopHand, userHand, gameId, } = cards;
      this.setState({
        dealerHand: dealerHand,
        flopHand: flopHand,
        userHand: userHand,
        gameId: gameId,
        bigBlind: this.props.bigBlind,
        buyIn: this.props.buyIn
      });
      const returned = await this.blindBets()
      console.log('blindbets returned' , returned)
     
      //set the state to display the cards
    } catch (err) {
      console.log(err);
    }
    

  }

  //need to put down blinds.  dealer put down single, user put down dbl blind.  (maybe randomize this) 
  //get request for the /bets

  //after both bets are placed, put down one more card to flop-pile
  //turns for place bet, raise, or fold.

  //put down last acrd to flop pile
  //turns for place bet, raise or fold.
  //for dealer ai--> just raise if rank > 5, fold if < 2, and add randomize parameter alpha to make that less predictable 

  //show cards and calculate best hand

  //if user wins, update the user db .money with earnings

  //FINISHED COMPONENT
  //conditional render: if a fold --> game ends, no cards flipped
  //if the flop is 5 cards--> 




  render() {


    const {dealerHand, flopHand, userHand, dealerBet, userBet, moneyOnTable} = this.state;
    return (
      <div>poker
        <p>
          <DealerCards dealerHand={dealerHand} />
        </p> 
        <p>
          <Flop flopHand={flopHand} />
        </p>
        <p>
          <UserCards userHand={userHand} />
        </p>
        <p>
          <MoneyOnTable dealerBet={dealerBet} userBet={userBet} moneyOnTable={moneyOnTable} />
        </p>
       
        <p>
          <button>call</button><b />
          <button>fold</button> <b />
          <button>raise</button><button>bigBlindIncrement</button>
        </p>
        
      </div>
    );
  }
}

export default Poker;