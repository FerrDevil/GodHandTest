const setButtonListeners = () => {
    document.querySelector('.changeStanceButton').addEventListener('click', () => {
        let changeStanceMenuDisplay = document.querySelector('.changeStanceMenu').style.display;
        document.querySelector('.changeStanceMenu').style.display = changeStanceMenuDisplay == "grid" ? 'none': 'grid';
    });
    
    document.querySelector('.playerModel').addEventListener('click', () => {
        document.querySelector('.playerCharacteristics').style.display = "flex";
    });
    
    document.querySelector('.playerCharacteristics').addEventListener('click', () => {
        document.querySelector('.playerCharacteristics').style.display = "none";
    });
    
    document.querySelector('.closePlayerChar').addEventListener('click', () => {
        document.querySelector('.playerCharacteristics').style.display = "none";
    });
    
    document.querySelector('.deck').addEventListener('click', () => {
        document.querySelector('.showDeckCards').style.display = "flex";
        document.querySelector('.showDeckCards').style.animation = 'slowAppear 0.3s forwards';
        document.querySelectorAll('.deckCard')?.forEach(item => {item?.remove()})
        let card;
        
        player.deck.forEach((cardItem, cardItemIndex) => {
            
            card = document.querySelector("#cardTemplate").content.cloneNode(true).querySelector(".card");
            let descr = cardItem.description;
            cardItem.damage.forEach((damage, damageIndex) => {
                descr = descr.split(`{${damageIndex}}`).join(damage[1]);
            })
            card.className ='deckCard';
            card.querySelector('.cardPic').src = cardItem.img;
            card.querySelector('.cardName').innerHTML = cardItem.name;
            card.querySelector('.cardDescr').innerHTML = descr;
            card.id = cardItemIndex.toString();
            if(cardItemIndex <= 3){
                document.querySelector('.cards1').appendChild(card);
            }
            else{
                document.querySelector('.cards2').appendChild(card);
            }
            
        })
        
    });
    
    document.querySelector('.showDeckCards').addEventListener('click', () => {
        document.querySelector('.showDeckCards').style.animation = 'slowDisappear 0.3s forwards';
        setTimeout(() =>{ document.querySelector('.showDeckCards').style.display = "none";}, 300);
        
    });
    
    
    document.querySelectorAll('.stance').forEach((stance) => {
        stance.addEventListener('click', (e) => {
            setStance(e.target.classList[1]);
            let changeStanceMenuDisplay = document.querySelector('.changeStanceMenu').style.display;
        document.querySelector('.changeStanceMenu').style.display = changeStanceMenuDisplay == "grid" ? 'none': 'grid';
        });
    });
    
    document.querySelector('.endTurn').addEventListener('click', (e) => {
        e.target.style.display = 'block';
        endTurn();
    })

    document.querySelector('.playerWin').addEventListener('click', () => {
        window.location.reload();
        
    })
    document.querySelector('.playerLost').addEventListener('click', () => {
        window.location.reload();
        
    })
    let stanceEffects = document.querySelectorAll('.stanceEffect');
    stanceEffects.forEach((stanceEffect, stanceEffectIndex) =>{
        stanceEffect.addEventListener('mouseover', () => {
            if(stanceEffectIndex == 0){
                if(player.stance?.stats == undefined) return;
                let stanceDescriptionDOM = document.querySelectorAll('.stanceDescription')[stanceEffectIndex];
                stanceDescriptionDOM.style.animation = 'slowAppear 0.3s forwards';
                stanceDescriptionDOM.style.display = 'flex';
                let effects = `<h1 class ='stanceDescriptionH'>${player.stance.name}</h1>`;
                
                Object.keys(player.stance.stats).forEach(stat => {
                    if(stat == 'DEF'){
                        Object.keys(player.stance.stats[stat]).forEach(damageType => {
                            effects += `<p>${damageType.charAt(0).toUpperCase() + damageType.substr(1)} resist: ${player.stance.stats[stat][damageType]} %</p>`
                        })
                        
                    }
                    else{
                        effects += `<p>${stat}: ${player.stance.stats[stat] > 0 ? '+' + player.stance.stats[stat] : player.stance.stats[stat]}</p>`;
                    }
                    
                })
                stanceDescriptionDOM.innerHTML = effects;
                
            }
            else if(stanceEffectIndex == 1){
                if(enemy.stance?.stats == undefined) return;
                let stanceDescriptionDOM = document.querySelectorAll('.stanceDescription')[stanceEffectIndex];
                stanceDescriptionDOM.style.animation = 'slowAppear 0.3s forwards';
                stanceDescriptionDOM.style.display = 'flex';
                let effects = `<h1 class ='stanceDescriptionH'>${enemy.stance.name}</h1>`;
                
                Object.keys(enemy.stance.stats).forEach(stat => {
                    if(stat == 'DEF'){
                        Object.keys(enemy.stance.stats[stat]).forEach(damageType => {
                            effects += `<p>${damageType.charAt(0).toUpperCase() + damageType.substring(1)} resist: ${enemy.stance.stats[stat][damageType]} %</p>`
                        })
                    }
                    else{
                        effects += `<p>${stat}: ${enemy.stance.stats[stat] > 0 ? '+' + enemy.stance.stats[stat] : enemy.stance.stats[stat]}</p>`;
                    }
                    
                })
                stanceDescriptionDOM.innerHTML = effects;
                
            }
        
        })
    })

            
    document.querySelectorAll('.stanceEffect').forEach(stanceEffect => {
        stanceEffect.addEventListener('mouseout', () => {
            stanceEffect.querySelector('.stanceDescription').style.animation = 'slowDisappear 0.3s forwards';
            setTimeout(() => {
                stanceEffect.querySelector('.stanceDescription').style.display = 'none';
                stanceEffect.querySelector('.stanceDescription').innerHTML = '';
            }, 300)
            
        })
    })


    let stancesList = document.querySelectorAll('.stance');
    stancesList.forEach((stance, stanceIndex) => {
        
        stance.addEventListener('mouseover', (e) => {
            let stanceDescriptionDOM =  stance.querySelector('.stanceDescription');
            stanceDescriptionDOM.style.animation = 'slowAppear 0.3s forwards';
                stanceDescriptionDOM.style.display = 'flex';
                let effects = `<h1 class ='stanceDescriptionH'>${stances[stance.classList[1]].name}</h1>`;
               
                Object.keys(stances[stance.classList[1]].stats).forEach(stat => {
                    if(stat == 'DEF'){
                        Object.keys(stances[stance.classList[1]].stats[stat]).forEach(damageType => {
                            effects += `<p>${damageType.charAt(0).toUpperCase() + damageType.substring(1)} resist: ${stances[stance.classList[1]].stats[stat][damageType]} %</p>`
                        })
                        
                    }
                    else{
                        effects += `<p>${stat}: ${stances[stance.classList[1]].stats[stat] > 0 ? '+' + stances[stance.classList[1]].stats[stat] : stances[stance.classList[1]].stats[stat]}</p>`;
                    }
                    
                })
                stanceDescriptionDOM.innerHTML = effects;
        })
    })

            
    stancesList.forEach(stance => {
        stance.addEventListener('mouseout', () => {
            stance.querySelector('.stanceDescription').style.animation = 'slowDisappear 0.3s forwards';
            setTimeout(() => {
                stance.querySelector('.stanceDescription').style.display = 'none';
                stance.querySelector('.stanceDescription').innerHTML = '';
            }, 300)
            
        })
    })

    
    document.addEventListener('contextmenu', (e) => {e.preventDefault()})

    window.onresize = (e) => {
        e.preventDefault()
    }
}

