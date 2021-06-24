/**
*Player object
*/
class Player{
    constructor(name){
        this.name = name;
        this.dice = [];
    }
}

/**
 *Player object functions 
 */
Player.prototype.rollDie = function(){
    let die = Math.floor(Math.random() * (DIE_FACES)) + 1;
    this.dice.push(die);
    return die;
}

Player.prototype.describeSelf = function(){
    let description = `${this.name} rolled: `;
    this.dice.forEach(function(item){
        description += ` ${item} `;
    })
    return description;
}