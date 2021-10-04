import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import Flop from './Flop.jsx';
import UserCards from './UserCards.jsx';
import DealerCards from './DealerCards.jsx';
import MoneyOnTable from './MoneyOnTable.jsx';
import styled from 'styled-components';
import Finished from './Finished.jsx';

const PokerStyled = styled.div`
  .wrapper{
    display: flex;
    flex-direction: row;
  }
  .finished {
    margin: 20px;
  }
`;

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
      userMove: '',
      view: 'flop',
      userPile: 0,
      initialBuyIn: 0, //keeps trac of initial buy in to compare.  this variable not changed
      turn: false, //whne this turns true, 4th card put down
      river: false, //when this turns true, 5th card put dwon
      gameOver: false, //when this is true: the game is over
      gameId: '',
      bigBlind: 0,
      buyIn: 0, //this starts at the buy in, but it changes as the usre plays.  money left would be also a good description
      gameId: 0,
      increment: 0, //this is for when raising a bet by how much-- need to set back to 0 after using this val
      winner: '',
      takeHome: 0 //after game ends-- if user wins this is moneyOnTable + buyIn (buyIn is also money left as game plays), if user loses, this is buy in
    };
    this.initialDeal = this.initialDeal.bind(this);
    this.userBet = this.userBet.bind(this);
    this.blindBets = this.blindBets.bind(this);
    this.dealerFirstBet = this.dealerFirstBet.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.dealerRoundBet = this.dealerRoundBet.bind(this);
    this.findWinner = this.findWinner.bind(this);
    this.updateMoneyOnTable = this.updateMoneyOnTable.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  async initialDeal() {
    try {
      const {bigBlind, buyIn} = this.props;
      const cards = await axios.get(`/routes/poker/poker/init/${buyIn}/${bigBlind}`);
      return cards.data;
    } catch (err) {
      console.log(err);
    }
  }


  //for when the usre bets.  takes in object bet, which = {move: ___} and possibly has a raise property if the move is a raise.  
  async userBet(bet) {
    try { //user place the bet
      //if the bet is  (0) -- set the state to over. game over
      if (bet.move === 'fold') {
        this.setState({
          gameOver: true,
          userMove: 'fold'
        });
        return;
      }

      if (bet.move === 'call') {
        const {dealerBet, userBet, gameId} = this.state;
        const call = dealerBet - userBet; //difference needed to call the bet
        const db = await axios.put(`/routes/poker/poker/bet/${gameId}/${call}/${0}`);
        this.setState({ //set the user move
          userMove: 'call',
          buyIn: this.state.buyIn - call, //take out of user pot
        }, async () => {
          if (this.state.dealerMove === 'call' && this.state.userMove === 'call') {
            //if both call, then the next card is dealt
            await setTimeout(() =>{ console.log(''); }, 100); //pauses to make game a bit more like 2 ppl instead of computer
            this.nextCard();
          }
        });

        //set up for the next turn to happen
        this.state.river && this.setState({
          gameOver: true
        }, );

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
        this.setState({
          userMove: 'raise',
          increment: 0,
          moneyOnTable: this.state.moneyOnTable + userBet,
          buyIn: this.state.buyIn - userBet
        });

        await setTimeout(()=>console.log(''), 100);
        this.dealerRoundBet();

      }
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {

    try {
      //call initial deal
      const cards = await this.initialDeal();
      const {dealerHand, flopHand, userHand, gameId, } = cards;
      this.setState((state, props) => ({
        dealerHand: dealerHand,
        flopHand: flopHand,
        userHand: userHand,
        gameId: gameId,
        bigBlind: this.props.bigBlind,
        buyIn: this.props.buyIn,
        initialBuyIn: this.props.buyIn
      }), () => {

        this.blindBets();

     
      });

    } catch (err) {
      console.log(err);
    }

  }

  /**these are the blind bets.  per convention, the dealer is the small blind, then the user is the big blind.  the dealers first turn after cards are flipped will be to call the big blind (or raise or fold) */
  async blindBets() {

    
    const {bigBlind} = this.props;
    const {gameId} = this.state;
    //dealer is small blind
    
    //user is big blind
    //update money on the table in the db w/ axios
    const mOT = await axios.put(`/routes/poker/poker/blinds/${gameId}/${bigBlind}`);
    this.setState({
      moneyOnTable: mOT.data,
      buyIn: this.state.buyIn - bigBlind
    });

    await this.dealerFirstBet();
  }

  /*for the dealers first bet.  dealer is small blind, user is bB, so to call, dealer needs to place amount of small blind.  can also raise or fold */
  async dealerFirstBet () {
    try {

      console.log('dealer first bet');

      
      const {bigBlind, gameId} = this.state;
      const call = bigBlind / 2;
      
      //summon to back end, see best hand, decide if call/fold/raise
      const {data} = await axios.get(`/routes/poker/poker/dealerBet/${gameId}/${call}`);

    

      this.setState({
        dealerBet: data.bet,
        dealerMove: data.move,
        moneyOnTable: data.moneyOnTable
      });
      //if dealer folds: game is over
      if (data.move === 'fold') {
        this.setState({
          gameOver: true
        });
      }

    } catch (err) {

    }
  }

  /**
   * other bets: the dealer bets first after the card is turned, they can check(call), raise, or fold
   */
  async dealerRoundBet () {
    console.log('dealer round bet');

    try {

      //summon to back end, see best hand, decide if call/fold/raise
      const {bigBlind, gameId, userMove} = this.state;
      
      //send down what is needed to call
      const diff = this.state.userBet - this.state.dealerBet;

      const {data} = await axios.get(`/routes/poker/poker/dealerBet/${gameId}/${diff}`);
      
      this.setState({
        dealerBet: data.bet,
        dealerMove: data.move,
        moneyOnTable: this.state.moneyOnTable + data.bet
      });

      //if dealer folds: game is over
      if (data.move === 'fold') {
        console.log('fold');
        this.setState({
          gameOver: true
        }, () => console.log('fold', this.state));
      }
      //if the dealer is calling a users raise: 
      if (data.move === 'call' && userMove === 'raise') {
        //put the moves back
        this.setState({
          userMove: '',
          dealerMove: ''
        });
        await setTimeout(() => { console.log('reset state move'); }, 300);
        this.nextCard();
      }

    } catch (err) {

    }

  }

  /**function to draw the next card for the communal pile.  resets the dealers and users moves */
  async nextCard() {
    try {
      const {gameId, turn, gameOver, flopHand} = this.state;
      if (gameOver ) { 

        return;
      }
      await setTimeout(() => { console.log(''); }, 100); //pause for a bit more realism
      if (flopHand.length < 5) {
        const {data} = await axios.get(`/routes/poker/poker/addToFlop/${gameId}`);
      
      

        //find the next view:
      
        const nextView = this.state.view === 'flop' ? 'turn' :
          this.state.view === 'turn' ? 'river' : 'fin';
        //need to add this next card to the array of current cards in the flop
        this.setState({
          flopHand: this.state.flopHand.concat(data),
          dealerMove: '',
          userMove: '',
          view: nextView,
          dealerBet: 0,
          userBet: 0
       
        },);
 
        this.dealerRoundBet();
      
      } else {
        this.setState({gameOver: true});
      }


    } catch (err) {
      console.log(err);
    }
  }

  async findWinner() {
    try {
      let winner;
      const {gameId, userMove, dealerMove, buyIn, moneyOnTable} = this.state;
      //if one player folds, the other is the winner automatically
      if (userMove === 'fold') {     
        this.setState({
          winner: 'dealer',
          takeHome: buyIn
        });
       
   
       
        
      } else if (dealerMove === 'fold') {
        winner = 'user';
        this.setState({
          winner: 'user',
          takeHome: buyIn + moneyOnTable
        });
        
      } else {

        winner = await axios.get(`/routes/poker/poker/winner/${gameId}`);
        //set the state with the winner
        const takeHome = winner.data === 'user' ? buyIn + moneyOnTable : buyIn;
        this.setState({
          winner: winner.data,
          takeHome: takeHome
        });
      }
      
    } catch (err) {
      console.log(err);
    }
  }

  async updateMoneyOnTable() { //mOT was easiest to track in the state here front end, so at the end of the game update the MoT
    try {
      const {gameId, moneyOnTable} = this.state;
      await axios.put(`/routes/poker/poker/moneyOnTable/${gameId}/${moneyOnTable}`);
    } catch (err) {
      console.log(err);
    }
    
  }


  //this runs after the game runs.  to update earnings in the PokerGames db
  async updateResults() {
    const {gameId, takeHome, initialBuyIn} = this.state;
    const net = takeHome - initialBuyIn;
    await axios.put(`/routes/poker/poker/results/${gameId}/${takeHome}/${net}`);
    //update user bank account
    await axios.put(`/routes/poker/poker/userBank/${gameId}/${net}`);
  }
  //have a change render function.  have hte view passed in either be 'flop', 'turn', or 'river'.  this will trigger the component mounting
  conditionalRender() {
    const {gameOver, winner, takeHome} = this.state;
    if (gameOver) {
      return <Finished winner={winner} findWinner={this.findWinner} updateMoneyOnTable={this.updateMoneyOnTable} takeHome={takeHome} updateResults={this.updateResults} changeView={this.props.changeView} />;

    } 
  }


  render() {
    const {dealerHand, flopHand, userHand, dealerBet, dealerMove, userBet, moneyOnTable, river, turn, buyIn, gameOver} = this.state;

   

   
   
    

    return (
      <PokerStyled >
        <div className="wrapper"> 

          <div className="cardsWrapper">

            <div>
              <DealerCards gameOver={gameOver} dealerHand={dealerHand} />
            </div> 
            <div>
              <Flop flopHand={flopHand} turn={turn} river={river} />
            </div>
            <div>
              <UserCards userHand={userHand} />
            </div>
          </div>
          <div>

            <div className="moneyWrapper">
              <MoneyOnTable dealerBet={dealerBet} dealerMove={dealerMove} userBet={userBet} moneyOnTable={moneyOnTable} buyIn={buyIn} />
            </div>
       
            <div>
              <div className='btnsFinishedWrap'>
                <div className="moveBtns">
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
                      const {bigBlind, increment} = this.state;
                      this.setState({
                        increment: increment + bigBlind,
                        userBet: userBet + bigBlind
                      }, () =>{ 
            
                        this.userBet({move: 'raise'});
                      });
              
                    }}
                  >raise</button>
                </div>
                <div className="finished">
                  {this.conditionalRender()}
                </div>

              </div>
           
       

            </div>
          </div>
    
        </div>
      </PokerStyled>
    );
  }
}

export default Poker;