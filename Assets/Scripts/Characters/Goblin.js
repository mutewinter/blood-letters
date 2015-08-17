#pragma strict

import System.Collections.Generic;

class Goblin extends Character {
  function Start () {
    worthExperience = 45;
    health = 5;
    moveSpeed = 10;
    moveRate = 0.8;
    super.Start();
    dropsSkills.possibleSkillsDropped.Add(FireWave);
    dropsSkills.possibleSkillsDropped.Add(LightningOrb);
  }
}
