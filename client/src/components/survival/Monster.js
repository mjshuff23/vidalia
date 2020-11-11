import React, { useState, useEffect, useRef } from 'react';
import { Dice, d20 } from '../../helpers/dice'

const Monster = ({currentHealth, setCurrentHealth, playerData, turnList, setTurnList, turn, setTurn, data}) => {
    const initiative = data.turn;
    const newTurnList = [...turnList]
    const [monstHealth, setMonstHealth] = useState(data.hitPoints);

    const highlighter = useRef();

    useEffect(() => {
        if(turn === initiative){
            highlighter.current.classList.add('highlight-card')
            setTimeout(() => {
                highlighter.current.classList.remove('highlight-card')
                const turnSpent = newTurnList.shift()
                newTurnList.push(turnSpent)
                attackPlayer();
                setTurnList(newTurnList)
                setTurn(newTurnList[0])
            }, 2000);
        }
    }, [turn, initiative, monstHealth])

    const rolls = Number(data.hitDice.split('d')[0])
    const sides = Number(data.hitDice.split('d')[1])
    let diceName = [data.hitDice.split('d')[1]]
    diceName.unshift('d')
    diceName = diceName.join('')

    const attackPlayer = () => {
        const attackDice = new Dice(diceName, sides)
        const initialDamage = attackDice.roll(rolls);
        let damage = initialDamage - (Math.floor(playerData[0].armorClass / 2))
        if(damage < 0){
            damage = 0
        }

        const monsterAccuracy = d20.roll(1) + (data.dexterity - 8)
        const playerDodge = d20.roll(1) + (playerData[0].constitution - 8)
        // console.log(monsterAccuracy)
        // console.log(playerDodge)
        // console.log(damage)

        if(monsterAccuracy > playerDodge){
            const newHealth = currentHealth - damage;

            setCurrentHealth(newHealth);
        }
    }

    const handleAttack = () => {
        const base = playerData[0].Class.Starter.Weapon.hitDice
        const pRolls = Number(base.split('d')[0])
        const pSides = Number(base.split('d')[1])
        let pDiceName = [base.split('d')[1]]
        pDiceName.unshift('d')
        pDiceName = pDiceName.join('')

        const attackDice = new Dice(diceName, pSides)
        const initialDamage = attackDice.roll(pRolls);
        let damage = initialDamage - (Math.floor(data.armorClass / 2));
        console.log(damage)
        console.log(data.armorClass)
        if(damage < 0) damage = 0;
        const monsterAccuracy = d20.roll(1) + (data.dexterity - 8)
        const playerDodge = d20.roll(1) + (playerData[0].constitution - 8)
        if(monsterAccuracy < playerDodge){
            const newHealth = monstHealth - damage;
            console.log(newHealth)
            console.log(damage)
            setMonstHealth(newHealth);
        }
        const turnSpent = newTurnList.shift()
        newTurnList.push(turnSpent)
        setTurnList(newTurnList)
        setTurn(newTurnList[0])
    }

    return (
        <div className='monster-card' ref={highlighter}>
            <div className='monster-card-name'>{data.name}</div>
            <div className='monster-health'>{monstHealth}</div>
            <div>{data.type}</div>
            <div>{!data.turn ? '' : `Initiative: ${data.turn}`}</div>
            <div className='attack-buttn' onClick={handleAttack}>Attack</div>
        </div>
    )
}

export default Monster;