// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoCoffeeRPS is Ownable {
    constructor() Ownable(msg.sender) {}

    enum GameResult { Pending, PlayerWin, ComputerWin, Tie }

    struct Game {
        address player;
        uint256   bet;        // in wei
        GameResult result;
        bool      claimed;
    }

    uint256 public gameCount;
    mapping(uint256 => Game) public games;

    event GameCreated(uint256 indexed gameId, address indexed player, uint256 betAmount);
    event GameResultSubmitted(uint256 indexed gameId, GameResult result);
    event RewardClaimed(uint256 indexed gameId, address indexed player, uint256 amount);
    event FeesWithdrawn(address indexed to, uint256 amount);

    /// @notice Player starts a new 3-round game by sending ETH = their bet
    function startGame() external payable returns (uint256) {
        require(msg.value > 0, "Must bet > 0");
        gameCount++;
        games[gameCount] = Game({
            player: msg.sender,
            bet: msg.value,
            result: GameResult.Pending,
            claimed: false
        });
        emit GameCreated(gameCount, msg.sender, msg.value);
        return gameCount;
    }

    /// @notice After 3 rounds client-side, player submits final outcome
    function playerSubmitResult(uint256 gameId, GameResult result) external {
        Game storage g = games[gameId];
        require(g.player == msg.sender,       "Not your game");
        require(g.result == GameResult.Pending, "Already submitted");
        require(
            result == GameResult.PlayerWin ||
            result == GameResult.ComputerWin ||
            result == GameResult.Tie,
            "Invalid result"
        );
        g.result = result;
        emit GameResultSubmitted(gameId, result);
    }

    /// @notice If you won you get 2×bet minus 1% fee; if tie you get refund; if lost nothing.
    function claimReward(uint256 gameId) external {
        Game storage g = games[gameId];
        require(g.player == msg.sender,       "Not your game");
        require(g.result != GameResult.Pending, "Result pending");
        require(!g.claimed,                   "Already claimed");
        g.claimed = true;

        uint256 payout;
        if (g.result == GameResult.PlayerWin) {
            // 2× payout, 1% fee stays in contract
            payout = (g.bet * 2 * 99) / 100;
        } else if (g.result == GameResult.Tie) {
            // refund
            payout = g.bet;
        } else {
            // lost: no payout
            payout = 0;
        }

        if (payout > 0) {
            payable(msg.sender).transfer(payout);
        }
        emit RewardClaimed(gameId, msg.sender, payout);
    }

    /// @notice Owner can sweep the collected fees to a treasury address
    function withdrawFees(address to) external onlyOwner {
        uint256 bal = address(this).balance;
        payable(to).transfer(bal);
        emit FeesWithdrawn(to, bal);
    }

    // Fallback in case someone sends ETH directly
    receive() external payable {}
}