let effects = {
    buffs:{

    },
    debuffs:{

    }
}

let cards = {
    0:{
        name: 'Slash',
        description: 'Deal {0} slash damage to an enemy.',
        img: 'imgs/cards/slash.png',
        target: 'enemy',
        damage: [['slash', 7]],
        heal: 0,
        cost: 1,
        effects: {}
    },
    1:{
        name: 'Pierce',
        description: 'Deal {0} pierce damage to an enemy.',
        img: 'imgs/cards/pierce.png',
        target: 'enemy',
        damage: [['pierce', 7]],
        heal: 0,
        cost: 1,
        effects: {}
    },
    2:{
        name: 'Blunt',
        description: 'Deal {0} blunt damage to an enemy.',
        img: 'imgs/cards/blunt.png',
        target: 'enemy',
        damage: [['blunt', 7]],
        heal: 0,
        cost: 1,
        effects: {
            stun: 0.2
        }
    },
    /* 3:{
        name: 'Heal',
        description: 'Restore {0} HP to your character.',
        img: '4.jpg',
        target: 'player',
        damage: 0,
        heal: 6,
        cost: 1,
        effects: {}
    }, */
    3:{
        name: 'Rampage',
        description: 'Deal {0} blunt, {1} pierce and {2} slash damage to an enemy.',
        img: 'imgs/cards/rampage.png',
        target: 'enemy',
        damage: [['blunt', 7], ['pierce', 7], ['slash', 7]],
        heal: 0,
        cost: 3,
        effects: {
        }
    },
}

let player = {
    stats:{
        curHP: 40,
        maxHP: 40,
        curStamina: 4,
        maxStamina: 4,
        ATK: 0,
        ACC: 8,
        DEF: {
            slash: 20,
            pierce: 30,
            blunt: 30,
        },
        critChance: 5,
    },
    stance: {},
    hand : [],
    deck : [cards[0], cards[1], cards[2], cards[3], cards[0], cards[1], cards[2], cards[3]]
};
let enemy = {
    stats:{
        curHP: 60,
        maxHP: 60,
        curStamina: 4,
        maxStamina: 4,
        ATK: 0,
        ACC: 8,
        DEF: {
            slash: 20,
            pierce: 30,
            blunt: 30,
        },
        critChance: 5,
    },
    stance: {},
    deck: [cards[0], cards[1], cards[2]],
};

let stances = {
    foolsGuard: {
        name: 'Fools guard',
        stats:{
            ATK: -2,
            DEF: {
                slash: -20,
                pierce: -20,
                blunt: -20,
            },
            ACC: 1,
            critChance: 30
        }
    },
    longpointGuard: {
        name: 'Longpoint guard',
        stats:{
            ACC: -2,
            DEF: {
                slash: 30,
                pierce: 20,
                blunt: 30,
            }
        }
    },
    highGuard: {
        name: 'High guard',
        stats:{
            ATK: 7,
            DEF: {
                slash: -20,
                pierce: -20,
                blunt: -20,
            }
        }
    },
    plowGuard:{
        name: 'Plow guard',
        stats:{
            ATK: 1,
            DEF: {
                slash: 10,
                pierce: 10,
                blunt: 10,
            },
            ACC: -1
        }
    }

}



let isCardPlayed = false;



const updateHP = () => {
    document.querySelector('.playerCurHP').style.width = (player.stats.curHP >= 0 ? Math.floor(player.stats.curHP / player.stats.maxHP * 150) : 0)  + 'px';
    document.querySelector('.enemyCurHP').style.width = (enemy.stats.curHP >= 0 ? Math.floor(enemy.stats.curHP / enemy.stats.maxHP * 150) : 0)  + 'px';
}
const updateCards = () => {
    document.querySelectorAll('.card')?.forEach(cardItem => {cardItem?.remove()});
    document.querySelector('.selectedCard')?.remove();
    let card;
    margin = "0px";
    const width = Number(window.getComputedStyle(document.querySelector('.hand'), null).getPropertyValue("width").replace('px', ''));
    
   
    player.hand.forEach((cardItem, cardItemIndex) => {
        if (cardItemIndex != 0 && width < 200 * player.hand.length){
            margin = -((200 * player.hand.length - width) / (player.hand.length -1)) + 'px';
        }
        
        card = document.querySelector("#cardTemplate").content.cloneNode(true).querySelector(".card");
        card.querySelector('.cardPic').src = cardItem.img;
        let descr = cardItem.description;
        cardItem.damage.forEach((damage, damageIndex) => {
            descr = descr.split(`{${damageIndex}}`).join(damage[1]);
        })
        card.querySelector('.cardDescr').innerHTML = descr;
        card.querySelector('.cardName').innerHTML = cardItem.name;
        card.id = cardItemIndex.toString();
        card.style.marginLeft = margin;
        document.querySelector('.hand').appendChild(card);
    })
    
   
}
const drawCards = (count = 1) => {
    for(let index = 0; index < count; index++){
        if (player.hand.length + 1 > 10) return;
        player.hand.push(player.deck[Math.floor(Math.random() * player.deck.length)]);
    }
}
const updateStamina = () => {
    document.querySelectorAll('.stamina').forEach(stamina => {stamina?.remove();})
    let stamina, emptyStamina;
    let playerStamina = document.querySelector('.playerStamina');
    for(let fullStam = 0; fullStam < player.stats.curStamina; fullStam++){
        stamina = document.createElement('img');
        stamina.className = "stamina fullStamina";
        stamina.src = 'imgs/ui/light/full.png';
        playerStamina.appendChild(stamina);
    }
    for(let emptyStam = 0; emptyStam < player.stats.maxStamina - player.stats.curStamina; emptyStam++){
        emptyStamina = document.createElement('img');
        emptyStamina.className = "stamina emptyStamina";
        emptyStamina.src = 'imgs/ui/light/empty.png';
        playerStamina.appendChild(emptyStamina);
    }
}

const setStance = (nextStance) => {
    if (isCardPlayed){
        document.querySelector('.setStanceAfterCardPlayError').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.setStanceAfterCardPlayError').style.display = 'none';
            }, 3000);
        return;
    }
    document.querySelector('.playerModel').src = `imgs/characters/player/${nextStance}.png`;
    document.querySelector('.playerStance').style.backgroundImage = `url(imgs/ui/stanceEffect/${nextStance}Effect.png)`;
    if (player.stance.name != undefined){
        Object.keys(player.stance.stats).forEach(stat => {
            if (stat == 'DEF'){
                player.stats.DEF.pierce -= player.stance.stats.DEF.pierce;
                player.stats.DEF.blunt -= player.stance.stats.DEF.blunt;
                player.stats.DEF.slash -= player.stance.stats.DEF.slash;
            }
            else{
                player.stats[stat] -= player.stance.stats[stat];
            }
            
        });
    }
    player.stance = stances[nextStance];
    Object.keys(player.stance.stats).forEach(stat => {
        if (stat == 'DEF'){
            player.stats.DEF.pierce += player.stance.stats.DEF.pierce;
            player.stats.DEF.blunt += player.stance.stats.DEF.blunt;
            player.stats.DEF.slash += player.stance.stats.DEF.slash;
        }
        else{
            player.stats[stat] += player.stance.stats[stat];
        }
    });
    
    
}

const startTurn = () => {
    updateHP();
    drawCards();
    updateStamina();
    updateCards();
    player.stats.curStamina = player.stats.maxStamina;
    setEnemyStance();
    playerTurn();
};



const playerTurn = () => {

    let enemyUnitDOM = document.querySelector('.enemyUnit');
    let cancelCardDOM = document.querySelector('.cancelCard');
    let selectTargetDOM = document.querySelector('.selectTarget');
    let endTurnDOM = document.querySelector('.endTurn');

    const playCard = (e) => {

        const setVisibility = () => {
            cancelCardDOM.style.display = 'block';
            selectTargetDOM.style.display = 'block';
            }
        

        const setDamage = (e) => {
            if (card.target != 'enemy') return;
            player.stats.curStamina -= card.cost;
            card.damage.forEach((attack, attackIndex) => {
                setTimeout(() => {document.querySelector('.playerModel').src = `imgs/characters/player/${attack[0]}Damage.png`}, attackIndex * 300 + 300)
                let totalDamage = Math.random() <= player.stats.ACC / 10 ? (Math.random() <= player.stats.critChance / 100 ? 3: 1) * Math.floor((1 - enemy.stats.DEF[attack[0]] / 100) * attack[1] + Math.floor(player.stats.ATK * 0.5)) : 0;
                enemy.stats.curHP -= totalDamage;
                isSomeoneDead();
            });
            let arr = player.stance.name.split(' ');
            setTimeout(() => {document.querySelector('.playerModel').src = `imgs/characters/player/${arr[0].charAt(0).toLowerCase() + arr[0].substring(1)}Guard.png`}, card.damage.length * 300 + 300)
            player.hand.splice(Number(document.querySelector('.selectedCard').id), 1);
            enemyUnitDOM.removeEventListener('click', setDamage);
            selectTargetDOM.style.display = 'none';
            cancelCardDOM.style.display = 'none';
            isCardPlayed = true;
            updateHP();
            updateCards();
            updateStamina();
            document.querySelectorAll('.card')?.forEach((cardItem, cardItemIndex) => {
                cardItem.addEventListener('click', playCard);
            })
            
        };


        const cancelCard = (e) => {
            eventTarget.className = 'card';
            updateCards();
            document.querySelectorAll('.card').forEach((cardItem) => {cardItem.addEventListener('click', playCard)});
            selectTargetDOM.style.display = 'none';
            cancelCardDOM.style.display = 'none';
            cancelCardDOM.removeEventListener('click', cancelCard);
            enemyUnitDOM.removeEventListener('click', setDamage);
        }

        
        

        if(player.stance.name == undefined){
            document.querySelector('.noStanceError').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.noStanceError').style.display = 'none';
            }, 3000)
            return;
        }

        

        let eventTarget = e.target.parentElement.classList.contains('card')? e.target.parentElement : e.target;
        let card = player.hand[Number(eventTarget.id)];
        if (player.stats.curStamina < card.cost){
            document.querySelector('.noStaminaError').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.noStaminaError').style.display = 'none';
            }, 3000)
            
            return;
        }
        setVisibility();
        eventTarget.className = 'selectedCard';
        
        eventTarget.removeEventListener('click', playCard)


        


        document.querySelectorAll('.card')?.forEach(cardItem => {cardItem.removeEventListener('click', playCard)});
        
        
        
        cancelCardDOM.addEventListener('click', cancelCard);

        enemyUnitDOM.addEventListener('click', setDamage);
        
    }


    endTurnDOM.style.display = 'block';

    document.querySelectorAll('.card')?.forEach(cardItem => {
        cardItem.addEventListener('click', playCard);
    })
    
}

const setEnemyStance = () => {
    let stancesChoice = Object.keys(stances);
    let randomStance = stancesChoice[Math.floor(Math.random() * stancesChoice.length)];
    enemy.stance = stances[randomStance]
    document.querySelector('.enemyModel').src = `imgs/characters/enemy/${randomStance}.png`
    document.querySelector('.enemyStance').style.backgroundImage = `url(imgs/ui/stanceEffect/${randomStance}Effect.png)`
    Object.keys(enemy.stance.stats).forEach(stat => {
        if (stat == 'DEF'){
            enemy.stats.DEF.pierce += enemy.stance.stats.DEF.pierce;
            enemy.stats.DEF.blunt += enemy.stance.stats.DEF.blunt;
            enemy.stats.DEF.slash += enemy.stance.stats.DEF.slash;
        }
        else{
            enemy.stats[stat] += enemy.stance.stats[stat];
        }
        
    });
}

const enemyTurn = () => {
    let card = enemy.deck[Math.floor(Math.random() * enemy.deck.length)];
    
    card.damage.forEach((attack, attackIndex) => {
        setTimeout(() => {document.querySelector('.enemyModel').src = `imgs/characters/enemy/${attack[0]}Damage.png`}, attackIndex * 300 + 300)
        let totalDamage = (Math.random() <= enemy.stats.ACC / 10) ? (Math.random() <= enemy.stats.critChance / 100? 3: 1) *  (Math.floor((1 - player.stats.DEF[attack[0]] / 100) * attack[1]) + Math.floor(enemy.stats.ATK * 0.5)) : 0;
        player.stats.curHP -= totalDamage;
        isSomeoneDead();
    });
    setTimeout(() => {document.querySelector('.enemyModel').src = `imgs/characters/enemy/${enemy.stance.name.split(' ')[0].charAt(0).toLowerCase() + enemy.stance.name.split(' ')[0].substring(1)}Guard.png`;}, card.damage.length * 300 + 300)
}

const endTurn = () => {
    updateHP();
    updateCards();
    player.stats.maxStamina =  player.stats.curStamina == 0? player.stats.maxStamina - 1 : 4;
    player.stats.curStamina = player.stats.maxStamina;
    updateStamina();
    enemyTurn();
    updateHP();
    isSomeoneDead();
    updateCards();
    deleteStance();
    
    isCardPlayed = false;
    startTurn();
    
}

const deleteStance = () => {
    if (player.stance.name != undefined){
        Object.keys(player.stance.stats).forEach(stat => {
            if (stat == 'DEF'){
                player.stats.DEF.pierce -= player.stance.stats.DEF.pierce;
                player.stats.DEF.blunt -= player.stance.stats.DEF.blunt;
                player.stats.DEF.slash -= player.stance.stats.DEF.slash;
            }
            else{
                player.stats[stat] -= player.stance.stats[stat];
            }
            
        });
        player.stance = {};
    }
    
    
    if (enemy.stance.name != undefined){
        Object.keys(enemy.stance.stats).forEach(stat => {
            
            if (stat == 'DEF'){
                enemy.stats.DEF.pierce -= enemy.stance.stats.DEF.pierce;
                enemy.stats.DEF.blunt -= enemy.stance.stats.DEF.blunt;
                enemy.stats.DEF.slash -= enemy.stance.stats.DEF.slash;
            }
            else{
                enemy.stats[stat] -= enemy.stance.stats[stat];
            }
        });
        enemy.stance = {};
    }
    document.querySelector('.playerStance').style.backgroundImage = '';
    document.querySelector('.enemyStance').style.backgroundImage = '';
    setTimeout(() => {
        document.querySelector('.enemyModel').src = 'imgs/characters/enemy/plowGuard.png';
        document.querySelector('.playerModel').src = 'imgs/characters/player/plowGuard.png';
    }, 300)
    
}
const isSomeoneDead = () => {
    if(player.stats.curHP <= 0){
        document.querySelector('.playerLost').style.display = 'flex';
        return
    }
    else if(enemy.stats.curHP <= 0){
        document.querySelector('.playerWin').style.display = 'flex';
        return
    }
    
}


const startStage = () => {
    setButtonListeners();
    drawCards(4);
    startTurn();
}

startStage();

//добавить баффы-дебаффы